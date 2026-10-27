import InfoPage, { InfoSection, InfoList } from "@/components/InfoPage";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import {
  SITE_NAME,
  SITE_URL,
  SITE_OWNER,
  NUTRITION_DATASET_URL,
} from "@/lib/site";
import { getTotalCount } from "@/lib/data";

export const metadata = createPageMetadata({
  title: "Data Methodology & Sources",
  description: `Understand how ${SITE_NAME} presents nutrition data and handles correction reports.`,
  path: "/methodology",
  keywords: ["nutrition data methodology", "nutrition data sources", "nutrition facts accuracy", "food database methodology"],
});

export default function MethodologyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: `${SITE_NAME} Food Nutrition Dataset`,
          description: `A searchable collection of ${getTotalCount()} food nutrition records with calories, macronutrients, selected micronutrients, serving information, and educational context.`,
          url: `${SITE_URL}/methodology`,
          creator: { "@type": "Person", name: SITE_OWNER, url: `${SITE_URL}/about` },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          isAccessibleForFree: true,
          inLanguage: "en-US",
          variableMeasured: ["Calories", "Protein", "Carbohydrates", "Fiber", "Fat", "Selected micronutrients"],
          citation: [
            "https://fdc.nal.usda.gov/",
            "https://world.openfoodfacts.org/",
            NUTRITION_DATASET_URL,
          ],
        }}
      />
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
        <p>Each food page links to a USDA FoodData Central search for that food&apos;s name to make it easier to explore reference records. The search may return several possible matches, and it does not identify which exact source record was used for the values shown on our page.</p>
        <p>We maintain a separate source map for record-level checks; it does not alter the published nutrition dataset. A page is labeled with a verified USDA record link only when a specific record has been checked for food identity, preparation state, and relevant nutrition values. Foods without a verified mapping show a search link instead. A matching record still does not independently verify every value on the page.</p>
        <p>We also publish the 4,000-record dataset used to populate this directory on <a href={NUTRITION_DATASET_URL} target="_blank" rel="noreferrer" className="font-extrabold text-duo-green hover:text-duo-green-dark">Hugging Face</a>. It is a public copy of our site dataset for inspection and reuse, not an independent verification source. The USDA search is provided as a way to explore possible reference records; it does not establish a record-level match to each value shown here.</p>
      </InfoSection>
      <InfoSection title="What each record includes">
        <InfoList>
          <li>Calories and macronutrients such as protein, carbohydrates, fiber, sugars, and fat.</li>
          <li>Selected micronutrients and their displayed daily-value percentages.</li>
          <li>Serving, storage, preparation, and general educational context.</li>
          <li>Related foods selected by category, nutrient overlap, name proximity, and shared usage language.</li>
        </InfoList>
      </InfoSection>
      <InfoSection title="Sources and correction reports">
        <p>The directory is built from structured nutrition records maintained for {SITE_NAME}. The data is not independently laboratory tested by the site owner, and we cannot guarantee that every record is complete, current, correctly matched, or appropriate for a particular product.</p>
        <p>The site owner may assess submitted correction requests for plausibility and supporting evidence. A report may lead to a correction, clarification, additional context, or no change when the available evidence is inconclusive. This report-handling process is not a professional nutrition review, and food records are not routinely audited individually.</p>
      </InfoSection>
      <InfoSection title="Important limitation">
        <p>Nutrition data is an estimate for general education, not a guarantee for a particular product or meal. For medical, allergy, sports-performance, pregnancy, or disease-management decisions, use current professional or product-specific guidance.</p>
      </InfoSection>
      </InfoPage>
    </>
  );
}