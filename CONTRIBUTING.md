# Contributing

Thanks for helping improve Cursor Baku. This is a volunteer community project, so clear, focused contributions are easiest to review and ship.

## Local Setup

1. Fork or clone the repository.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env.local` and update values if needed.
4. Run `npm run dev` and open `http://localhost:3000`.

For Cloudflare-backed admin and media work, also read `docs/cloudflare-bindings.md`.

## Development Guidelines

- Keep changes focused. Prefer one feature, fix, or documentation update per pull request.
- Follow the existing App Router structure in `app/`, shared component patterns in `components/`, and Cloudflare data helpers in `lib/`.
- Use TypeScript types for new data shapes and keep server-only Cloudflare access in server code.
- Keep UI responsive across mobile and desktop.
- Use semantic HTML and accessible labels for interactive controls.
- Optimize public images and only commit assets that are licensed for redistribution.
- Do not commit secrets, real `.env.local`, `.dev.vars`, Cloudflare API tokens, or account-specific private IDs.

## Checks Before a Pull Request

Run these locally before opening a PR:

```bash
npm run lint
npm run build
```

If your change touches Cloudflare bindings, also run:

```bash
npm run cf-typegen
```

If your change touches D1 tables, update `docs/cloudflare-d1-schema.sql` or add a new migration and update `docs/cloudflare-bindings.md`.

## Pull Request Expectations

In your PR description, include:

- What changed.
- Why it changed.
- Screenshots or screen recordings for UI changes.
- Any required Cloudflare, D1, R2, or environment setup.
- The checks you ran.

## Working With AI Agents

AI-assisted contributions are welcome, but the final result should still be reviewed by a human. Agents should follow `AGENTS.md`, keep edits scoped, and avoid changing deployment identifiers or public configuration without explaining why.
