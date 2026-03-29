import { getObjectBody } from "@/lib/admin/media";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Streams an object from R2 for admin previews (protected by Cloudflare Access in production).
 */
export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  try {
    const object = await getObjectBody(key);
    if (!object) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("cache-control", "private, max-age=3600");
    return new NextResponse(object.body, { headers });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Preview failed";
    return NextResponse.json(
      { error: message },
      { status: process.env.NODE_ENV === "development" ? 500 : 503 }
    );
  }
}
