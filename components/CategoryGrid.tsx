import Link from "next/link";
import { getCategories, getItemsByCategory, CATEGORY_LABELS, CATEGORY_EMOJI } from "@/lib/data";

const RING_COLORS = [
  "hover:border-duo-green hover:shadow-[0_4px_0_0_#58CC02]",
  "hover:border-duo-blue hover:shadow-[0_4px_0_0_#1CB0F6]",
  "hover:border-duo-yellow-dark hover:shadow-[0_4px_0_0_#FFC800]",
  "hover:border-duo-red hover:shadow-[0_4px_0_0_#FF4B4B]",
  "hover:border-duo-purple hover:shadow-[0_4px_0_0_#CE82FF]",
  "hover:border-duo-orange hover:shadow-[0_4px_0_0_#FF9600]",
];

export default function CategoryGrid() {
  const categories = getCategories();

  return (
    <section id="categories" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
          Browse by category
        </h2>
        <p className="mt-2 font-semibold text-ink-light">
          From leafy greens to lean proteins — pick a path and start learning.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((cat, idx) => {
          const count = getItemsByCategory(cat).length;
          return (
            <Link
              key={cat}
              href={`/foods/${cat}`}
              className={`group flex flex-col items-center gap-2 rounded-2xl border-2 border-hare bg-white p-5 text-center transition-all hover:-translate-y-1 ${RING_COLORS[idx % RING_COLORS.length]}`}
            >
              <span className="text-4xl">{CATEGORY_EMOJI[cat]}</span>
              <span className="font-extrabold text-ink">{CATEGORY_LABELS[cat]}</span>
              <span className="rounded-full bg-swan px-2.5 py-0.5 text-xs font-bold text-ink-light">
                {count} foods
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
