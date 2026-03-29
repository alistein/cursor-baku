import { getBindings } from "@/lib/cloudflare";
import type { SubscriberRow } from "./types";

export async function listSubscribers(limit = 200): Promise<SubscriberRow[]> {
  const { db } = await getBindings();
  const { results } = await db
    .prepare(
      "SELECT id, email, status, created_at, updated_at FROM subscribers ORDER BY created_at DESC LIMIT ?"
    )
    .bind(limit)
    .all<SubscriberRow>();
  return results ?? [];
}

export async function getSubscriberStats(): Promise<{
  total: number;
  active: number;
}> {
  const { db } = await getBindings();
  const total = await db
    .prepare("SELECT COUNT(*) as c FROM subscribers")
    .first<{ c: number }>();
  const active = await db
    .prepare("SELECT COUNT(*) as c FROM subscribers WHERE status = 'active'")
    .first<{ c: number }>();
  return { total: total?.c ?? 0, active: active?.c ?? 0 };
}

export async function insertSubscriber(email: string): Promise<void> {
  const { db } = await getBindings();
  await db
    .prepare(
      "INSERT INTO subscribers (id, email, status) VALUES (lower(hex(randomblob(16))), ?, 'active') ON CONFLICT(email) DO UPDATE SET status = 'active', updated_at = CURRENT_TIMESTAMP"
    )
    .bind(email)
    .run();
}
