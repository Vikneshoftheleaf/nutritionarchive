import Link from "next/link";
import InfoPage, { InfoSection } from "@/components/InfoPage";
import { SITE_NAME, SITE_OWNER, SITE_OWNER_ROLE } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: `About ${SITE_NAME}`,
  description: `Learn how ${SITE_NAME} helps people explore nutrition facts in a clear, approachable way.`,
  path: "/about",
  keywords: [`about ${SITE_NAME}`, "nutrition facts website", "food nutrition directory", "nutrition information"],
});

export default function AboutPage() {
  return (
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
        <p>{SITE_NAME} is an independent personal project. The content is prepared with care, but it is not presented as professional medical or dietary advice.</p>
      </InfoSection>
      <InfoSection title="Why this site exists">
        <p>Nutrition information is often scattered across product labels, databases, and difficult-to-read references. {SITE_NAME} brings common food information into one simple directory without putting the core browsing experience behind an account or paywall.</p>
        <p>The site is a personal publishing and educational project, not a medical practice, government service, clinical database, or replacement for professional dietary advice.</p>
      </InfoSection>
      <InfoSection title="Our sources">
        <p>The underlying food information is compiled and organized using publicly available data from <a className="font-extrabold text-duo-green hover:text-duo-green-dark" href="https://fdc.nal.usda.gov/" target="_blank" rel="noreferrer">USDA FoodData Central</a> and <a className="font-extrabold text-duo-green hover:text-duo-green-dark" href="https://world.openfoodfacts.org/" target="_blank" rel="noreferrer">Open Food Facts</a>. Source data may be adapted, normalized, combined, rounded, or presented differently for readability. See the <Link className="font-extrabold text-duo-green hover:text-duo-green-dark" href="/methodology">methodology page</Link> for more detail.</p>
      </InfoSection>
      <InfoSection title="How to use the site">
        <p>Use search and categories to find a food, then compare its per-100-gram values with serving-level context. For packaged foods, allergies, medical conditions, or decisions where accuracy matters, use the current product label and advice from a qualified professional.</p>
      </InfoSection>
      <InfoSection title="Keeping the directory useful">
        <p>Every facts page includes a correction form. When you spot a questionable value, send us the food name, the value that looks wrong, and a suggested correction. We appreciate specific reports with a source or product label. See our <Link className="font-extrabold text-duo-green hover:text-duo-green-dark" href="/corrections">corrections policy</Link> for details.</p>
      </InfoSection>
    </InfoPage>
  );
}