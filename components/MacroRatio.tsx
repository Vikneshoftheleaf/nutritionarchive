import type { Per100g } from "@/lib/types";

export default function MacroRatio({ per100g }: { per100g: Per100g }) {
  const proteinCal = per100g.protein_g * 4;
  const carbsCal = per100g.carbs_g * 4;
  const fatCal = per100g.fat_g * 9;
  const total = proteinCal + carbsCal + fatCal || 1;

  const proteinPct = Math.round((proteinCal / total) * 100);
  const carbsPct = Math.round((carbsCal / total) * 100);
  const fatPct = Math.max(0, 100 - proteinPct - carbsPct);

  const segments = [
    { label: "Protein", pct: proteinPct, color: "#FF4B4B" },
    { label: "Carbs", pct: carbsPct, color: "#FFC800" },
    { label: "Fat", pct: fatPct, color: "#1CB0F6" },
  ];

  return (
    <div>
      <p className="mb-2 font-bold text-ink">Where the calories come from</p>
      <div className="flex h-6 w-full overflow-hidden rounded-full border-2 border-hare">
        {segments.map((s) => (
          <div
            key={s.label}
            style={{ width: `${s.pct}%`, backgroundColor: s.color }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-4">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 text-sm font-bold">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-ink">{s.label}</span>
            <span className="text-ink-light">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
