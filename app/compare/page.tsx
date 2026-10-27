import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FoodComparison from "@/components/FoodComparison";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Compare Foods",
  description:
    "Compare calories, protein, carbohydrates, fiber, fat, and other listed nutrition values for two foods using the same 100-gram basis.",
  path: "/compare",
  keywords: ["compare food nutrition", "food nutrition comparison", "compare calories and protein"],
});

export default function CompareFoodsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Compare foods" }]}
      />
      <header className="mt-8">
        <p className="text-xs font-extrabold uppercase tracking-wide text-duo-blue">
          Nutrition comparison tool
        </p>
        <h1 className="mt-2 text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
          Compare two foods
        </h1>
        <p className="mt-4 max-w-3xl text-lg font-medium leading-relaxed text-ink-light">
          Compare listed nutrition values on a consistent per-100-gram basis,
          then check whether the foods are prepared in comparable ways.
        </p>
      </header>
      <section className="mt-8" aria-label="Food comparison">
        <FoodComparison />
      </section>
      <section className="mt-8 rounded-2xl border-2 border-hare bg-swan p-5">
        <h2 className="text-xl font-extrabold text-ink">
          How to use this comparison
        </h2>
        <p className="mt-2 leading-relaxed text-ink-light">
          Per 100 g is a common reference basis, not necessarily a usual portion.
          Compare like with like: raw with raw, cooked with cooked, and drained
          with drained. A packaged or restaurant food can differ from these
          general food records. Visit an individual food page for serving-size
          estimates and source context.
        </p>
      </section>
    </main>
  );
}
