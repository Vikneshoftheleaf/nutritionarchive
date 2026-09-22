import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import {
  getAllSlugs,
  getItemBySlug,
  getRelatedItemGroups,
  CATEGORY_LABELS,
  CATEGORY_EMOJI,
} from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { createPageMetadata, SITE_LAST_MODIFIED, SITE_PUBLISHED } from "@/lib/metadata";

import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import QuickStats from "@/components/QuickStats";
import MacroRatio from "@/components/MacroRatio";
import NutritionTable from "@/components/NutritionTable";
import MicronutrientGrid from "@/components/MicronutrientGrid";
import GlycemicBadge from "@/components/GlycemicBadge";
import {
  BenefitsList,
  CautionList,
  ServingIdeas,
  StorageTip,
} from "@/components/BenefitsAndCautions";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedGrid from "@/components/RelatedGrid";
import ContextualLinks from "@/components/ContextualLinks";
import ReportDataIssue from "@/components/ReportDataIssue";
import ShareFact from "@/components/ShareFact";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) return {};

  const title = item.meta_title || `${item.name} Nutrition Facts`;
  const description = item.meta_description;
  return createPageMetadata({
    title,
    description,
    path: `/nutrition-facts/${item.slug}`,
    keywords: [`nutrition facts ${item.name.toLowerCase()}`, `${item.name.toLowerCase()} nutrition`, `${item.name.toLowerCase()} calories`, `${item.name.toLowerCase()} protein`, "nutrition facts"],
    type: "article",
    publishedTime: SITE_PUBLISHED,
  });
}

export default async function NutritionFactPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) notFound();

  const relatedGroups = getRelatedItemGroups(item, 6);
  const contextualItems = Array.from(
    new Map(
      Object.values(relatedGroups)
        .flat()
        .filter((candidate) => candidate.slug !== item.slug)
        .map((candidate) => [candidate.slug, candidate])
    ).values()
  );
  const url = `${SITE_URL}/nutrition-facts/${item.slug}`;
  const categoryLabel = CATEGORY_LABELS[item.category];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: categoryLabel,
              item: `${SITE_URL}/foods?category=${item.category}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: `${item.name} Nutrition Facts`,
              item: url,
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${item.name} Nutrition Facts`,
          description: item.meta_description,
          datePublished: SITE_PUBLISHED,
          dateModified: SITE_LAST_MODIFIED,
          url,
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: { "@type": "Organization", name: SITE_NAME },
          articleSection: categoryLabel,
          about: {
            "@type": "Thing",
            name: item.name,
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "Calories (per 100g)",
                value: `${item.per_100g.calories_kcal} kcal`,
              },
              {
                "@type": "PropertyValue",
                name: "Protein (per 100g)",
                value: `${item.per_100g.protein_g} g`,
              },
              {
                "@type": "PropertyValue",
                name: "Carbohydrates (per 100g)",
                value: `${item.per_100g.carbs_g} g`,
              },
              {
                "@type": "PropertyValue",
                name: "Fat (per 100g)",
                value: `${item.per_100g.fat_g} g`,
              },
              {
                "@type": "PropertyValue",
                name: "Glycemic Index Category",
                value: item.glycemic_index_category,
              },
            ],
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: item.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: categoryLabel, href: `/foods?category=${item.category}` },
            { label: item.name },
          ]}
        />

        {/* Header */}
        <header className="mt-6">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-swan text-4xl sm:h-20 sm:w-20 sm:text-5xl">
              {CATEGORY_EMOJI[item.category]}
            </span>
            <div>
              <p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-duo-green">
                {categoryLabel} &middot; Nutrition Facts
              </p>
              <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                {item.name} Nutrition Facts
              </h1>
            </div>
          </div>

          <p className="mt-5 text-base font-medium leading-relaxed text-ink-light sm:text-lg">
            <ContextualLinks text={item.intro} items={contextualItems} />
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <GlycemicBadge category={item.glycemic_index_category} />
            <span className="rounded-full bg-swan px-3.5 py-1.5 text-xs font-extrabold text-ink-light">
              Serving: {item.serving.description} ({item.serving.grams}g)
            </span>
          </div>
        </header>

        <ShareFact foodName={item.name} url={url} />

        {/* Quick stats */}
        <section className="mt-8">
          <QuickStats per100g={item.per_100g} />
        </section>

        {/* Macro ratio */}
        <section className="mt-8 rounded-2xl border-2 border-hare bg-white p-5">
          <MacroRatio per100g={item.per_100g} />
        </section>

        {/* Full nutrition table */}
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-extrabold text-ink">
            Full nutrition breakdown
          </h2>
          <NutritionTable per100g={item.per_100g} serving={item.serving} />
        </section>

        {/* Micronutrients */}
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-extrabold text-ink">
            Key vitamins &amp; minerals
          </h2>
          <MicronutrientGrid items={item.key_micronutrients} />
        </section>

        {/* Health benefits */}
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-extrabold text-ink">
            Health benefits of {item.name.toLowerCase()}
          </h2>
          <BenefitsList benefits={item.health_benefits} relatedItems={contextualItems} />
        </section>

        {/* Things to consider */}
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-extrabold text-ink">
            Things to consider
          </h2>
          <CautionList points={item.things_to_consider} />
        </section>

        {/* Serving ideas + storage */}
        <section className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-extrabold text-ink">
              Serving ideas
            </h2>
            <ServingIdeas ideas={item.serving_ideas} relatedItems={contextualItems} />
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-extrabold text-ink">Storage</h2>
            <StorageTip tip={item.storage_tip} relatedItems={contextualItems} />
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-extrabold text-ink">
            Frequently asked questions
          </h2>
          <FaqAccordion faqs={item.faqs} relatedItems={contextualItems} />
        </section>

        {/* Related */}
        <RelatedGrid items={relatedGroups.sameCategory} title={`More ${categoryLabel.toLowerCase()} nutrition facts`} />
        <RelatedGrid items={relatedGroups.sharedMicronutrients} title="Foods with similar micronutrients" />
        <RelatedGrid items={relatedGroups.alphabetical} title="Explore nearby foods" />
        <RelatedGrid items={relatedGroups.commonlyUsedTogether} title="Often used together" />

        <ReportDataIssue foodName={item.name} />

        <div className="mt-14 rounded-2xl border-2 border-dashed border-hare p-6 text-center">
          <p className="font-bold text-ink-light">
            Looking for another food?
          </p>
          <Link
            href="/foods"
            className="mt-3 inline-block rounded-2xl bg-duo-green px-6 py-3 font-extrabold text-white shadow-[0_4px_0_0_#46A302] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
          >
            Browse all foods
          </Link>
        </div>
      </article>
    </>
  );
}
