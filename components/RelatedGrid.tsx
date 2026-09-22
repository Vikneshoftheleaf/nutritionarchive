import FoodCard from "./FoodCard";
import type { NutritionItem } from "@/lib/types";

export default function RelatedGrid({
  items,
  title = "You might also like",
}: {
  items: NutritionItem[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-extrabold text-ink">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <FoodCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
