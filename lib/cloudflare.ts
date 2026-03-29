import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getBindings() {
  const { env } = await getCloudflareContext({ async: true });
  return {
    db: env.CursorBakuDB,
    r2: env.CursorBakuBucket,
  };
}
