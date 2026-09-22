import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FoodCard from "@/components/FoodCard";
import {
  CATEGORY_LABELS,
  HUB_METRICS,
  getCategories,
  getHighestCalorie,
  getHighestProtein,
  getLowestCalorie,
  getItemsByMetric,
  getMetricLabel,
} from "@/lib/data";
import type { Category } from "@/lib/types";
import { SITE_NAME } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
const PAGE_SIZE = 48;

export function generateStaticParams() {
  return HUB_METRICS.flatMap((metric) => [
    { metric },
    ...getCategories().map((category) => ({ metric, category })),
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ metric: string }> }) {
  const { metric } = await params;
  if (!HUB_METRICS.includes(metric as (typeof HUB_METRICS)[number])) return {};
  const label = getMetricLabel(metric as (typeof HUB_METRICS)[number]);
  return createPageMetadata({
    title: `${label} | ${SITE_NAME}`,
    description: `Browse ${label.toLowerCase()} with nutrition facts, calories, protein, vitamins, and more.`,
    path: `/foods/${metric}`,
    keywords: [label.toLowerCase(), `${label.toLowerCase()} by category`, "nutrition facts", "food calories", "food protein"],
  });
}

export default async function MetricFoodsPage({
  params,
  searchParams,
}: {
  params: Promise<{ metric: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { metric } = await params;
  const { category } = await searchParams;
  if (!HUB_METRICS.includes(metric as (typeof HUB_METRICS)[number])) notFound();
  const validCategory = getCategories().includes(category as Category) ? category as Category : undefined;
  const label = getMetricLabel(metric as (typeof HUB_METRICS)[number]);
  const items = validCategory
    ? getItemsByMetric(metric as (typeof HUB_METRICS)[number], validCategory)
    : metric === "highest-protein"
      ? getHighestProtein()
      : metric === "lowest-calorie"
        ? getLowestCalorie()
        : getHighestCalorie();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All Foods", href: "/foods" }, { label }]} />
      <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">{label}</h1>
      <p className="mt-2 max-w-2xl font-semibold text-ink-light">
        A browsable nutrition hub ranked by {metric === "highest-protein" ? "protein per 100g" : "calories per 100g"}.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href={`/foods/${metric}`} className={`rounded-full border-2 px-4 py-2 text-sm font-extrabold ${!validCategory ? "border-duo-green bg-duo-green text-white" : "border-hare text-ink-light"}`}>All categories</Link>
        {getCategories().map((cat) => (
          <Link key={cat} href={`/foods/${metric}?category=${cat}`} className={`rounded-full border-2 px-4 py-2 text-sm font-extrabold ${validCategory === cat ? "border-duo-green bg-duo-green text-white" : "border-hare text-ink-light"}`}>
            {CATEGORY_LABELS[cat]}
          </Link>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.slice(0, PAGE_SIZE).map((item) => <FoodCard key={item.slug} item={item} />)}
      </div>
    </main>
  );
}