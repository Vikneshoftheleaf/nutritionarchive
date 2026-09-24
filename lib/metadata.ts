import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_OG_IMAGE, TWITTER_HANDLE } from "./site";

export const SITE_LAST_MODIFIED = "2026-09-24";
export const SITE_PUBLISHED = "2026-09-24";

const DEFAULT_TITLE = `${SITE_NAME} — Nutrition Facts`;
const DEFAULT_DESCRIPTION =
  "Explore calories, macros, vitamins, minerals, and practical nutrition facts for everyday foods.";

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime = SITE_PUBLISHED,
  modifiedTime = SITE_LAST_MODIFIED,
}: {
  title?: string | null;
  description?: string | null;
  path?: string | null;
  keywords?: string[] | null;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
}): Metadata {
  const safeTitle = title?.trim() || DEFAULT_TITLE;
  const safeDescription = description?.trim() || DEFAULT_DESCRIPTION;
  const safePath = path?.trim() || "/";
  const safeKeywords = keywords?.filter((keyword) => keyword?.trim()) ?? [];
  const url = `${SITE_URL}${safePath}`;
  const safePublishedTime = publishedTime?.trim() || SITE_PUBLISHED;
  const safeModifiedTime = modifiedTime?.trim() || SITE_LAST_MODIFIED;

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    title: safeTitle,
    description: safeDescription,
    url,
    siteName: SITE_NAME,
    locale: "en_US",
    type,
    images: [{ url: SITE_OG_IMAGE, alt: `${SITE_NAME} logo` }],
    modifiedTime: safeModifiedTime,
    publishedTime: safePublishedTime,
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
      "last-modified": safeModifiedTime,
      "article:published_time": safePublishedTime,
      "article:modified_time": safeModifiedTime,
      "publish-date": safePublishedTime,
      "og:updated_time": safeModifiedTime,
    },
  };
}