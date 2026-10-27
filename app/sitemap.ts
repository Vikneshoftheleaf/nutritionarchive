import type { MetadataRoute } from "next";
import { getAllItems, getCategories, HUB_METRICS } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { SITE_LAST_MODIFIED } from "@/lib/metadata";
export const dynamic = "force-static";
const LAST_MODIFIED = new Date(`${SITE_LAST_MODIFIED}T00:00:00.000Z`);

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
      url: `${SITE_URL}/foods`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/compare`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/foods/${c}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.8,
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
    priority: 0.8,
  }));

  const hubRoutes: MetadataRoute.Sitemap = HUB_METRICS.map((metric) => ({
    url: `${SITE_URL}/foods/${metric}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const itemRoutes: MetadataRoute.Sitemap = items.map((item) => ({
    url: `${SITE_URL}/nutrition-facts/${item.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 1,
  }));

  return [...staticRoutes, ...categoryRoutes, ...trustRoutes, ...hubRoutes, ...itemRoutes];
}
