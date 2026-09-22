import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_OG_IMAGE, TWITTER_HANDLE } from "./site";

export const SITE_LAST_MODIFIED = "2026-09-22";
export const SITE_PUBLISHED = "2026-09-22";

const DEFAULT_TITLE = `${SITE_NAME} — Nutrition Facts`;
const DEFAULT_DESCRIPTION =
  "Explore calories, macros, vitamins, minerals, and practical nutrition facts for everyday foods.";

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
}: {
  title?: string | null;
  description?: string | null;
  path?: string | null;
  keywords?: string[] | null;
  type?: "website" | "article";
  publishedTime?: string | null;
}): Metadata {
  const safeTitle = title?.trim() || DEFAULT_TITLE;
  const safeDescription = description?.trim() || DEFAULT_DESCRIPTION;
  const safePath = path?.trim() || "/";
  const safeKeywords = keywords?.filter((keyword) => keyword?.trim()) ?? [];
  const url = `${SITE_URL}${safePath}`;
  const openGraph: NonNullable<Metadata["openGraph"]> = {
    title: safeTitle,
    description: safeDescription,
    url,
    siteName: SITE_NAME,
    locale: "en_US",
    type,
    images: [{ url: SITE_OG_IMAGE, alt: `${SITE_NAME} logo` }],
    modifiedTime: SITE_LAST_MODIFIED,
    ...(publishedTime?.trim() ? { publishedTime: publishedTime.trim() } : {}),
  };

  return {
    title: safeTitle,
    description: safeDescription,
    keywords: safeKeywords,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: { canonical: safePath },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: safeTitle,
      description: safeDescription,
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
      images: [SITE_OG_IMAGE],
    },
    other: {
      "last-modified": SITE_LAST_MODIFIED,
    },
  };
}