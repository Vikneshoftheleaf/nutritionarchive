import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { SITE_LAST_MODIFIED, SITE_PUBLISHED } from "@/lib/metadata";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default function InfoPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  const publishedFormatted = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${SITE_PUBLISHED}T00:00:00Z`));

  const modifiedFormatted = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${SITE_LAST_MODIFIED}T00:00:00Z`));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          headline: title,
          description: intro,
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
      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
        <header className="mt-8 border-b-2 border-hare pb-8">
          <p className="text-xs font-extrabold uppercase tracking-wide text-duo-green">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-medium leading-relaxed text-ink-light">
            {intro}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-bold text-ink-light">
            <span className="flex items-center gap-1.5">
              <span>Published:</span>
              <time dateTime={SITE_PUBLISHED} className="font-extrabold text-ink">
                {publishedFormatted}
              </time>
            </span>
            <span className="text-hare">•</span>
            <span className="flex items-center gap-1.5">
              <span>Last reviewed / updated:</span>
              <time dateTime={SITE_LAST_MODIFIED} className="font-extrabold text-duo-green-dark">
                {modifiedFormatted}
              </time>
            </span>
          </div>
        </header>
        <div className="prose-nutri mt-8">{children}</div>
        <div className="mt-12 flex flex-wrap gap-3 border-t-2 border-hare pt-6">
          <Link href="/foods" className="rounded-xl bg-duo-green px-5 py-3 font-extrabold text-white shadow-[0_4px_0_0_#46A302] transition-transform hover:-translate-y-0.5">
            Browse foods
          </Link>
          <Link href="/" className="rounded-xl border-2 border-hare px-5 py-3 font-extrabold text-ink hover:border-duo-green">
            Back home
          </Link>
        </div>
      </article>
    </>
  );
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-2xl font-extrabold text-ink">{title}</h2>
      <div className="space-y-3 text-base font-medium leading-relaxed text-ink-light">{children}</div>
    </section>
  );
}

export function InfoList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5">{children}</ul>;
}