export default function MacroBar({
  label,
  grams,
  maxGrams,
  color,
  unit = "g",
}: {
  label: string;
  grams: number;
  maxGrams: number;
  color: string;
  unit?: string;
}) {
  const pct = maxGrams > 0 ? Math.min(100, (grams / maxGrams) * 100) : 0;

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-bold text-ink">{label}</span>
        <span className="font-extrabold text-ink">
          {grams}
          {unit}
        </span>
      </div>
      <div className="progress-track h-3 w-full">
        <div
          className="progress-fill h-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
