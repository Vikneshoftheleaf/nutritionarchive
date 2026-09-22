import Link from "next/link";
import {
  getAllItems,
  getCategories,
  CATEGORY_LABELS,
  CATEGORY_EMOJI,
  getTotalCount,
  HUB_METRICS,
  getMetricLabel,
} from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import PaginatedFoodGrid from "@/components/PaginatedFoodGrid";
import LegacyCategoryRedirect from "@/components/LegacyCategoryRedirect";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import ShareFact from "@/components/ShareFact";
import { createPageMetadata, SITE_PUBLISHED, SITE_LAST_MODIFIED } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "All Foods — Browse the Full Nutrition Directory",
  description: `Browse the complete ${SITE_NAME} directory of ${getTotalCount()}+ foods with full nutrition facts, filterable by category.`,
  path: "/foods",
  keywords: ["all foods", "food nutrition facts", "nutrition directory", "calories by food", "food database"],
  type: "article",
});

const FORMATTED_PUBLISHED_DATE = new Date(SITE_PUBLISHED).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const FORMATTED_MODIFIED_DATE = new Date(SITE_LAST_MODIFIED).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function FoodsPage() {
  const categories = getCategories();
  const items = getAllItems();
  const total = items.length;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "All Foods — Nutrition Facts Directory",
          description: `Complete directory of ${total} foods with full nutrition facts.`,
          url: `${SITE_URL}/foods`,
          datePublished: SITE_PUBLISHED,
          dateModified: SITE_LAST_MODIFIED,
          inLanguage: "en-US",
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
        }}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <LegacyCategoryRedirect />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All Foods" }]} />

        <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
          All Foods
          <span className="ml-2 text-lg font-bold text-ink-light">
            ({total} {total === 1 ? "food" : "foods"})
          </span>
        </h1>
        <p className="mt-2 max-w-2xl font-semibold text-ink-light">
          Explore the complete nutrition facts directory. Filter by category or jump
          straight to a food.
        </p>

        {/* Published / Modified time meta info */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-bold text-ink-light">
          <span className="flex items-center gap-1.5">
            <span>Published:</span>
            <time dateTime={SITE_PUBLISHED} className="font-extrabold text-ink">
              {FORMATTED_PUBLISHED_DATE}
            </time>
          </span>
          <span className="text-hare">•</span>
          <span className="flex items-center gap-1.5">
            <span>Last updated:</span>
            <time dateTime={SITE_LAST_MODIFIED} className="font-extrabold text-duo-green-dark">
              {FORMATTED_MODIFIED_DATE}
            </time>
          </span>
        </div>

        <ShareFact
          foodName={`the ${SITE_NAME} food directory`}
          url={`${SITE_URL}/foods`}
          eyebrow="Share the directory"
          heading="Help someone find their next food"
          description="Share this searchable collection of nutrition facts with a curious eater."
        />

        {/* Category filter pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/foods"
            className="rounded-full border-2 border-duo-green bg-duo-green px-4 py-2 text-sm font-extrabold text-white transition-colors"
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/foods/${c}`}
              className="rounded-full border-2 border-hare bg-white px-4 py-2 text-sm font-extrabold text-ink-light transition-colors hover:border-duo-green"
            >
              {CATEGORY_EMOJI[c]} {CATEGORY_LABELS[c]}
            </Link>
          ))}
        </div>

        <nav aria-label="Nutrition hubs" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-extrabold text-duo-blue">
          {HUB_METRICS.map((metric) => (
            <Link key={metric} href={`/foods/${metric}`} className="hover:text-duo-blue-dark">
              {getMetricLabel(metric)}
            </Link>
          ))}
        </nav>

        {/* Paginated Food Grid */}
        <PaginatedFoodGrid
          items={items}
          basePath="/foods"
          emptyMessage="No foods found."
        />
      </div>
    </>
  );
}
