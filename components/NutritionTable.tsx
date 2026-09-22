import type { Per100g, Serving } from "@/lib/types";

function round(n: number) {
  return Math.round(n * 10) / 10;
}

export default function NutritionTable({
  per100g,
  serving,
}: {
  per100g: Per100g;
  serving: Serving;
}) {
  const factor = serving.grams / 100;

  const rows: { label: string; per100: number; unit: string; bold?: boolean }[] = [
    { label: "Calories", per100: per100g.calories_kcal, unit: "kcal", bold: true },
    { label: "Protein", per100: per100g.protein_g, unit: "g" },
    { label: "Total Carbohydrates", per100: per100g.carbs_g, unit: "g" },
    { label: "Dietary Fiber", per100: per100g.fiber_g, unit: "g" },
    { label: "Sugars", per100: per100g.sugars_g, unit: "g" },
    { label: "Total Fat", per100: per100g.fat_g, unit: "g" },
    { label: "Saturated Fat", per100: per100g.saturated_fat_g, unit: "g" },
    { label: "Sodium", per100: per100g.sodium_mg, unit: "mg" },
    { label: "Water", per100: per100g.water_g, unit: "g" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-ink">
      <div className="bg-ink px-4 py-3">
        <p className="text-lg font-extrabold text-white">Nutrition Facts</p>
        <p className="text-xs font-semibold text-white/70">
          Per 100g &middot; Per serving ({serving.description}, {serving.grams}g)
        </p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-ink bg-swan">
            <th className="px-4 py-2 text-left font-extrabold text-ink-light">
              Nutrient
            </th>
            <th className="px-4 py-2 text-right font-extrabold text-ink-light">
              Per 100g
            </th>
            <th className="px-4 py-2 text-right font-extrabold text-ink-light">
              Per serving
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.label}
              className={`border-b border-hare last:border-0 ${
                idx % 2 === 1 ? "bg-swan/50" : ""
              }`}
            >
              <td
                className={`px-4 py-2.5 ${
                  row.bold ? "font-extrabold text-ink" : "font-semibold text-ink"
                }`}
              >
                {row.label}
              </td>
              <td
                className={`px-4 py-2.5 text-right ${
                  row.bold ? "font-extrabold text-ink" : "font-medium text-ink-light"
                }`}
              >
                {row.per100}
                {row.unit}
              </td>
              <td
                className={`px-4 py-2.5 text-right ${
                  row.bold ? "font-extrabold text-duo-green" : "font-bold text-duo-green"
                }`}
              >
                {round(row.per100 * factor)}
                {row.unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
