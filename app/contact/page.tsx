import ContactForm from "@/components/ContactForm";
import InfoPage, { InfoSection } from "@/components/InfoPage";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata = createPageMetadata({
  title: `Contact ${SITE_NAME}`,
  description: `Contact the creator of ${SITE_NAME} with questions, feedback, or partnership ideas.`,
  path: "/contact",
  keywords: [`contact ${SITE_NAME}`, "nutrition website contact", "food database feedback", "nutrition facts feedback"],
});

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact"
      title="Let&apos;s keep improving the archive"
      intro="Have a question, suggestion, partnership idea, or feedback about Nutritionarchive? Send a message and we&apos;ll take a look."
    >
      <InfoSection title="Before you write">
        <p>For a specific nutrition error, include the food name, the value or statement in question, and a reliable source if you have one. You can also use the correction form on every facts page.</p>
        <p>Please do not send medical records, passwords, payment information, or other sensitive personal information.</p>
      </InfoSection>
      <ContactForm />
    </InfoPage>
  );
}