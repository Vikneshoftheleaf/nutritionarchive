import Link from "@/components/StaticLink";
import { notFound } from "next/navigation";
import {
  getCategories,
  getItemsByCategory,
  getCardItemsByCategory,
  getHighestCalorie,
  getHighestProtein,
  getLowestCalorie,
  getMetricLabel,
  CATEGORY_LABELS,
  CATEGORY_EMOJI,
  HUB_METRICS,
  type HubMetric,
} from "@/lib/data";
import type { Category } from "@/lib/types";
import Breadcrumbs from "@/components/Breadcrumbs";
import PaginatedFoodGrid from "@/components/PaginatedFoodGrid";
import ShareFact from "@/components/ShareFact";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { createPageMetadata, SITE_PUBLISHED, SITE_LAST_MODIFIED } from "@/lib/metadata";

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  fruit: "Browse fruit entries and compare the calories, macronutrients, and other nutrition values listed for each food.",
  vegetable: "Browse vegetable entries, from leafy greens to root vegetables, and review the nutrition values available for each food.",
  grain: "Explore grains, cereals, breads, and oats with the nutrition values listed for each entry.",
  meat: "Browse meat and poultry entries and compare their listed calories, protein, and other nutrition values.",
  seafood: "Explore fish and shellfish entries with the nutrition values available for each food.",
  dairy: "Browse milk, cheese, yogurt, and other dairy entries with their listed nutrition values.",
  legume: "Explore beans, lentils, chickpeas, and peas and review the nutrition values listed for each entry.",
  beverage: "Browse beverage entries, including juices, coffee, and tea, with their listed nutrition values.",
  herb_or_spice: "Explore herbs and spices and review the nutrition values available for each entry.",
  nut_or_seed: "Browse nuts and seeds and compare the nutrition values listed for each food.",
  oil_or_fat: "Explore oils and fats with the nutrition values available for each entry.",
  egg: "Browse egg entries and review the nutrition values listed for each food.",
  other: "Explore additional food entries and the nutrition values available for each one.",
  alcoholic_beverage: "Browse beer, wine, and spirit entries with their listed nutrition and serving information.",
  candy_or_dessert: "Explore sweets, baked treats, and desserts with the nutrition values listed for each entry.",
  condiment_or_sauce: "Browse sauces, dressings, and condiments and review their listed nutrition values.",
  snack_savory: "Explore savory snack entries, including crackers and chips, with their listed nutrition values.",
  prepared_dish: "Browse prepared meals and dishes with the nutrition values available for each entry.",
  bakery: "Explore breads, pastries, and other baked goods with their listed nutrition values.",
};

const FORMATTED_PUBLISHED_DATE = new Date(`${SITE_PUBLISHED}T00:00:00Z`).toLocaleDateString("en-US", {
  timeZone: "UTC",
  year: "numeric",
  month: "short",
  day: "numeric",
});

