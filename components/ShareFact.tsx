"use client";

import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { SITE_NAME } from "@/lib/site";

export default function ShareFact({
  foodName,
  url,
  eyebrow = "Pass it along",
  heading = "Share these facts",
  description,
}: {
  foodName: string;
  url: string;
  eyebrow?: string;
  heading?: string;
  description?: string;
}) {
  const [copied, setCopied] = useState(false);
  const title = `${foodName} Nutrition Facts`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  async function sharePage() {
    if (navigator.share) {
      await navigator.share({ title, text: `Explore ${title} on ${SITE_NAME}.`, url });
      return;
    }
    await copyLink();
  }

  return (
    <section className="mt-8 rounded-2xl border-2 border-hare bg-swan p-4 sm:flex sm:items-center sm:justify-between sm:gap-5 sm:p-5">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wide text-duo-blue-dark">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-extrabold text-ink">{heading}</h2>
        <p className="mt-1 text-sm font-medium text-ink-light">
          {description ?? `Send ${foodName} nutrition information to someone who might find it useful.`}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:justify-end">
        <button
          type="button"
          onClick={sharePage}
          title="Share this page"
          className="inline-flex items-center gap-2 rounded-xl bg-duo-blue px-3.5 py-2.5 text-sm font-extrabold text-white shadow-[0_3px_0_0_#1899D6] transition-transform hover:-translate-y-0.5"
        >
          <Share2 className="h-4 w-4" strokeWidth={2.5} />
          Share
        </button>
        <button
          type="button"
          onClick={copyLink}
          title="Copy page link"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-hare bg-white px-3.5 py-2.5 text-sm font-extrabold text-ink hover:border-duo-blue"
        >
          {copied ? <Check className="h-4 w-4 text-duo-green-dark" strokeWidth={2.5} /> : <Link2 className="h-4 w-4" strokeWidth={2.5} />}
          {copied ? "Copied" : "Copy link"}
        </button>
        
      </div>
    </section>
  );
}