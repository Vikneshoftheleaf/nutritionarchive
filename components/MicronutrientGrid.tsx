import type { Micronutrient } from "@/lib/types";

export default function MicronutrientGrid({ items }: { items: Micronutrient[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((m) => {
        const pct = Math.min(100, m.daily_value_percent);
        return (
          <div key={m.name} className="rounded-2xl border-2 border-hare bg-white p-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-extrabold text-ink">{m.name}</span>
              <span className="text-sm font-bold text-ink-light">
                {m.amount_per_100g}
              </span>
            </div>
            <div className="progress-track h-2.5 w-full">
              <div
                className="progress-fill h-full bg-duo-purple"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-1 text-xs font-bold text-duo-purple-dark">
              {m.daily_value_percent}% Daily Value
            </p>
          </div>
        );
      })}
    </div>
  );
}
