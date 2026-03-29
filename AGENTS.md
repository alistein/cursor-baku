# AI Agent Contribution Guide

This file is for AI coding agents and maintainers using automated assistance on the Cursor Baku website.

## Project Context

Cursor Baku is a volunteer-led community website built with Next.js, TypeScript, Tailwind CSS, and Cloudflare Workers through OpenNext. The app includes public marketing pages, events, gallery pages, a Telegram waitlist, subscriber collection, and a small admin area backed by Cloudflare D1 and R2.

## Code Conventions

- Follow the existing Next.js App Router layout in `app/`.
- Keep reusable UI in `components/`, grouped by feature when possible.
- Keep Cloudflare binding access and D1/R2 helpers in `lib/`.
- Use the `@/*` import alias for project-root imports.
- Keep edits scoped to the user request. Do not do broad refactors as part of small fixes.
- Prefer accessible semantic HTML and responsive Tailwind classes.
- Use TypeScript types for new data flowing between D1, server actions, API routes, and UI components.

## Secrets and Safety

- Never commit `.env.local`, `.dev.vars`, Cloudflare API tokens, account IDs, private keys, or production credentials.
- Keep `.env.example` and `.dev.vars.example` safe and placeholder-only.
- Do not replace the placeholder D1 `database_id` in `wrangler.jsonc` with a real production UUID in a public PR.
- Treat `/admin` and `/api/admin/*` as protected production routes. Documentation should continue to mention Cloudflare Access.
- Treat R2 media keys served through `/api/media?key=...` as public once they are rendered on the site.

## Cloudflare Changes

When changing Cloudflare bindings, D1 tables, or R2 behavior:

1. Update `wrangler.jsonc` only with safe public configuration.
2. Update `cloudflare-env.d.ts` by running `npm run cf-typegen` if bindings change.
3. Update `docs/cloudflare-d1-schema.sql` or migrations when database tables change.
4. Update `docs/cloudflare-bindings.md` and README deployment notes.

## Figma and Visual Work

When implementing from a Figma reference, work section by section and match both desktop and mobile designs closely. Split large sections into reusable components when it improves clarity or reuse, and prefer existing project tokens and component patterns over one-off styles.

## Verification

Before finishing a code change, run the most relevant checks:

```bash
npm run lint
npm run build
```

If a check cannot be run, explain why in the final response or pull request notes.
