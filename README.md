# nutritionarchive — Duolingo-styled Nutrition pSEO Site

A Next.js 16 (App Router) programmatic SEO site built on a 4,000-item nutrition
dataset and statically exported as Cloudflare Workers static assets.

## What's built

- **Homepage** (`/`) — animated hero, fuzzy search, popular foods, category
  browser, "how it works" section, CTA. Full `WebSite` + `Organization` +
  `CollectionPage`/`ItemList` JSON-LD.
- **Nutrition pages** (`/nutrition-facts/[slug]`) — one pre-rendered HTML page
  per food, generated from the local nutrition dataset at build time. Includes
  quick stats, macro ratio chart, full nutrition label table (per 100g + per
  serving), micronutrients with %DV, health benefits, cautions, serving ideas,
  storage tips, FAQ accordion, and related foods. `Article` + `FAQPage` +
  `BreadcrumbList` JSON-LD for rich snippets.
- **`/foods`** — full directory with category filters + pagination (internal
  linking backbone for crawl coverage at scale).
- **`sitemap.xml`** and **`robots.txt`** generated from the dataset.
- Duolingo-inspired design system: custom Tailwind v4 theme tokens, pressable
  "3D" buttons, rounded everything, Baloo 2 font (self-hosted via
  `@fontsource`, no external font fetch needed — safe for any host).

## Scaling the dataset

Everything reads from `data/nutrition.json`. Replace it with the converted
dataset (keeping the same record shape) and rebuild. The static build generates
and verifies a detail page for every record.

Next.js emits React Server Component payload files for client-side navigation.
This site uses ordinary browser navigation instead, so the build removes those
unused payloads before deployment. A post-build check enforces Cloudflare Workers Free's 20,000-static-asset and 25 MiB per-file limits.
`sitemap.xml` stays under
Google's 50k-URL-per-sitemap limit for up to 10k records.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/ and Workers asset-limit checks
npm run preview    # preview the static assets with Wrangler
```

## Deploy to Cloudflare Workers

This is a fully static Next.js export. Wrangler deploys the contents of `out/`
as Workers static assets; requests for generated HTML files are served directly
without running application code in a Worker. This avoids the CPU timeout from
server-rendering nutrition pages.

Use a **Workers Builds** project connected to this repository. Set:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`

There is no separate output-directory setting in Workers Builds. The
`assets.directory` setting in `wrangler.jsonc` points Wrangler to `./out`;
the build script creates that directory before Wrangler runs. Keep the
pre-filled `npx wrangler deploy` command. Do not use `wrangler pages deploy`
for this Workers project.

The build script verifies every nutrition page and keeps the static asset
count below the Workers Free limit before deployment. For a local production
preview, run `npm run cf:preview`. For a manual build and deploy, authenticate
with `npx wrangler login` and run `npm run cf:deploy`.

## Before going live

- Update `lib/site.ts` with your real domain (`SITE_URL`) — this feeds every
  canonical URL, OG tag, and the sitemap.
- Set `NEXT_PUBLIC_FORMSUBMIT_EMAIL` to the inbox that should receive correction
  reports. FormSubmit will ask you to confirm the address the first time it is used.
- Swap `public/favicon.svg` for your real brand mark if desired.
- Nutrition facts are for general informational purposes; consider adding a
  disclaimer if publishing at scale (a starter one is already in the footer).
