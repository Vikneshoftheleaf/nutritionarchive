import type { MetadataRoute } from "next";
import { getAllItems, getCategories, HUB_METRICS } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { SITE_LAST_MODIFIED } from "@/lib/metadata";

const PAGE_SIZE = 60;
const LAST_MODIFIED = new Date(`${SITE_LAST_MODIFIED}T00:00:00.000Z`);

function foodsUrl(params?: Record<string, string | number>): string {
  if (!params) return `${SITE_URL}/foods`;
  const searchParams = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );
  // Next serializes sitemap URLs as XML text without escaping query separators.
  return `${SITE_URL}/foods?${searchParams.toString().replace(/&/g, "&amp;")}`;
}

function pageCount(count: number): number {
  return Math.max(1, Math.ceil(count / PAGE_SIZE));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const items = getAllItems();
  const categories = getCategories();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: foodsUrl(),
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: foodsUrl({ category: c }),
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const trustRoutes: MetadataRoute.Sitemap = [
    "about",
    "methodology",
    "corrections",
    "contact",
    "privacy",
    "terms",
    "disclaimer",
  ].map((page) => ({
    url: `${SITE_URL}/${page}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const paginatedRoutes: MetadataRoute.Sitemap = [
    ...Array.from({ length: pageCount(items.length) - 1 }, (_, index) => ({
      url: foodsUrl({ page: index + 2 }),
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...categories.flatMap((category) => {
      const categoryItems = items.filter((item) => item.category === category);
      return Array.from({ length: pageCount(categoryItems.length) - 1 }, (_, index) => ({
        url: foodsUrl({ category, page: index + 2 }),
        lastModified: LAST_MODIFIED,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      }));
    }),
  ];

  const hubRoutes: MetadataRoute.Sitemap = HUB_METRICS.flatMap((metric) => [
    { url: `${SITE_URL}/foods/${metric}`, lastModified: LAST_MODIFIED, changeFrequency: "weekly" as const, priority: 0.7 },
    ...categories.map((category) => ({ url: `${SITE_URL}/foods/${metric}?category=${category}`, lastModified: LAST_MODIFIED, changeFrequency: "weekly" as const, priority: 0.55 })),
  ]);

  const itemRoutes: MetadataRoute.Sitemap = items.map((item) => ({
    url: `${SITE_URL}/nutrition-facts/${item.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...trustRoutes, ...paginatedRoutes, ...hubRoutes, ...itemRoutes];
}
