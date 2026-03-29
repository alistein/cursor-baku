import { getBindings } from "@/lib/cloudflare";
import type { EventRow } from "./types";
import { uniqueEventSlugFromTitle } from "./slug-unique";

export async function listEvents(limit = 100): Promise<EventRow[]> {
  const { db } = await getBindings();
  const { results } = await db
    .prepare(
      `SELECT id, title, slug, description, event_date, registration_url, cover_image_key, created_at, updated_at
       FROM events
       ORDER BY
        CASE
          WHEN event_date IS NULL THEN 2
          WHEN date(event_date) < date('now') THEN 1
          ELSE 0
        END ASC,
        CASE WHEN event_date IS NOT NULL AND date(event_date) >= date('now') THEN event_date END ASC,
        CASE WHEN event_date IS NOT NULL AND date(event_date) < date('now') THEN event_date END DESC,
        updated_at DESC
       LIMIT ?`
    )
    .bind(limit)
    .all<EventRow>();
  return results ?? [];
}

export async function getEventById(id: string): Promise<EventRow | null> {
  const { db } = await getBindings();
  return db
    .prepare(
      "SELECT id, title, slug, description, event_date, registration_url, cover_image_key, created_at, updated_at FROM events WHERE id = ?"
    )
    .bind(id)
    .first<EventRow | null>();
}

function newId(): string {
  return crypto.randomUUID();
}

export async function insertEvent(input: {
  title: string;
  description: string;
  event_date: string;
  registration_url: string | null;
}): Promise<{ id: string; slug: string }> {
  const { db } = await getBindings();
  const id = newId();
  const slug = await uniqueEventSlugFromTitle(input.title);
  const now = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO events (id, title, slug, description, event_date, registration_url, cover_image_key, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NULL, ?, ?)`
    )
    .bind(
      id,
      input.title,
      slug,
      input.description,
      input.event_date,
      input.registration_url,
      now,
      now
    )
    .run();
  return { id, slug };
}

export async function updateEvent(
  id: string,
  input: {
    title: string;
    description: string;
    event_date: string;
    registration_url: string | null;
  }
): Promise<void> {
  const { db } = await getBindings();
  const now = new Date().toISOString();
  await db
    .prepare(
      `UPDATE events SET
        title = ?,
        description = ?,
        event_date = ?,
        registration_url = ?,
        updated_at = ?
      WHERE id = ?`
    )
    .bind(
      input.title,
      input.description,
      input.event_date,
      input.registration_url,
      now,
      id
    )
    .run();
}

export async function deleteEvent(id: string): Promise<void> {
  const { db } = await getBindings();
  await db.prepare("DELETE FROM events WHERE id = ?").bind(id).run();
}

export async function setEventCoverImageKey(eventId: string, key: string | null): Promise<void> {
  const { db } = await getBindings();
  const now = new Date().toISOString();
  await db
    .prepare("UPDATE events SET cover_image_key = ?, updated_at = ? WHERE id = ?")
    .bind(key, now, eventId)
    .run();
}
