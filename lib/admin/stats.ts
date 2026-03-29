import { getBindings } from "@/lib/cloudflare";

export async function getAdminOverviewStats() {
  const { db } = await getBindings();
  const [subs, evs, galleryImgs] = await Promise.all([
    db.prepare("SELECT COUNT(*) as c FROM subscribers").first<{ c: number }>(),
    db.prepare("SELECT COUNT(*) as c FROM events").first<{ c: number }>(),
    db.prepare("SELECT COUNT(*) as c FROM gallery_images").first<{ c: number }>(),
  ]);
  return {
    subscribers: subs?.c ?? 0,
    events: evs?.c ?? 0,
    galleryImages: galleryImgs?.c ?? 0,
  };
}
