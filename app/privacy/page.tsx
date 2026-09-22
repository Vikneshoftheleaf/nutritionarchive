import InfoPage, { InfoSection, InfoList } from "@/components/InfoPage";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: `Read how ${SITE_NAME} handles information submitted through the site.`,
  path: "/privacy",
  keywords: [`${SITE_NAME} privacy policy`, "nutrition website privacy", "FormSubmit privacy", "correction form privacy"],
});

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Privacy"
      title={`Your information and ${SITE_NAME}`}
      intro="We keep the site focused on public nutrition information and collect only what is needed for the features we provide."
    >
      <InfoSection title="Information you choose to send">
        <p>If you submit a correction request, the food name, correction message, and optional email address are sent to the site owner&apos;s review inbox through FormSubmit. We use that information to investigate the report and communicate about it when an email address is provided. Do not include sensitive personal or health information.</p>
      </InfoSection>
      <InfoSection title="Third-party form processing">
        <p>Correction requests are transmitted through FormSubmit, an external form-delivery service. That service may process the submission to deliver it to us and apply its own privacy terms. Do not include sensitive health information, passwords, payment details, or anything you would not want sent by email.</p>
      </InfoSection>
      <InfoSection title="Site usage">
        <InfoList>
          <li>Nutrition pages and the directory can be browsed without creating an account.</li>
          <li>We do not ask for medical histories or dietary profiles.</li>
          <li>Hosting, security, and standard server logs may process technical information such as browser and request data.</li>
        </InfoList>
      </InfoSection>
      <InfoSection title="How information is handled">
        <p>Correction messages are retained only as long as reasonably needed to review, document, or follow up on the issue, subject to practical email and hosting backups. We do not sell correction submissions or use them to build advertising profiles.</p>
        <p>The site may rely on hosting infrastructure, standard security logs, and third-party services needed to deliver forms. Those providers may process technical or submitted information under their own policies.</p>
      </InfoSection>
      <InfoSection title="Questions">
        <p>For a privacy question or a request about a correction submission, use the contact details configured for the site or avoid including personal information in a public report.</p>
      </InfoSection>
    </InfoPage>
  );
}