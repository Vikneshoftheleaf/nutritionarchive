# nutritionarchive — Duolingo-styled Nutrition pSEO Site

A Next.js 16 (App Router) programmatic SEO site built on a 4,000-item nutrition
dataset and statically exported for Cloudflare Pages.

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
unused payloads before deployment. A post-build check enforces Cloudflare Pages
Free's 20,000-file and 25 MiB per-file limits. `sitemap.xml` stays under
Google's 50k-URL-per-sitemap limit for up to 10k records.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/ and Pages limit checks
npm run preview    # serve out/ locally with Wrangler Pages
```

## Deploy to Cloudflare Pages

This is a fully static Next.js export; it does not need a Worker, server
rendering, or on-demand routes.

For a Git-connected deployment, create a **Workers & Pages > Pages** project,
connect this repository, and select **Next.js (Static HTML Export)** as the
framework preset. Set:

- **Build command:** `npm run build`
- **Build output directory:** `out`

Use `npm run build` instead of `npx next build` so the post-build step removes
unused React Server Component payloads and checks Pages asset limits before
upload. `wrangler.jsonc` also declares `pages_build_output_dir: "./out"`.

For a Git-connected **Pages** project, do not configure a custom deploy
command. Pages publishes the configured `out` directory automatically after
the build; `wrangler.jsonc` declares `pages_build_output_dir: "./out"`.

Use `npm run cf:preview` only for a local production preview. Do not use
`wrangler deploy` or `wrangler pages deploy` as a Git integration deploy
command.

## Before going live

- Update `lib/site.ts` with your real domain (`SITE_URL`) — this feeds every
  canonical URL, OG tag, and the sitemap.
- Set `NEXT_PUBLIC_FORMSUBMIT_EMAIL` to the inbox that should receive correction
  reports. FormSubmit will ask you to confirm the address the first time it is used.
- Swap `public/favicon.svg` for your real brand mark if desired.
- Nutrition facts are for general informational purposes; consider adding a
  disclaimer if publishing at scale (a starter one is already in the footer).
