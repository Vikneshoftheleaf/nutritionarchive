import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";
import type { NutritionItem } from "@/lib/types";
import ContextualLinks from "./ContextualLinks";

export default function FaqAccordion({ faqs, relatedItems = [] }: { faqs: Faq[]; relatedItems?: NutritionItem[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <details
          key={idx}
          className="group rounded-2xl border-2 border-hare bg-white open:border-duo-blue"
          {...(idx === 0 ? { open: true } : {})}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 font-extrabold text-ink">
            {faq.question}
            <ChevronDown
              className="chev h-5 w-5 shrink-0 text-duo-blue transition-transform"
              strokeWidth={3}
            />
          </summary>
          <div className="px-4 pb-4 font-medium leading-relaxed text-ink-light">
            <ContextualLinks text={faq.answer} items={relatedItems} />
          </div>
        </details>
      ))}
    </div>
  );
}