const FORMATTED_MODIFIED_DATE = new Date(`${SITE_LAST_MODIFIED}T00:00:00Z`).toLocaleDateString("en-US", {
  timeZone: "UTC",
  year: "numeric",
  month: "short",
  day: "numeric",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...getCategories().map((category) => ({ category })),
    ...HUB_METRICS.map((category) => ({ category })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: rawSlug } = await params;
  const category = decodeURIComponent(rawSlug);
  const categories = getCategories();

  if (categories.includes(category as Category)) {
    const label = CATEGORY_LABELS[category as Category];
    const items = getItemsByCategory(category as Category);
    const count = items.length;
    return createPageMetadata({
      title: `${label} Nutrition Facts (${count} Foods)`,
      description: `Browse ${count} ${label.toLowerCase()} entries and the listed calories, protein, carbohydrates, and other available nutrition values on ${SITE_NAME}.`,
      path: `/foods/${category}`,
      keywords: [
        label.toLowerCase(),
        `${label.toLowerCase()} nutrition`,
        `${label.toLowerCase()} calories`,
        `${label.toLowerCase()} nutrition facts`,
        "food directory",
      ],
      type: "article",
      publishedTime: SITE_PUBLISHED,
    });
  }

  if (HUB_METRICS.includes(category as HubMetric)) {
    const label = getMetricLabel(category as HubMetric);
    return createPageMetadata({
      title: label,
      description: `Browse ${label.toLowerCase()} with nutrition facts, calories, protein, vitamins, and more.`,
      path: `/foods/${category}`,
      keywords: [
        label.toLowerCase(),
        `${label.toLowerCase()} nutrition facts`,
        "food calories",
        "food protein",
      ],
      type: "article",
      publishedTime: SITE_PUBLISHED,
    });
  }

  return {};
}

export default async function FoodCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: rawSlug } = await params;
  const category = decodeURIComponent(rawSlug);
  const categories = getCategories();

  // If this matches a standard food Category
  if (categories.includes(category as Category)) {
    const cat = category as Category;
    const label = CATEGORY_LABELS[cat];
    const emoji = CATEGORY_EMOJI[cat];
    const items = getCardItemsByCategory(cat);
    const total = items.length;
    const description = CATEGORY_DESCRIPTIONS[cat] ?? `Browse listed nutrition values for ${label.toLowerCase()} entries.`;
    const canonicalUrl = `${SITE_URL}/foods/${cat}`;

    return (
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${label} Nutrition Facts`,
            headline: `${label} Nutrition Facts Directory`,
            description,
            url: canonicalUrl,
            image: `${SITE_URL}/logo.png`,
            datePublished: SITE_PUBLISHED,
            dateModified: SITE_LAST_MODIFIED,
            inLanguage: "en-US",
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
            },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: total,
              itemListOrder: "https://schema.org/ItemListUnordered",
              itemListElement: items.slice(0, 24).map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                description: item.intro,
                url: `${SITE_URL}/nutrition-facts/${item.slug}`,
              })),
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "All Foods", item: `${SITE_URL}/foods` },
              { "@type": "ListItem", position: 3, name: label, item: canonicalUrl },
            ],
          }}
        />

        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "All Foods", href: "/foods" },
              { label },
            ]}
          />

          <div className="mt-4 flex items-center gap-3">
            <span className="text-4xl sm:text-5xl">{emoji}</span>
            <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
              {label}
              <span className="ml-3 text-lg font-bold text-ink-light">
                ({total} {total === 1 ? "food" : "foods"})
              </span>
            </h1>
          </div>

          <p className="mt-3 max-w-2xl font-semibold text-ink-light">
            {description}
          </p>

          {/* Published / Modified time meta info */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-bold text-ink-light">
            <span className="flex items-center gap-1.5">
              <span>Site launched:</span>
              <time dateTime={SITE_PUBLISHED} className="text-ink font-extrabold">
                {FORMATTED_PUBLISHED_DATE}
              </time>
            </span>
            <span className="text-hare">•</span>
            <span className="flex items-center gap-1.5">
              <span>Site experience updated:</span>
              <time dateTime={SITE_LAST_MODIFIED} className="text-duo-green-dark font-extrabold">
                {FORMATTED_MODIFIED_DATE}
              </time>
            </span>
          </div>

          <ShareFact
            foodName={`${label.toLowerCase()} nutrition directory`}
            url={canonicalUrl}
            eyebrow={`Share ${label}`}
            heading={`Help someone explore ${label.toLowerCase()}`}
            description={`Share this collection of ${total} ${label.toLowerCase()} entries and their available nutrition values.`}
          />

          {/* Category filter pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/foods"
              className="rounded-full border-2 border-hare bg-white px-4 py-2 text-sm font-extrabold text-ink-light transition-colors hover:border-duo-green"
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/foods/${c}`}
                className={`rounded-full border-2 px-4 py-2 text-sm font-extrabold transition-colors ${
                  c === cat
                    ? "border-duo-green bg-duo-green text-white"
                    : "border-hare bg-white text-ink-light hover:border-duo-green"
                }`}
              >
                {CATEGORY_EMOJI[c]} {CATEGORY_LABELS[c]}
              </Link>
            ))}
          </div>

          {/* Nutrition hubs navigation */}
          <nav
            aria-label="Nutrition hubs"
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-extrabold text-duo-blue"
          >
            {HUB_METRICS.map((metric) => (
              <Link key={metric} href={`/foods/${metric}`} className="hover:text-duo-blue-dark">
                {getMetricLabel(metric)}
              </Link>
            ))}
          </nav>

          {/* Paginated Food Grid */}
          <PaginatedFoodGrid
            items={items}
            basePath={`/foods/${cat}`}
            emptyMessage={`No foods found in ${label}.`}
          />
        </main>
      </>
    );
  }

  // If this matches a Hub Metric (e.g. highest-protein, lowest-calorie, highest-calorie)
  if (HUB_METRICS.includes(category as HubMetric)) {
    const metric = category as HubMetric;
    const label = getMetricLabel(metric);
    const items =
      metric === "highest-protein"
        ? getHighestProtein()
        : metric === "lowest-calorie"
          ? getLowestCalorie()
          : getHighestCalorie();
    const canonicalUrl = `${SITE_URL}/foods/${metric}`;

    return (
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${label} | ${SITE_NAME}`,
            headline: label,
            description: `A browsable nutrition hub ranked by ${
              metric === "highest-protein" ? "protein per 100g" : "calories per 100g"
            }.`,
            url: canonicalUrl,
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
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "All Foods", item: `${SITE_URL}/foods` },
              { "@type": "ListItem", position: 3, name: label, item: canonicalUrl },
            ],
          }}
        />

        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "All Foods", href: "/foods" },
              { label },
            ]}
          />
          <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">{label}</h1>
          <p className="mt-2 max-w-2xl font-semibold text-ink-light">
            A browsable nutrition hub ranked by{" "}
            {metric === "highest-protein" ? "protein per 100g" : "calories per 100g"}.
          </p>

          {/* Published / Modified time meta info */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-bold text-ink-light">
            <span className="flex items-center gap-1.5">
              <span>Site launched:</span>
              <time dateTime={SITE_PUBLISHED} className="text-ink font-extrabold">
                {FORMATTED_PUBLISHED_DATE}
              </time>
            </span>
            <span className="text-hare">•</span>
            <span className="flex items-center gap-1.5">
              <span>Site experience updated:</span>
              <time dateTime={SITE_LAST_MODIFIED} className="text-duo-green-dark font-extrabold">
                {FORMATTED_MODIFIED_DATE}
              </time>
            </span>
          </div>

          {/* Category filter pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/foods"
              className="rounded-full border-2 border-hare bg-white px-4 py-2 text-sm font-extrabold text-ink-light transition-colors hover:border-duo-green"
            >
              All Foods
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/foods/${cat}`}
                className="rounded-full border-2 border-hare bg-white px-4 py-2 text-sm font-extrabold text-ink-light transition-colors hover:border-duo-green"
              >
                {CATEGORY_EMOJI[cat]} {CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </div>

          {/* Paginated Food Grid */}
          <PaginatedFoodGrid
            items={items}
            basePath={`/foods/${metric}`}
            emptyMessage="No foods found for this ranking."
          />
        </main>
      </>
    );
  }

  notFound();
}
