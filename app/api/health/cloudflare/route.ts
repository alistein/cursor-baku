import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Verifies production D1 (`CursorBakuDB`) and R2 (`CursorBakuBucket`) bindings in the Workers runtime.
 */
export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = env.CursorBakuDB;
    const bucket = env.CursorBakuBucket;

    // D1: simple query
    const row = await db.prepare("SELECT 1 AS ok").first<{ ok: number }>();
    const d1Ok = row?.ok === 1;

    // R2: write, read, delete a tiny object
    const key = `__health/${crypto.randomUUID()}.txt`;
    await bucket.put(key, "ok", { httpMetadata: { contentType: "text/plain" } });
    const object = await bucket.get(key);
    const body = object ? await object.text() : null;
    const r2Ok = body === "ok";
    await bucket.delete(key);

    return NextResponse.json({
      ok: d1Ok && r2Ok,
      d1: d1Ok,
      r2: r2Ok,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        ok: false,
        d1: false,
        r2: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
