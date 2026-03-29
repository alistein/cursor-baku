import { getBindings } from "@/lib/cloudflare";

const IMAGE_EXT = new Set(["jpg", "jpeg", "png", "gif", "webp", "svg"]);

function extFromFilename(name: string): string {
  const part = name.split(".").pop()?.toLowerCase() ?? "bin";
  return IMAGE_EXT.has(part) ? part : "bin";
}

export function previewKeyUrl(key: string): string {
  return `/api/admin/preview?key=${encodeURIComponent(key)}`;
}

export function publicMediaUrl(key: string): string {
  return `/api/media?key=${encodeURIComponent(key)}`;
}

export async function putEventCoverObject(eventId: string, file: File): Promise<string> {
  const { r2 } = await getBindings();
  const id = crypto.randomUUID();
  const ext = extFromFilename(file.name);
  const key = `events/${eventId}/cover/${id}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  await r2.put(key, arrayBuffer, {
    httpMetadata: {
      contentType: file.type || `image/${ext === "jpg" ? "jpeg" : ext}`,
    },
  });
  return key;
}

export async function putAlbumGalleryObject(albumId: string, file: File): Promise<string> {
  const { r2 } = await getBindings();
  const id = crypto.randomUUID();
  const ext = extFromFilename(file.name);
  const key = `gallery/${albumId}/${id}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  await r2.put(key, arrayBuffer, {
    httpMetadata: {
      contentType: file.type || `image/${ext === "jpg" ? "jpeg" : ext}`,
    },
  });
  return key;
}

export async function getObjectBody(key: string) {
  const { r2 } = await getBindings();
  return r2.get(key);
}

export async function deleteMediaObject(key: string): Promise<void> {
  const { r2 } = await getBindings();
  await r2.delete(key);
}
