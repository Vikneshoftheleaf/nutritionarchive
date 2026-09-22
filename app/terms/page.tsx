import InfoPage, { InfoSection, InfoList } from "@/components/InfoPage";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description: `Terms for using the ${SITE_NAME} nutrition directory.`,
  path: "/terms",
  keywords: [`${SITE_NAME} terms`, "nutrition website terms of use", "food database terms", "nutrition information terms"],
});

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Terms of use"
      title={`Use ${SITE_NAME} thoughtfully`}
      intro="By using this site, you agree to use its information as general educational material and to verify important decisions with appropriate sources."
    >
      <InfoSection title="Informational content only">
        <p>{SITE_NAME} provides general nutrition information. It is not medical advice, a diagnosis, a treatment plan, or a substitute for a qualified clinician, registered dietitian, allergist, or product label.</p>
      </InfoSection>
      <InfoSection title="Accuracy and availability">
        <p>We work to make the directory useful, but nutrition values can be incomplete, rounded, outdated, incorrectly categorized, or different from a specific product. Data is compiled from third-party sources and may contain errors. The site owner does not guarantee that any content is complete, current, accurate, reliable, or suitable for your purpose.</p>
      </InfoSection>
      <InfoSection title="No professional relationship">
        <p>Using {SITE_NAME} does not create a medical, dietary, nutritional, consulting, or other professional relationship between you and the site owner. Nothing on the site should be relied on as individualized advice.</p>
      </InfoSection>
      <InfoSection title="Responsible use">
        <InfoList>
          <li>Do not use the site alone for allergy, medication, pregnancy, disease-management, or emergency decisions.</li>
          <li>Do not submit confidential or sensitive personal information through the correction form.</li>
          <li>Do not scrape, overload, disrupt, or attempt to bypass reasonable site protections.</li>
        </InfoList>
      </InfoSection>
      <InfoSection title="Limitation of responsibility">
        <p>To the fullest extent permitted by applicable law, the site owner is not responsible for losses, harm, decisions, or outcomes resulting from reliance on information published on or linked from this site. You use the site and its information at your own discretion and risk.</p>
        <p>This does not exclude any responsibility that cannot legally be excluded under applicable law.</p>
      </InfoSection>
      <InfoSection title="Third-party sources and links">
        <p>References to USDA FoodData Central, Open Food Facts, FormSubmit, or other third-party services do not mean those organizations endorse, sponsor, or operate {SITE_NAME}. External services and links are subject to their own terms, availability, and privacy practices.</p>
      </InfoSection>
      <InfoSection title="Changes">
        <p>We may update the content, features, or these terms as the directory develops. Continued use of the site after an update means you accept the revised terms.</p>
      </InfoSection>
    </InfoPage>
  );
}