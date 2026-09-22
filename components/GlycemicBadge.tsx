import type { GlycemicIndexCategory } from "@/lib/types";

const STYLES: Record<GlycemicIndexCategory, { label: string; className: string }> = {
  low: { label: "Low GI", className: "bg-duo-green text-white shadow-[0_3px_0_0_#46A302]" },
  medium: {
    label: "Medium GI",
    className: "bg-duo-yellow text-ink shadow-[0_3px_0_0_#E0A800]",
  },
  high: { label: "High GI", className: "bg-duo-red text-white shadow-[0_3px_0_0_#EA2B2B]" },
  not_applicable: {
    label: "GI: N/A",
    className: "bg-hare text-ink-light shadow-[0_3px_0_0_#cfcfcf]",
  },
};

export default function GlycemicBadge({
  category,
}: {
  category: GlycemicIndexCategory;
}) {
  const style = STYLES[category];
  return (
    <span
      className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide ${style.className}`}
    >
      {style.label}
    </span>
  );
}
