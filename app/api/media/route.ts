import { getObjectBody } from "@/lib/admin/media";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Streams an object from R2 for public pages (events/gallery on the marketing site).
 * Responses are stored in the Cloudflare edge cache (caches.default) so repeat
 * requests for the same key are served without hitting R2.
 */
export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  // Check the Cloudflare edge cache first (only available in the Workers runtime).
  // `caches.default` is a Cloudflare Workers extension not present in the standard CacheStorage type.
  const cfCaches = typeof caches !== "undefined" ? (caches as unknown as { default: Cache }) : null;
  const cache = cfCaches?.default ?? null;
  if (cache) {
    const cached = await cache.match(request);
    if (cached) return cached;
  }

  try {
    const object = await getObjectBody(key);
    if (!object) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("cache-control", "public, max-age=31536000, immutable");
    const response = new NextResponse(object.body, { headers });

    // Store in the edge cache for subsequent requests.
    if (cache) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Media failed";
    return NextResponse.json(
      { error: message },
      { status: process.env.NODE_ENV === "development" ? 500 : 503 }
    );
  }
}
