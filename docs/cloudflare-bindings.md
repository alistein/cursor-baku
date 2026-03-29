# Cloudflare Setup

Cursor Baku deploys to Cloudflare Workers with OpenNext. It uses D1 for community data and R2 for uploaded event/gallery images.

Use this checklist when deploying your own fork.

## 1. Authenticate Wrangler

Install dependencies first:

```bash
npm install
```

Log in to Cloudflare:

```bash
npx wrangler login
```

Confirm Wrangler can see your account:

```bash
npx wrangler whoami
```

## 2. Create Cloudflare Resources

Create a D1 database. The public project config uses the display name `cusor-community-baku`:

```bash
npx wrangler d1 create cusor-community-baku
```

Create an R2 bucket. The public project config uses the bucket name `cursor-baku-bucket`:

```bash
npx wrangler r2 bucket create cursor-baku-bucket
```

You may choose different names for your fork, but update `wrangler.jsonc` and the docs if you do.

## 3. Update `wrangler.jsonc`

The repository intentionally keeps public names but does not commit a real D1 UUID:

```jsonc
{
  "binding": "CursorBakuDB",
  "database_name": "cusor-community-baku",
  "database_id": "<YOUR_D1_DATABASE_ID>"
}
```

Copy the D1 Database ID from the Cloudflare dashboard or from the `wrangler d1 create` output and replace `<YOUR_D1_DATABASE_ID>` locally before deploying.

Expected bindings:

| Binding | Type | Variable name |
| --- | --- | --- |
| D1 | D1 database | `CursorBakuDB` |
| R2 | R2 bucket | `CursorBakuBucket` |
| Assets | OpenNext static assets | `ASSETS` |

After changing bindings, regenerate Cloudflare types:

```bash
npm run cf-typegen
```

This refreshes `cloudflare-env.d.ts` so `env.CursorBakuDB` and `env.CursorBakuBucket` stay typed.

## 4. Apply the D1 Schema

The admin UI expects these tables:

- `subscribers`
- `events`
- `gallery_albums`
- `gallery_images`

Apply the bundled schema from the project root:

```bash
npx wrangler d1 execute cusor-community-baku --remote --file=./docs/cloudflare-d1-schema.sql
```

The schema uses `IF NOT EXISTS`, so it is safe to re-run for initial setup. If future migrations are added, run them in numeric order.

For local D1 development, omit `--remote`:

```bash
npx wrangler d1 execute cusor-community-baku --file=./docs/cloudflare-d1-schema.sql
```

## 5. Build and Deploy

Build the OpenNext Worker output:

```bash
npm run cf:build
```

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

The deploy command runs the OpenNext Cloudflare build and then deploys the Worker.

## 6. Verify Production Bindings

After deployment, visit:

```text
https://your-domain.example/api/health/cloudflare
```

The health route checks:

- D1 with `SELECT 1`
- R2 with a tiny write, read, and delete

If this endpoint is too revealing for your production needs, restrict or remove it in your fork.

## 7. Protect Admin Routes

The app does not include application-level authentication for the admin area. In production, protect these paths with Cloudflare Access or an equivalent access-control layer:

```text
/admin
/admin/*
/api/admin/*
```

## 8. Public Media Behavior

The public media endpoint streams R2 objects by key:

```text
/api/media?key=...
```

This is intended for public event and gallery images. Once a key is rendered on the site, treat it like a public URL. For private media, add signed URLs, stricter key-prefix validation, or separate buckets.

## 9. Environment Variables

The app currently uses:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL for SEO and Open Graph metadata. |

Copy `.env.example` to `.env.local` for local development. Keep real `.env.local` and `.dev.vars` files out of git.
