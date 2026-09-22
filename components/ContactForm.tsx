"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { FORMSUBMIT_EMAIL } from "@/lib/site";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("_subject", "Nutritionarchive contact message");
    formData.set("_captcha", "false");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border-2 border-hare bg-white p-5 shadow-[0_4px_0_0_#E5E5E5] sm:p-7">
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-extrabold text-ink">Your name</label>
          <input id="contact-name" name="name" required className="mt-2 w-full rounded-xl border-2 border-hare px-3 py-2.5 text-ink outline-none focus:border-duo-blue" />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-extrabold text-ink">Email address</label>
          <input id="contact-email" name="email" type="email" required className="mt-2 w-full rounded-xl border-2 border-hare px-3 py-2.5 text-ink outline-none focus:border-duo-blue" />
        </div>
      </div>
      <label htmlFor="contact-subject" className="mt-5 block text-sm font-extrabold text-ink">Subject</label>
      <input id="contact-subject" name="subject" required className="mt-2 w-full rounded-xl border-2 border-hare px-3 py-2.5 text-ink outline-none focus:border-duo-blue" />
      <label htmlFor="contact-message" className="mt-5 block text-sm font-extrabold text-ink">Message</label>
      <textarea id="contact-message" name="message" required rows={6} className="mt-2 w-full resize-y rounded-xl border-2 border-hare px-3 py-2.5 text-ink outline-none focus:border-duo-blue" />
      {status === "success" && <p className="mt-4 flex items-center gap-2 rounded-xl bg-duo-green-light p-3 font-bold text-duo-green-dark" role="status"><CheckCircle2 className="h-5 w-5" /> Message sent. Thank you for reaching out.</p>}
      {status === "error" && <p className="mt-4 rounded-xl bg-duo-red/10 p-3 font-bold text-duo-red-dark" role="alert">We couldn&apos;t send your message. Please try again.</p>}
      <button type="submit" disabled={status === "submitting"} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-duo-blue px-5 py-3 font-extrabold text-white shadow-[0_4px_0_0_#1899D6] transition-transform hover:-translate-y-0.5 disabled:opacity-60">
        <Send className="h-4 w-4" strokeWidth={2.5} />
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
      <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-ink-light"><Mail className="h-3.5 w-3.5" /> Your message is delivered securely through FormSubmit.</p>
    </form>
  );
}