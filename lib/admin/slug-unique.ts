import { getBindings } from "@/lib/cloudflare";
import { slugifyTitle } from "./slug";

/** Reserves a unique `events.slug` derived from the title. */
export async function uniqueEventSlugFromTitle(title: string): Promise<string> {
  const { db } = await getBindings();
  const base = slugifyTitle(title);
  for (let n = 0; n < 100; n++) {
    const candidate = n === 0 ? base : `${base}-${n + 1}`;
    const row = await db
      .prepare("SELECT 1 as ok FROM events WHERE slug = ?")
      .bind(candidate)
      .first<{ ok: number } | null>();
    if (row == null) {
      return candidate;
    }
  }
  return `${base}-${Date.now()}`;
}
