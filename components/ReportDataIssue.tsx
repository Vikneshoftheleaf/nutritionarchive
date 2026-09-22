"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { FORMSUBMIT_EMAIL } from "@/lib/site";

export default function ReportDataIssue({ foodName }: { foodName: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("_subject", `Nutrition correction: ${foodName}`);
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
    <section className="mt-16 overflow-hidden rounded-3xl border-2 border-duo-blue/30 bg-duo-blue-light/60">
      <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] md:items-start">
        <div>
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-duo-blue shadow-sm">
              <AlertCircle className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-duo-blue-dark">
                Help us keep this accurate
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-ink">
                Spotted something off?
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-xl font-medium leading-relaxed text-ink-light">
            Tell us what needs correcting on the {foodName} page. We review every
            report and update the directory when the data can be verified.
          </p>
          {status === "success" && (
            <div className="mt-5 flex items-start gap-2 rounded-2xl border-2 border-duo-green/30 bg-white p-3 font-bold text-duo-green-dark" role="status">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.5} />
              <span>Thanks. Your correction request has been sent for review.</span>
            </div>
          )}
          {status === "error" && (
            <p className="mt-5 rounded-2xl border-2 border-duo-red/30 bg-white p-3 font-bold text-duo-red-dark" role="alert">
              We couldn&apos;t send that report. Please try again in a moment.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border-2 border-white bg-white p-4 shadow-sm sm:p-5">
          <input type="hidden" name="food" value={foodName} />
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
          <label className="block text-sm font-extrabold text-ink" htmlFor="issue">
            What should we fix?
          </label>
          <textarea
            id="issue"
            name="correction"
            required
            rows={4}
            placeholder="For example: the protein value should be 3.1g per 100g."
            className="mt-2 w-full resize-y rounded-xl border-2 border-hare px-3 py-2.5 text-sm font-medium text-ink outline-none transition-colors placeholder:text-wolf focus:border-duo-blue"
          />
          <label className="mt-4 block text-sm font-extrabold text-ink" htmlFor="email">
            Your email <span className="font-semibold text-ink-light">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border-2 border-hare px-3 py-2.5 text-sm font-medium text-ink outline-none transition-colors placeholder:text-wolf focus:border-duo-blue"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-duo-blue px-4 py-3 font-extrabold text-white shadow-[0_4px_0_0_#1899D6] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
          >
            <Send className="h-4 w-4" strokeWidth={2.5} />
            {status === "submitting" ? "Sending..." : "Send correction"}
          </button>
          <p className="mt-3 text-center text-xs font-semibold text-ink-light">
            No account needed. Your message goes securely to our review inbox.
          </p>
        </form>
      </div>
    </section>
  );
}