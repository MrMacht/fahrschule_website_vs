# Agent Notes — VS Fahrschule Website

## Tech Stack
- Next.js 16 (App Router), React 19, TypeScript 5.7
- Tailwind CSS v4 (`@tailwindcss/postcss`), shadcn/ui (New York style)
- Deployed to **Cloudflare Workers** via `@opennextjs/cloudflare` (OpenNext)

## Package Manager & Runtime
- **pnpm** 10.26.1 (enforced via `packageManager` field)
- Node 22 (`.nvmrc`); `package.json` accepts `>=20.9 <25`

## Developer Commands
```bash
pnpm dev           # local Next.js dev server
pnpm build         # Next.js build
pnpm preview       # opennextjs-cloudflare build + local preview
pnpm deploy        # opennextjs-cloudflare build + deploy to Cloudflare
pnpm upload        # opennextjs-cloudflare build + upload (no deploy)
pnpm cf-typegen    # wrangler types → cloudflare-env.d.ts
pnpm lint          # eslint .
```

## Architecture
- `app/page.tsx` is the public landing page.
- Route groups:
  - `/` — landing page
  - `/datenschutz`, `/impressum` — static legal pages
- `lib/kalender-termine.json` is the single source of truth for the course calendar rendered by `components/kalender.tsx`. Update this JSON to change schedule data.
- `components/ui/` — shadcn/ui components (auto-generated; prefer modifying via `npx shadcn add ...` if adding new primitives).

## Build & Deploy Quirks
- `next.config.mjs` sets:
  - `images.unoptimized: true` — required for Cloudflare/static deployment
  - `typescript.ignoreBuildErrors: true` — build will not fail on TS errors
- `wrangler.jsonc` points to `.open-next/worker.js` and `.open-next/assets`. The `.open-next/` directory is gitignored.
- `open-next.config.ts` uses default Cloudflare config (`defineCloudflareConfig({})`).
- `.dev.vars` contains local secrets and is gitignored. Do not commit it.

## Style Conventions
- Tailwind v4 CSS-first config lives in `app/globals.css` (no `tailwind.config.js`).
- Theme colors are CSS custom properties (`--primary: #e91e8c`, etc.).
- Alias `@/*` maps to repo root (`./*`).

## Gotchas
- No test runner or test files exist in the repo. `pnpm test` is not defined.
- No custom ESLint config file exists; `eslint .` runs with defaults.
- The site is German-language (`lang="de"`). Keep UI text in German.
- The `OFFENE_DATEN_CHECKLISTE.md` is a business/data checklist, not technical documentation.
