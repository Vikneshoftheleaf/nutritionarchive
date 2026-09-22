import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import PopularFoods from "@/components/PopularFoods";
import HowItWorks from "@/components/HowItWorks";
import FinalCta from "@/components/FinalCta";
import JsonLd from "@/components/JsonLd";
import ShareFact from "@/components/ShareFact";
import { getFeaturedItems, getTotalCount } from "@/lib/data";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";

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
          about: {
            "@type": "Thing",
            name: "Nutrition Facts",
          },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: total,
            itemListElement: featured.map((item, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              url: `${SITE_URL}/nutrition-facts/${item.slug}`,
              name: `${item.name} Nutrition Facts`,
            })),
          },
        }}
      />
      <Hero />
      
      <PopularFoods />
      <CategoryGrid />
      <HowItWorks />
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
