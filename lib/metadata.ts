import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_OG_IMAGE, TWITTER_HANDLE } from "./site";

export const SITE_LAST_MODIFIED = "2026-09-22";
export const SITE_PUBLISHED = "2026-09-22";

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const openGraph = {
    title,
    description,
    url,
    siteName: SITE_NAME,
    locale: "en_US",
    type,
    images: [{ url: SITE_OG_IMAGE, alt: `${SITE_NAME} logo` }],
    modifiedTime: SITE_LAST_MODIFIED,
    ...(publishedTime ? { publishedTime } : {}),
  } as const;

  return {
    title,
    description,
    keywords,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: { canonical: path },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
      images: [SITE_OG_IMAGE],
    },
    other: {
      "last-modified": SITE_LAST_MODIFIED,
    },
  };
}