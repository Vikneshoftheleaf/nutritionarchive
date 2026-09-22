import { HeartPulse, AlertTriangle, Lightbulb, Package } from "lucide-react";
import type { HealthBenefit } from "@/lib/types";
import type { NutritionItem } from "@/lib/types";
import ContextualLinks from "./ContextualLinks";

export function BenefitsList({ benefits, relatedItems = [] }: { benefits: HealthBenefit[]; relatedItems?: NutritionItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {benefits.map((b) => (
        <div
          key={b.title}
          className="flex gap-3 rounded-2xl border-2 border-hare bg-duo-green-light/40 p-4"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-duo-green text-white shadow-[0_3px_0_0_#46A302]">
            <HeartPulse className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <div>
            <p className="font-extrabold text-ink">{b.title}</p>
            <p className="mt-0.5 text-sm font-medium text-ink-light">
              <ContextualLinks text={b.explanation} items={relatedItems} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CautionList({ points }: { points: string[] }) {
  return (
    <ul className="space-y-3">
      {points.map((p, idx) => (
        <li
          key={idx}
          className="flex gap-3 rounded-2xl border-2 border-duo-yellow/60 bg-duo-yellow/10 p-4"
        >
          <AlertTriangle
            className="h-5 w-5 shrink-0 text-duo-yellow-dark"
            strokeWidth={2.5}
          />
          <span className="text-sm font-semibold text-ink">{p}</span>
        </li>
      ))}
    </ul>
  );
}

export function ServingIdeas({ ideas, relatedItems = [] }: { ideas: string[]; relatedItems?: NutritionItem[] }) {
  return (
    <ul className="space-y-3">
      {ideas.map((idea, idx) => (
        <li
          key={idx}
          className="flex gap-3 rounded-2xl border-2 border-hare bg-white p-4"
        >
          <Lightbulb className="h-5 w-5 shrink-0 text-duo-blue" strokeWidth={2.5} />
          <span className="text-sm font-semibold text-ink"><ContextualLinks text={idea} items={relatedItems} /></span>
        </li>
      ))}
    </ul>
  );
}

export function StorageTip({ tip, relatedItems = [] }: { tip: string; relatedItems?: NutritionItem[] }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border-2 border-duo-blue/40 bg-duo-blue-light p-4">
      <Package className="h-5 w-5 shrink-0 text-duo-blue-dark" strokeWidth={2.5} />
      <p className="text-sm font-semibold text-ink">
        <span className="font-extrabold">Storage tip: </span>
        <ContextualLinks text={tip} items={relatedItems} />
      </p>
    </div>
  );
}
