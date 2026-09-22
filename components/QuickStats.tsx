import { Flame, Beef, Wheat, Droplets } from "lucide-react";
import type { Per100g } from "@/lib/types";

export default function QuickStats({ per100g }: { per100g: Per100g }) {
  const stats = [
    {
      icon: Flame,
      label: "Calories",
      value: `${per100g.calories_kcal}`,
      unit: "kcal",
      bg: "bg-duo-orange",
      shadow: "shadow-[0_4px_0_0_#E08600]",
    },
    {
      icon: Beef,
      label: "Protein",
      value: `${per100g.protein_g}`,
      unit: "g",
      bg: "bg-duo-red",
      shadow: "shadow-[0_4px_0_0_#EA2B2B]",
    },
    {
      icon: Wheat,
      label: "Carbs",
      value: `${per100g.carbs_g}`,
      unit: "g",
      bg: "bg-duo-yellow",
      shadow: "shadow-[0_4px_0_0_#E0A800]",
    },
    {
      icon: Droplets,
      label: "Fat",
      value: `${per100g.fat_g}`,
      unit: "g",
      bg: "bg-duo-blue",
      shadow: "shadow-[0_4px_0_0_#1899D6]",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`flex flex-col items-center gap-1.5 rounded-2xl p-4 text-center text-white ${s.bg} ${s.shadow}`}
        >
          <s.icon className="h-6 w-6" strokeWidth={2.5} />
          <p className="text-xl font-extrabold leading-none">
            {s.value}
            <span className="text-sm font-bold">{s.unit}</span>
          </p>
          <p className="text-xs font-bold uppercase tracking-wide text-white/85">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
