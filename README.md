# Cursor Baku

![Cursor Baku Azerbaijan map](public/azerbaijan-dotted-map.svg)

Open-source website and lightweight community web app for **Cursor Baku**, a volunteer-led Cursor and AI engineering community in Azerbaijan. The project hosts the public landing page, events, gallery, Telegram waitlist, subscriber flow, and a small Cloudflare-backed admin area.

Cursor Baku brings together developers, designers, startup builders, students, and AI agents enthusiasts through meetups, Cursor Cafe sessions, hackathons, and build-in-public workshops.

## Highlights

- Public marketing pages for the community, events, gallery, and Telegram waitlist.
- Admin area for subscribers, events, R2 image uploads, and gallery albums.
- Cloudflare Workers deployment through OpenNext.
- Cloudflare D1 for structured data and R2 for uploaded media.
- SEO metadata, sitemap, robots file, Open Graph images, and responsive UI.

## Tech Stack

- [Next.js](https://nextjs.org) 16 with the App Router
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) 4
- [Cloudflare Workers](https://workers.cloudflare.com), [D1](https://developers.cloudflare.com/d1), and [R2](https://developers.cloudflare.com/r2)
- [OpenNext for Cloudflare](https://opennext.js.org/cloudflare)

## Getting Started

Requirements:

- Node.js 20 or newer
- npm
- Optional for Cloudflare work: a Cloudflare account and `wrangler` authentication

Install dependencies:

```bash
npm install
```

Copy the environment example and adjust values for your local or production domain:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app hot-reloads as you edit files.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Next.js dev server. |
| `npm run build` | Build the production Next.js app. |
| `npm run start` | Run the production server locally after `npm run build`. |
| `npm run lint` | Run ESLint. |
| `npm run cf:build` | Build the Cloudflare Worker output with OpenNext. |
| `npm run deploy` | Build and deploy to Cloudflare Workers. |
| `npm run cf-typegen` | Regenerate `cloudflare-env.d.ts` after binding changes. |

## Project Structure

```text
app/                     Next.js routes, layouts, metadata, API routes
  admin/                 Admin pages and server actions
  api/                   Subscribe, media, preview, and health endpoints
components/              Shared UI, landing sections, events, footer, gallery
lib/                     Cloudflare helpers, SEO helpers, admin data access
docs/                    Deployment, operations, and D1 schema documentation
public/                  Static assets, icons, map artwork, OG images
wrangler.jsonc           Cloudflare Worker, D1, R2, and assets bindings
open-next.config.ts      OpenNext Cloudflare configuration
```

## Cloudflare Deployment

The app is configured for Cloudflare Workers with OpenNext. The expected bindings are:

- D1 binding: `CursorBakuDB`
- R2 binding: `CursorBakuBucket`
- Assets binding: `ASSETS`

Before deploying your fork, replace the placeholder D1 `database_id` in `wrangler.jsonc` with the UUID from your Cloudflare dashboard, then regenerate types:

```bash
npm run cf-typegen
```

Create the D1 tables from the included schema:

```bash
npx wrangler d1 execute cusor-community-baku --remote --file=./docs/cloudflare-d1-schema.sql
```

Build and deploy:

```bash
npm run deploy
```

After deployment, visit `/api/health/cloudflare` on your Worker to verify D1 and R2 bindings. See [`docs/cloudflare-bindings.md`](docs/cloudflare-bindings.md) for the full setup checklist.

## Admin and Security Notes

The `/admin` area is intentionally minimal and expects infrastructure-level protection. In production, protect `/admin` and `/api/admin/*` with Cloudflare Access or an equivalent access-control layer.

Uploaded media is stored in R2 and served by key through `/api/media?key=...` for public pages. Treat those keys as public URLs once they are shown on the website. For stricter deployments, add signed URLs, prefix checks, or Cloudflare WAF rules.

Do not commit real `.env.local`, `.dev.vars`, Cloudflare API tokens, account IDs, or private resource IDs. See [`SECURITY.md`](SECURITY.md) for the open-source security policy.

## Contributing

Contributions are welcome. Start with [`CONTRIBUTING.md`](CONTRIBUTING.md) for local setup, pull request expectations, accessibility notes, and Cloudflare-specific guidance.

If you use an AI coding assistant, also read [`AGENTS.md`](AGENTS.md). It documents conventions for safe automated contributions.

## Assets

The project includes community artwork and icons in [`public/`](public/), including the Azerbaijan dotted map, community audience icons, Luma/Luhive icons, and footer decorations. Keep public assets optimized and make sure any new imagery is licensed for open-source redistribution.

## License

This project is released under the [MIT License](LICENSE).

---

Cursor Baku is a community initiative. This repository keeps the public website transparent, reusable, and easy for volunteers to improve.
