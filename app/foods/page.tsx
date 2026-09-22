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
import type { Category } from "@/lib/types";
import FoodCard from "@/components/FoodCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import ShareFact from "@/components/ShareFact";
import { createPageMetadata } from "@/lib/metadata";

const PAGE_SIZE = 60;

export const metadata = createPageMetadata({
  title: "All Foods — Browse the Full Nutrition Directory",
  description: `Browse the complete ${SITE_NAME} directory of ${getTotalCount()}+ foods with full nutrition facts, filterable by category.`,
  path: "/foods",
  keywords: ["all foods", "food nutrition facts", "nutrition directory", "calories by food", "food database"],
});

export default async function FoodsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const category = sp.category as Category | undefined;
  const q = (sp.q ?? "").trim().toLowerCase();
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const categories = getCategories();
  let items = getAllItems();

  if (category && categories.includes(category)) {
    items = items.filter((i) => i.category === category);
  }
  if (q) {
    items = items.filter((i) => i.name.toLowerCase().includes(q));
  }

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = items.slice(start, start + PAGE_SIZE);

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (q) params.set("q", q);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/foods?${qs}` : "/foods";
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
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
          className={`rounded-full border-2 px-4 py-2 text-sm font-extrabold transition-colors ${
            !category
              ? "border-duo-green bg-duo-green text-white"
              : "border-hare bg-white text-ink-light hover:border-duo-green"
          }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/foods?category=${c}`}
            className={`rounded-full border-2 px-4 py-2 text-sm font-extrabold transition-colors ${
              category === c
                ? "border-duo-green bg-duo-green text-white"
                : "border-hare bg-white text-ink-light hover:border-duo-green"
            }`}
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

      {/* Grid */}
      {pageItems.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {pageItems.map((item) => (
            <FoodCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border-2 border-dashed border-hare p-10 text-center font-bold text-ink-light">
          No foods found. Try a different category.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          <Link
            href={pageHref(Math.max(1, currentPage - 1))}
            rel={currentPage > 1 ? "prev" : undefined}
            aria-disabled={currentPage === 1}
            className={`rounded-xl border-2 border-hare px-3 py-2 text-sm font-extrabold ${
              currentPage === 1
                ? "pointer-events-none opacity-40"
                : "text-ink hover:border-duo-green"
            }`}
          >
            Prev
          </Link>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (p) =>
                p === 1 ||
                p === totalPages ||
                Math.abs(p - currentPage) <= 1
            )
            .map((p, idx, arr) => (
              <span key={p} className="flex items-center gap-2">
                {idx > 0 && arr[idx - 1] !== p - 1 && (
                  <span className="font-bold text-wolf">…</span>
                )}
                <Link
                  href={pageHref(p)}
                  className={`rounded-xl border-2 px-3.5 py-2 text-sm font-extrabold ${
                    p === currentPage
                      ? "border-duo-green bg-duo-green text-white"
                      : "border-hare text-ink hover:border-duo-green"
                  }`}
                >
                  {p}
                </Link>
              </span>
            ))}
          <Link
            href={pageHref(Math.min(totalPages, currentPage + 1))}
            rel={currentPage < totalPages ? "next" : undefined}
            aria-disabled={currentPage === totalPages}
            className={`rounded-xl border-2 border-hare px-3 py-2 text-sm font-extrabold ${
              currentPage === totalPages
                ? "pointer-events-none opacity-40"
                : "text-ink hover:border-duo-green"
            }`}
          >
            Next
          </Link>
        </nav>
      )}
    </div>
  );
}
