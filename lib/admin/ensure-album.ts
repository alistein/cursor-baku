import { getBindings } from "@/lib/cloudflare";
import { slugifyTitle } from "./slug";

/** Ensures at least one `gallery_albums` row exists for uploads. */
export async function ensureDefaultGalleryAlbum(): Promise<string> {
  const { db } = await getBindings();
  const existing = await db
    .prepare("SELECT id FROM gallery_albums ORDER BY created_at ASC LIMIT 1")
    .first<{ id: string } | null>();
  if (existing) {
    return existing.id;
  }
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const title = "Default";
  const slug = slugifyTitle(`gallery-${title}`) + "-" + id.slice(0, 8);
  await db
    .prepare(
      "INSERT INTO gallery_albums (id, title, slug, description, cover_image_key, status, created_at, updated_at) VALUES (?, ?, ?, NULL, NULL, 'draft', ?, ?)"
    )
    .bind(id, title, slug, now, now)
    .run();
  return id;
}
