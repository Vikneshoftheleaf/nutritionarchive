import Link from "@/components/StaticLink";
import InfoPage, { InfoSection } from "@/components/InfoPage";
import JsonLd from "@/components/JsonLd";
import {
  SITE_NAME,
  SITE_OWNER,
  SITE_OWNER_ROLE,
  SITE_URL,
  SITE_OG_IMAGE,
  NUTRITION_DATASET_URL,
} from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description: `Learn how ${SITE_NAME} helps people explore nutrition facts in a clear, approachable way.`,
  path: "/about",
  keywords: [`about ${SITE_NAME}`, "nutrition facts website", "food nutrition directory", "nutrition information"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: `About ${SITE_NAME}`,
          url: `${SITE_URL}/about`,
          mainEntity: {
            "@type": "Person",
            name: SITE_OWNER,
            description: `${SITE_OWNER} is the ${SITE_OWNER_ROLE} behind ${SITE_NAME}.`,
            url: `${SITE_URL}/about`,
            image: SITE_OG_IMAGE,
            worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          },
        }}
      />
      <InfoPage
        eyebrow={`About ${SITE_NAME}`}
        title="Nutrition facts without the guesswork"
        intro={`${SITE_NAME} is a searchable food directory designed to make nutrition information easier to understand and compare.`}
      >
      <InfoSection title="What we do">
        <p>{SITE_NAME} is an independent, free-to-use nutrition reference created and maintained by {SITE_OWNER}, a {SITE_OWNER_ROLE}. It was built to make everyday nutrition information easier for people to find, read, and compare.</p>
        <p>The site organizes food records into readable pages covering calories, macronutrients, vitamins, minerals, serving information, and practical context. It is intended to be useful to curious eaters, students, home cooks, creators, and anyone who wants a quick starting point for learning about food.</p>
      </InfoSection>
      <InfoSection title="Meet the creator">
        <p>I&apos;m Viknesh, a developer, content creator, and nutrition enthusiast. I created {SITE_NAME} to bring together useful food information in a format that feels clear, approachable, and practical.</p>
        <p>This project combines my interest in building helpful digital tools with my curiosity about nutrition and everyday eating. I believe useful reference information should be easy to access, easy to understand, and free for people to explore.</p>
        <p>{SITE_NAME} is an independent personal project. My interest in nutrition is personal, not a professional qualification, and the site does not provide medical or individualized dietary advice.</p>
      </InfoSection>
      <InfoSection title="Qualifications and editorial scope">
        <p>My stated professional background is in software development and content creation; I do not claim nutrition or medical credentials. No registered dietitian, nutritionist, or other qualified nutrition professional currently contributes to or reviews the food records on this site.</p>
        <p>Food pages present entries from the project dataset. They are not individually reviewed or certified by a nutrition professional. Correction reports may be assessed by the site owner against the available evidence, but that is not a professional nutrition review or a routine audit of every entry.</p>
        <p>Dates labeled as site experience updates refer to changes to the website and its shared content. They do not mean that every nutrition record was rechecked or updated on that date.</p>
      </InfoSection>
      <InfoSection title="Why this site exists">
        <p>Nutrition information is often scattered across product labels, databases, and difficult-to-read references. {SITE_NAME} brings common food information into one simple directory without putting the core browsing experience behind an account or paywall.</p>
        <p>The site is a personal publishing and educational project, not a medical practice, government service, clinical database, or replacement for professional dietary advice.</p>
      </InfoSection>
      <InfoSection title="Our sources">
        <p>The underlying food information is compiled and organized using publicly available data from <a className="font-extrabold text-duo-green hover:text-duo-green-dark" href="https://fdc.nal.usda.gov/" target="_blank" rel="noreferrer">USDA FoodData Central</a> and <a className="font-extrabold text-duo-green hover:text-duo-green-dark" href="https://world.openfoodfacts.org/" target="_blank" rel="noreferrer">Open Food Facts</a>. Source data may be adapted, normalized, combined, rounded, or presented differently for readability. See the <Link className="font-extrabold text-duo-green hover:text-duo-green-dark" href="/methodology">methodology page</Link> for more detail.</p>
        <p>The structured dataset used by this directory is <a className="font-extrabold text-duo-green hover:text-duo-green-dark" href={NUTRITION_DATASET_URL} target="_blank" rel="noreferrer">publicly available on Hugging Face</a>. It is published by this project and is not an independent audit or certification of the values. Food pages link to USDA name searches to help readers explore possible reference records; those results are not guaranteed to match the record behind an individual value.</p>
      </InfoSection>
      <InfoSection title="How to use the site">
        <p>Use search and categories to find a food, then compare its per-100-gram values with serving-level context. For packaged foods, allergies, medical conditions, or decisions where accuracy matters, use the current product label and advice from a qualified professional.</p>
      </InfoSection>
      <InfoSection title="Keeping the directory useful">
        <p>Every facts page includes a correction form. When you spot a questionable value, send us the food name, the value that looks wrong, and a suggested correction. We appreciate specific reports with a source or product label. See our <Link className="font-extrabold text-duo-green hover:text-duo-green-dark" href="/corrections">corrections policy</Link> for details.</p>
      </InfoSection>
      </InfoPage>
    </>
  );
}