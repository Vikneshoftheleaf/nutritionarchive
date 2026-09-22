import Link from "next/link";
import { Flame, Beef } from "lucide-react";
import { CATEGORY_EMOJI } from "@/lib/data";
import type { NutritionItem } from "@/lib/types";

const CARD_ACCENTS: Record<string, string> = {
  fruit: "bg-duo-red/10 group-hover:bg-duo-red/15",
  vegetable: "bg-duo-green/10 group-hover:bg-duo-green/15",
  grain: "bg-duo-orange/10 group-hover:bg-duo-orange/15",
  meat: "bg-duo-red/10 group-hover:bg-duo-red/15",
  seafood: "bg-duo-blue/10 group-hover:bg-duo-blue/15",
  dairy: "bg-duo-blue/10 group-hover:bg-duo-blue/15",
  legume: "bg-duo-orange/10 group-hover:bg-duo-orange/15",
  beverage: "bg-duo-purple/10 group-hover:bg-duo-purple/15",
  herb_or_spice: "bg-duo-green/10 group-hover:bg-duo-green/15",
  nut_or_seed: "bg-duo-orange/10 group-hover:bg-duo-orange/15",
  oil_or_fat: "bg-duo-yellow/10 group-hover:bg-duo-yellow/15",
};

export default function FoodCard({ item }: { item: NutritionItem }) {
  const accent = CARD_ACCENTS[item.category] ?? "bg-swan";

  return (
    <Link
      href={`/nutrition-facts/${item.slug}`}
      className="group relative flex flex-col rounded-2xl border-2 border-hare bg-white p-4 transition-all hover:-translate-y-1 hover:border-duo-green hover:shadow-[0_4px_0_0_#58CC02]"
    >
      <div
        className={`mb-3 grid h-14 w-14 place-items-center rounded-2xl text-3xl transition-colors ${accent}`}
      >
        {CATEGORY_EMOJI[item.category]}
      </div>
      <h3 className="mb-1 font-extrabold text-ink leading-tight">{item.name}</h3>
      <p className="mb-3 line-clamp-2 text-xs font-medium text-ink-light">
        {item.intro}
      </p>
      <div className="mt-auto flex items-center gap-3 text-xs font-bold">
        <span className="flex items-center gap-1 text-duo-orange">
          <Flame className="h-3.5 w-3.5" strokeWidth={3} />
          {item.per_100g.calories_kcal} kcal
        </span>
        <span className="flex items-center gap-1 text-duo-blue">
          <Beef className="h-3.5 w-3.5" strokeWidth={3} />
          {item.per_100g.protein_g}g protein
        </span>
      </div>
    </Link>
  );
}
