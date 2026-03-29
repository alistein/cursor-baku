import type { GalleryItem, GalleryPhoto, GalleryPlaceholderVariant } from "@/components/gallery/galleryData";
import { getBindings } from "@/lib/cloudflare";
import type { GalleryImageRow } from "./types";
import { previewKeyUrl, publicMediaUrl } from "./media";
import { slugifyTitle } from "./slug";

const GALLERY_PLACEHOLDER_CYCLE: GalleryPlaceholderVariant[] = [
  "audience",
  "workshop",
  "presentation",
  "speaker",
  "coding",
];

function formatAlbumDate(isoOrSql: string): string {
  const d = new Date(isoOrSql);
  if (Number.isNaN(d.getTime())) {
    return isoOrSql;
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type PublishedAlbumRow = {
  id: string;
  title: string;
  slug: string;
  event_id: string | null;
  display_date: string;
  created_at: string;
  updated_at: string;
};

type GalleryImageQueryRow = {
  id: string;
  image_key: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
};

type AdminDb = Awaited<ReturnType<typeof getBindings>>["db"];

async function galleryAlbumsHaveEventId(db: AdminDb): Promise<boolean> {
  const { results } = await db.prepare("PRAGMA table_info(gallery_albums)").all<{ name: string }>();
  const columns = (results ?? []) as { name: string }[];
  return columns.some((column) => column.name === "event_id");
}

async function galleryItemFromAlbum(
  db: AdminDb,
  a: PublishedAlbumRow
): Promise<GalleryItem | null> {
  const { results: imgs } = await db
    .prepare(
      `SELECT id, image_key, alt_text, sort_order, created_at
       FROM gallery_images
       WHERE album_id = ?
       ORDER BY sort_order ASC, created_at ASC`
    )
    .bind(a.id)
    .all<GalleryImageQueryRow>();

  const rows: GalleryImageQueryRow[] = imgs ?? [];
  if (rows.length === 0) {
    return null;
  }

  const photos: GalleryPhoto[] = rows.map((img: GalleryImageQueryRow, i: number) => ({
    id: img.id,
    alt: img.alt_text ?? a.title,
    imageUrl: publicMediaUrl(img.image_key),
    placeholderVariant: GALLERY_PLACEHOLDER_CYCLE[i % GALLERY_PLACEHOLDER_CYCLE.length]!,
  }));

  return {
    id: a.id,
    date: formatAlbumDate(a.display_date),
    title: a.title,
    photos,
    totalPhotos: photos.length,
  };
}

/**
 * Single published album by id (for gallery detail + OG routes).
 */
export async function getPublicAlbumById(id: string): Promise<GalleryItem | null> {
  const { db } = await getBindings();
  const hasEventId = await galleryAlbumsHaveEventId(db);
  const a = await db
    .prepare(
      `SELECT
        a.id,
        a.title,
        a.slug,
        ${hasEventId ? "a.event_id" : "NULL AS event_id"},
        ${hasEventId ? "COALESCE(e.event_date, a.created_at)" : "a.created_at"} AS display_date,
        a.created_at,
        a.updated_at
       FROM gallery_albums a
       ${hasEventId ? "LEFT JOIN events e ON e.id = a.event_id" : ""}
       WHERE a.id = ? AND a.status = 'published'`
    )
    .bind(id)
    .first<PublishedAlbumRow | null>();
  if (!a) {
    return null;
  }
  return galleryItemFromAlbum(db, a);
}

export type GalleryListItem = {
  id: string;
  key: string;
  label: string;
  eventTitle: string | null;
  createdAt: string;
  previewUrl: string;
};

export type GallerySitemapEntry = {
  id: string;
  updatedAt: string;
};

export type AdminGalleryAlbum = {
  id: string;
  title: string;
  eventTitle: string | null;
  photoCount: number;
  previewUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AdminGalleryPhoto = {
  id: string;
  key: string;
  alt: string | null;
  caption: string | null;
  createdAt: string;
  previewUrl: string;
};

export type AdminGalleryDetail = AdminGalleryAlbum & {
  photos: AdminGalleryPhoto[];
};

type AdminGalleryAlbumQueryRow = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  event_title: string | null;
  photo_count: number;
  preview_key: string | null;
};

type AdminGalleryPhotoQueryRow = {
  id: string;
  image_key: string;
  alt_text: string | null;
  caption: string | null;
  created_at: string;
};

/**
 * Published albums with images for the marketing site (e.g. homepage GallerySection).
 */
export async function listPublicAlbums(limitAlbums = 10): Promise<GalleryItem[]> {
  const { db } = await getBindings();
  const hasEventId = await galleryAlbumsHaveEventId(db);
  const { results: albums } = await db
    .prepare(
      `SELECT
        a.id,
        a.title,
        a.slug,
        ${hasEventId ? "a.event_id" : "NULL AS event_id"},
        ${hasEventId ? "COALESCE(e.event_date, a.created_at)" : "a.created_at"} AS display_date,
        a.created_at,
        a.updated_at
       FROM gallery_albums a
       ${hasEventId ? "LEFT JOIN events e ON e.id = a.event_id" : ""}
       WHERE a.status = 'published'
       ORDER BY a.updated_at DESC
       LIMIT ?`
    )
    .bind(limitAlbums)
    .all<PublishedAlbumRow>();

  if (!albums?.length) {
    return [];
  }

  const items: GalleryItem[] = [];

  for (const a of albums) {
    const item = await galleryItemFromAlbum(db, a);
    if (item) {
      items.push(item);
    }
  }

  return items;
}

export async function listPublishedGallerySitemapEntries(limit = 500): Promise<GallerySitemapEntry[]> {
  const { db } = await getBindings();
  const { results } = await db
    .prepare(
      `SELECT id, updated_at
       FROM gallery_albums
       WHERE status = 'published'
       ORDER BY updated_at DESC
       LIMIT ?`
    )
    .bind(limit)
    .all<{ id: string; updated_at: string }>();

  const rows = (results ?? []) as { id: string; updated_at: string }[];

  return rows.map((row) => ({
    id: row.id,
    updatedAt: row.updated_at,
  }));
}

export async function listMediaItems(limit = 100): Promise<GalleryListItem[]> {
  const { db } = await getBindings();
  const hasEventId = await galleryAlbumsHaveEventId(db);
  const { results } = await db
    .prepare(
      `SELECT gi.id, gi.image_key, gi.created_at, a.title AS label, ${hasEventId ? "e.title" : "NULL"} AS event_title
       FROM gallery_images gi
       JOIN gallery_albums a ON a.id = gi.album_id
       ${hasEventId ? "LEFT JOIN events e ON e.id = a.event_id" : ""}
       ORDER BY gi.created_at DESC
       LIMIT ?`
    )
    .bind(limit)
    .all<{ id: string; image_key: string; created_at: string; label: string; event_title: string | null }>();

  const mediaRows = (results ?? []) as {
    id: string;
    image_key: string;
    created_at: string;
    label: string;
    event_title: string | null;
  }[];
  return mediaRows.map((r) => ({
    id: r.id,
    key: r.image_key,
    label: r.label,
    eventTitle: r.event_title,
    createdAt: r.created_at,
    previewUrl: previewKeyUrl(r.image_key),
  }));
}

export async function listAdminGalleryAlbums(limit = 100): Promise<AdminGalleryAlbum[]> {
  const { db } = await getBindings();
  const hasEventId = await galleryAlbumsHaveEventId(db);
  const { results } = await db
    .prepare(
      `SELECT
        a.id,
        a.title,
        a.created_at,
        a.updated_at,
        ${hasEventId ? "e.title" : "NULL"} AS event_title,
        COUNT(gi.id) AS photo_count,
        (
          SELECT image_key
          FROM gallery_images cover
          WHERE cover.album_id = a.id
          ORDER BY cover.sort_order ASC, cover.created_at ASC
          LIMIT 1
        ) AS preview_key
       FROM gallery_albums a
       ${hasEventId ? "LEFT JOIN events e ON e.id = a.event_id" : ""}
       LEFT JOIN gallery_images gi ON gi.album_id = a.id
       GROUP BY a.id
       ORDER BY a.updated_at DESC
       LIMIT ?`
    )
    .bind(limit)
    .all<AdminGalleryAlbumQueryRow>();

  const albumRows = (results ?? []) as AdminGalleryAlbumQueryRow[];
  return albumRows.map((album) => ({
    id: album.id,
    title: album.title,
    eventTitle: album.event_title,
    photoCount: album.photo_count,
    previewUrl: album.preview_key ? previewKeyUrl(album.preview_key) : null,
    createdAt: album.created_at,
    updatedAt: album.updated_at,
  }));
}

export async function getAdminGalleryAlbum(id: string): Promise<AdminGalleryDetail | null> {
  const { db } = await getBindings();
  const hasEventId = await galleryAlbumsHaveEventId(db);
  const album = await db
    .prepare(
      `SELECT a.id, a.title, a.created_at, a.updated_at, ${hasEventId ? "e.title" : "NULL"} AS event_title
       FROM gallery_albums a
       ${hasEventId ? "LEFT JOIN events e ON e.id = a.event_id" : ""}
       WHERE a.id = ?`
    )
    .bind(id)
    .first<{
      id: string;
      title: string;
      created_at: string;
      updated_at: string;
      event_title: string | null;
    } | null>();

  if (!album) {
    return null;
  }

  const { results: photos } = await db
    .prepare(
      `SELECT id, image_key, alt_text, caption, created_at
       FROM gallery_images
       WHERE album_id = ?
       ORDER BY sort_order ASC, created_at ASC`
    )
    .bind(id)
    .all<AdminGalleryPhotoQueryRow>();

  const photoRows = (photos ?? []) as AdminGalleryPhotoQueryRow[];
  const photoItems = photoRows.map((photo) => ({
    id: photo.id,
    key: photo.image_key,
    alt: photo.alt_text,
    caption: photo.caption,
    createdAt: photo.created_at,
    previewUrl: previewKeyUrl(photo.image_key),
  }));

  return {
    id: album.id,
    title: album.title,
    eventTitle: album.event_title,
    photoCount: photoItems.length,
    previewUrl: photoItems[0]?.previewUrl ?? null,
    createdAt: album.created_at,
    updatedAt: album.updated_at,
    photos: photoItems,
  };
}

export async function galleryAlbumExists(id: string): Promise<boolean> {
  const { db } = await getBindings();
  const row = await db.prepare("SELECT id FROM gallery_albums WHERE id = ?").bind(id).first<{ id: string } | null>();
  return Boolean(row);
}

export async function insertGalleryAlbum(input: {
  title: string;
  eventId: string | null;
  status?: "draft" | "published";
}): Promise<{ id: string; slug: string }> {
  const { db } = await getBindings();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const slug = `${slugifyTitle(input.title)}-${id.slice(0, 8)}`;
  const status = input.status ?? "published";
  const hasEventId = await galleryAlbumsHaveEventId(db);
  if (hasEventId) {
    await db
      .prepare(
        `INSERT INTO gallery_albums (id, title, slug, description, cover_image_key, status, event_id, created_at, updated_at)
         VALUES (?, ?, ?, NULL, NULL, ?, ?, ?, ?)`
      )
      .bind(id, input.title, slug, status, input.eventId, now, now)
      .run();
  } else {
    await db
      .prepare(
        `INSERT INTO gallery_albums (id, title, slug, description, cover_image_key, status, created_at, updated_at)
         VALUES (?, ?, ?, NULL, NULL, ?, ?, ?)`
      )
      .bind(id, input.title, slug, status, now, now)
      .run();
  }
  return { id, slug };
}

export async function insertGalleryImageRow(input: {
  albumId: string;
  imageKey: string;
  alt: string | null;
  caption: string | null;
}): Promise<string> {
  const { db } = await getBindings();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const maxRes = await db
    .prepare("SELECT MAX(sort_order) as m FROM gallery_images WHERE album_id = ?")
    .bind(input.albumId)
    .first<{ m: number | null }>();
  const sort = (maxRes?.m ?? -1) + 1;
  await db
    .prepare(
      "INSERT INTO gallery_images (id, album_id, image_key, alt_text, caption, sort_order, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .bind(id, input.albumId, input.imageKey, input.alt, input.caption, sort, now)
    .run();
  return id;
}

export async function getGalleryImageForDelete(id: string): Promise<{ albumId: string; imageKey: string } | null> {
  const { db } = await getBindings();
  const row = await db
    .prepare("SELECT album_id, image_key FROM gallery_images WHERE id = ?")
    .bind(id)
    .first<{ album_id: string; image_key: string } | null>();
  return row ? { albumId: row.album_id, imageKey: row.image_key } : null;
}

export async function deleteGalleryImageRow(id: string): Promise<void> {
  const { db } = await getBindings();
  await db.prepare("DELETE FROM gallery_images WHERE id = ?").bind(id).run();
}

export type { GalleryImageRow };
