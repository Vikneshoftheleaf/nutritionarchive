import InfoPage, { InfoSection, InfoList } from "@/components/InfoPage";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Data Methodology & Sources",
  description: `Understand how ${SITE_NAME} presents, compares, and reviews nutrition data.`,
  path: "/methodology",
  keywords: ["nutrition data methodology", "nutrition data sources", "nutrition facts accuracy", "food database methodology"],
});

export default function MethodologyPage() {
  return (
    <InfoPage
      eyebrow="Methodology & sources"
      title="How our nutrition data is presented"
      intro="Transparent context matters as much as a number. Here is how to read the data in this directory and where its limits are."
    >
      <InfoSection title="A consistent comparison basis">
        <p>Most values on {SITE_NAME} are shown per 100 grams. That makes foods easier to compare even when their typical serving sizes are different. Each page also shows the serving description and gram weight available for that food.</p>
        <p>A per-100-gram value is not the same as the amount in a typical portion. Foods can also be listed in different preparation states, including raw, cooked, dried, or drained. Always check the context stated on the page and compare like with like.</p>
      </InfoSection>
      <InfoSection title="Where the data comes from">
        <p>Our food records are compiled from USDA FoodData Central and Open Food Facts, two public nutrition-data resources with different coverage, fields, naming conventions, and update cycles. We use those sources as reference material and organize selected fields into the format used by this site.</p>
        <p>Source records can change over time, and a food may vary by brand, variety, region, growing conditions, fortification, preparation, and storage. A value shown here should not be interpreted as a laboratory result for a specific product.</p>
      </InfoSection>
      <InfoSection title="What each record includes">
        <InfoList>
          <li>Calories and macronutrients such as protein, carbohydrates, fiber, sugars, and fat.</li>
          <li>Selected micronutrients and their displayed daily-value percentages.</li>
          <li>Serving, storage, preparation, and general educational context.</li>
          <li>Related foods selected by category, nutrient overlap, name proximity, and shared usage language.</li>
        </InfoList>
      </InfoSection>
      <InfoSection title="Sources and review">
        <p>The directory is built from structured nutrition records maintained for {SITE_NAME}. The data is not independently laboratory tested by the site owner, and we cannot guarantee that every record is complete, current, correctly matched, or appropriate for a particular product.</p>
        <p>We review correction requests for plausibility and supporting evidence. A report may lead to a correction, clarification, additional context, or no change when the available evidence is inconclusive.</p>
      </InfoSection>
      <InfoSection title="Important limitation">
        <p>Nutrition data is an estimate for general education, not a guarantee for a particular product or meal. For medical, allergy, sports-performance, pregnancy, or disease-management decisions, use current professional or product-specific guidance.</p>
      </InfoSection>
    </InfoPage>
  );
}