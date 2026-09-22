# nutritionarchive — Duolingo-styled Nutrition pSEO Site

A Next.js 16 (App Router) programmatic SEO site built on a 430-item nutrition
dataset (schema supports scaling to 10k+ items with zero code changes).

## What's built

- **Homepage** (`/`) — animated hero, fuzzy search, popular foods, category
  browser, "how it works" section, CTA. Full `WebSite` + `Organization` +
  `CollectionPage`/`ItemList` JSON-LD.
- **Dynamic nutrition pages** (`/nutrition-facts/[slug]`) — one page per food,
  statically generated at build time (`generateStaticParams`). Includes quick
  stats, macro ratio chart, full nutrition label table (per 100g + per
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
no other code changes needed. `generateStaticParams` will produce 10k static
pages automatically.

Two things to watch at 10k scale:
1. Build time will grow — consider `output: 'export'`-style ISR
   (`export const dynamic = 'force-static'` is already default) or switching
   some params to on-demand ISR if builds get too slow.
2. `sitemap.xml` currently returns everything in one file, comfortably under
   Google's 50k-URL-per-sitemap limit even at 10k+ items.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + static generation check
npm run start    # serve the production build
```

## Before going live

- Update `lib/site.ts` with your real domain (`SITE_URL`) — this feeds every
  canonical URL, OG tag, and the sitemap.
- Set `NEXT_PUBLIC_FORMSUBMIT_EMAIL` to the inbox that should receive correction
  reports. FormSubmit will ask you to confirm the address the first time it is used.
- Swap `public/favicon.svg` for your real brand mark if desired.
- Nutrition facts are for general informational purposes; consider adding a
  disclaimer if publishing at scale (a starter one is already in the footer).
