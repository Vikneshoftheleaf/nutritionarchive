import Hero from "@/components/Hero";
import Link from "next/link";
import CategoryGrid from "@/components/CategoryGrid";
import PopularFoods from "@/components/PopularFoods";
import HowItWorks from "@/components/HowItWorks";
import FinalCta from "@/components/FinalCta";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import ShareFact from "@/components/ShareFact";
import { getFeaturedItems, getTotalCount } from "@/lib/data";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_TAGLINE, SITE_OWNER, SITE_OWNER_ROLE } from "@/lib/site";
import { createPageMetadata, SITE_PUBLISHED, SITE_LAST_MODIFIED } from "@/lib/metadata";
import type { Faq } from "@/lib/types";

const HOME_FAQS: Faq[] = [
  {
    question: "What can I find on Nutritionarchive?",
    answer: `Nutritionarchive is a searchable directory of ${getTotalCount()} foods with calories, macronutrients, selected micronutrients, serving information, and practical nutrition context.`,
  },
  {
    question: "Are the nutrition values shown per serving or per 100 grams?",
    answer: "Most values are shown per 100 grams so foods can be compared consistently. Each food page also includes the serving description and serving weight available for that record.",
  },
  {
    question: "Where does the nutrition data come from?",
    answer: "The directory is compiled and organized from publicly available nutrition data, including USDA FoodData Central and Open Food Facts. Records may be normalized, rounded, or presented differently for readability.",
  },
  {
    question: "Can I use Nutritionarchive for medical or dietary decisions?",
    answer: "The site is an educational reference, not medical advice. For allergies, medical conditions, pregnancy, sports performance, or product-specific decisions, check current labels and consult a qualified professional.",
  },
  {
    question: "How can I report an incorrect nutrition value?",
    answer: "Use the correction form on the relevant nutrition facts page and include the food name, the value or wording in question, and a reliable source when possible.",
  },
];

export const metadata = createPageMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  path: "/",
  keywords: ["nutrition facts", "food nutrition database", "calories", "macros", "vitamins", "healthy eating"],
});

export default function Home() {
  const featured = getFeaturedItems(8);
  const total = getTotalCount();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${SITE_NAME} — ${SITE_TAGLINE}`,
          description: SITE_DESCRIPTION,
          url: SITE_URL,
          datePublished: SITE_PUBLISHED,
          dateModified: SITE_LAST_MODIFIED,
          about: {
            "@type": "Thing",
            name: "Nutrition Facts",
          },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: total,
            itemListOrder: "https://schema.org/ItemListUnordered",
            itemListElement: featured.map((item, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              url: `${SITE_URL}/nutrition-facts/${item.slug}`,
              name: `${item.name} Nutrition Facts`,
              description: item.intro,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <Hero />

      <PopularFoods />
      <CategoryGrid />
      <HowItWorks />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-duo-green">About {SITE_NAME}</p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">A clearer way to explore food nutrition</h2>
          <div className="mt-4 space-y-4 font-medium leading-relaxed text-ink-light">
            <p>{SITE_NAME} is an independent, free-to-use nutrition reference created by {SITE_OWNER}, a {SITE_OWNER_ROLE}. It brings food facts into one searchable directory so you can compare calories, macros, vitamins, minerals, and serving context more easily.</p>
            <p>The information is designed for everyday learning and comparison. It is not a substitute for a product label, medical advice, or guidance from a qualified professional.</p>
          </div>
          <Link href="/about" className="mt-5 inline-flex rounded-xl bg-duo-green px-5 py-3 font-extrabold text-white shadow-[0_4px_0_0_#46A302] transition-transform hover:-translate-y-0.5">
            Learn about the archive
          </Link>
        </div>
        <div id="faq" className="scroll-mt-24">
          <p className="text-xs font-extrabold uppercase tracking-wide text-duo-blue">Common questions</p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">Nutritionarchive FAQ</h2>
          <div className="mt-5">
            <FaqAccordion faqs={HOME_FAQS} />
          </div>
        </div>
      </section>
      <FinalCta />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ShareFact
          foodName={`${SITE_NAME} nutrition directory`}
          url={SITE_URL}
          eyebrow="Share the directory"
          heading="Know someone comparing foods?"
          description="Send them a simple place to explore calories, macros, vitamins, and more."
        />
      </div>
    </>
  );
}
