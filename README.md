# nutritionarchive — Duolingo-styled Nutrition pSEO Site

A Next.js 16 (App Router) programmatic SEO site built on a 430-item nutrition
dataset (schema supports scaling to 10k+ items with zero code changes).

## What's built

- **Homepage** (`/`) — animated hero, fuzzy search, popular foods, category
  browser, "how it works" section, CTA. Full `WebSite` + `Organization` +
  `CollectionPage`/`ItemList` JSON-LD.
- **Dynamic nutrition pages** (`/nutrition-facts/[slug]`) — one page per food,
  rendered on demand from the local nutrition dataset to keep Worker builds
  within Cloudflare's build-storage limits. Includes quick stats, macro ratio
  chart, full nutrition label table (per 100g + per
  serving), micronutrients with %DV, health benefits, cautions, serving ideas,
  storage tips, FAQ accordion, and related foods. `Article` + `FAQPage` +
  `BreadcrumbList` JSON-LD for rich snippets.
- **`/foods`** — full directory with category filters + pagination (internal
  linking backbone for crawl coverage at scale).
- **`sitemap.xml`** and **`robots.txt`** generated dynamically from the
  dataset.
- Duolingo-inspired design system: custom Tailwind v4 theme tokens, pressable
  "3D" buttons, rounded everything, Baloo 2 font (self-hosted via
  `@fontsource`, no external font fetch needed — safe for any host).

## Scaling to 10k items

Everything reads from `data/nutrition.json`, generated from your JSONL via
the same slugify logic used in the sample. To regenerate with your full
10k-record file, replace `data/nutrition.json` with the converted output
(keep the same shape: `{ slug, keyword, ...originalFields }`) and rebuild —
no other code changes needed. Nutrition detail pages render on request, so
adding records does not generate thousands of extra pages during the build.

The dataset still needs to be read during builds and requests, so larger files
will increase build and response work. `sitemap.xml` is a single file and stays
under Google's 50k-URL-per-sitemap limit at 10k items.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build:next # build for a standard Node.js Next.js server
npm run start      # serve the standard Next.js build
```

## Deploy to Cloudflare Workers

This project uses the OpenNext Cloudflare adapter. The Worker serves the
Next.js app and its generated assets; no static-export setting is needed.
OpenNext warns that Windows builds are not fully supported; use WSL for more
reliable builds and deployments.

For a Git-connected deployment, create a **Workers & Pages > Workers** project
and connect this repository with the repository root as the project root. Set:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`

The default build command creates the OpenNext output in `.open-next`, which is
what `wrangler.jsonc` deploys. Do not use `next build` as the Workers build
command: it creates `.next` but not the Worker bundle, resulting in
`Could not find compiled Open Next config`.

For local use, install dependencies with `npm install`, authenticate Wrangler
with `npx wrangler login`, and optionally copy `.dev.vars.example` to
`.dev.vars` for Workers preview. Run `npm run cf:preview` to build and test in
the Workers runtime, `npm run cf:deploy` to build and deploy directly, or
`npm run cf:upload` to upload a version without activating it.

The Worker name and self-reference binding are set in `wrangler.jsonc`. Update
the `name` and matching service name there if you want a different Worker name.
Wrangler uses the authenticated account unless an account ID is explicitly
configured. Add any secrets through Wrangler or the Cloudflare dashboard;
don't put secrets in `wrangler.jsonc` or `.dev.vars.example`.

## Before going live

- Update `lib/site.ts` with your real domain (`SITE_URL`) — this feeds every
  canonical URL, OG tag, and the sitemap.
- Set `NEXT_PUBLIC_FORMSUBMIT_EMAIL` to the inbox that should receive correction
  reports. FormSubmit will ask you to confirm the address the first time it is used.
- Swap `public/favicon.svg` for your real brand mark if desired.
- Nutrition facts are for general informational purposes; consider adding a
  disclaimer if publishing at scale (a starter one is already in the footer).
