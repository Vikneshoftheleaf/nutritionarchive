import InfoPage, { InfoSection, InfoList } from "@/components/InfoPage";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Nutrition Disclaimer",
  description: `Important limitations for using ${SITE_NAME} nutrition information.`,
  path: "/disclaimer",
  keywords: ["nutrition disclaimer", "nutrition information disclaimer", "medical advice disclaimer", "food data limitations"],
});

export default function DisclaimerPage() {
  return (
    <InfoPage
      eyebrow="Nutrition disclaimer"
      title="A helpful reference, not personal medical advice"
      intro={`The information on ${SITE_NAME} is intended for general education and should be interpreted with care.`}
    >
      <InfoSection title="Before relying on a number">
        <p>Nutrition values on {SITE_NAME} are compiled from third-party sources and may be inaccurate, incomplete, rounded, outdated, or mismatched to a particular product. Values vary with species, cultivar, brand, fortification, preparation, storage, and serving size. A food page cannot represent every product sold under that food name.</p>
      </InfoSection>
      <InfoSection title="When to ask a professional">
        <InfoList>
          <li>Managing diabetes, kidney disease, heart disease, an eating disorder, or another medical condition.</li>
          <li>Planning nutrition during pregnancy, breastfeeding, childhood, or intensive athletic training.</li>
          <li>Evaluating allergies, intolerances, medication interactions, or food-safety risks.</li>
        </InfoList>
        <p>A qualified healthcare professional can account for your history, goals, medications, and current product information.</p>
      </InfoSection>
      <InfoSection title="No guarantee of outcomes">
        <p>Mentions of health benefits describe general nutritional context. They do not promise that eating a food will prevent, treat, or cure a disease, or produce a particular health result.</p>
      </InfoSection>
      <InfoSection title="No responsibility for reliance">
        <p>{SITE_NAME} and its owner are not responsible for decisions, losses, injuries, allergic reactions, dietary outcomes, or other consequences arising from reliance on the site&apos;s content. Check current packaging and consult an appropriate professional when the stakes are important.</p>
      </InfoSection>
    </InfoPage>
  );
}