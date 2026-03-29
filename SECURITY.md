# Security Policy

## Reporting a Vulnerability

Please report suspected vulnerabilities privately to the project maintainers before opening a public issue. Include the affected route, expected impact, reproduction steps, and any logs or screenshots that help explain the issue.

If no private contact is available in your fork, create a minimal public issue that asks for a security contact without publishing exploit details.

## Secrets and Configuration

- Never commit `.env.local`, `.dev.vars`, Cloudflare API tokens, account IDs, service credentials, private keys, or production-only secrets.
- Keep committed examples limited to safe placeholders such as `.env.example` and `.dev.vars.example`.
- `wrangler.jsonc` may include public resource names, but account-specific values such as a D1 `database_id` should be replaced in each deployment.

## Deployment Hardening

- Protect `/admin` and `/api/admin/*` with Cloudflare Access or an equivalent authentication layer.
- Consider Cloudflare rate limiting, Turnstile, or bot protection for public write endpoints such as `/api/subscribe`.
- Treat `/api/media?key=...` URLs as public once object keys are visible on the website.
- Keep `/api/health/cloudflare` available only if the operational visibility is useful for your deployment. Avoid exposing detailed internal errors in production forks.

## Dependency Hygiene

Run `npm audit` when upgrading dependencies and review changes to the Cloudflare, Next.js, and image upload paths carefully.
