import InfoPage, { InfoSection, InfoList } from "@/components/InfoPage";
import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Corrections Policy",
  description: `Learn how to report inaccurate nutrition information on ${SITE_NAME}.`,
  path: "/corrections",
  keywords: ["report nutrition data error", "correct nutrition facts", "nutrition data correction", "food database feedback"],
});

export default function CorrectionsPage() {
  return (
    <InfoPage
      eyebrow="Corrections policy"
      title="Help us improve a food page"
      intro="Nutrition records can contain mistakes or vary by source. We want it to be easy to flag something that deserves a closer look."
    >
      <InfoSection title="What makes a useful report">
        <InfoList>
          <li>Name the food and the exact value or statement you believe is wrong.</li>
          <li>Include a reliable source, product label, or explanation when you have one.</li>
          <li>Tell us whether the issue is about serving size, preparation state, units, or wording.</li>
        </InfoList>
      </InfoSection>
      <InfoSection title="What happens next">
        <p>Reports are sent through FormSubmit to the site owner&apos;s review inbox. We check the claim against available source data and other available evidence, then update or clarify the record when appropriate. We may contact you if you include an email address, but we cannot promise a response, a correction, or a particular review time.</p>
      </InfoSection>
      <InfoSection title="What we can and cannot verify">
        <p>Some differences are legitimate: foods vary by brand, cultivar, preparation state, serving size, region, and database source. A report is not automatically proof that a value is wrong. We may retain a value, add a qualification, or decline to change it when reliable evidence is unavailable.</p>
        <p>Please do not use the form to submit medical records, private health information, passwords, payment details, or other sensitive information.</p>
      </InfoSection>
      <InfoSection title="Send a report">
        <p>The fastest way is the correction form at the bottom of every nutrition facts page. You can also start from any food in the <Link className="font-extrabold text-duo-green hover:text-duo-green-dark" href="/foods">directory</Link>.</p>
      </InfoSection>
    </InfoPage>
  );
}