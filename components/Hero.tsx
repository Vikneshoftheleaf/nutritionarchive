import SearchBar from "./SearchBar";
import { getAllItems, getTotalCount, getCategories } from "@/lib/data";
import { Sparkles } from "lucide-react";

const FLOATERS = [
  { emoji: "🍎", className: "left-[4%] top-[18%]", rot: "-8deg", delay: "0s" },
  { emoji: "🥑", className: "right-[6%] top-[10%]", rot: "10deg", delay: "0.4s" },
  { emoji: "🥦", className: "left-[10%] bottom-[12%]", rot: "6deg", delay: "0.8s" },
  { emoji: "🍌", className: "right-[10%] bottom-[16%]", rot: "-10deg", delay: "1.2s" },
  { emoji: "🥕", className: "left-[20%] top-[6%]", rot: "-4deg", delay: "1.6s" },
  { emoji: "🍇", className: "right-[22%] bottom-[6%]", rot: "8deg", delay: "0.2s" },
];

export default function Hero() {
  const items = getAllItems().map((i) => ({
    slug: i.slug,
    name: i.name,
    category: i.category,
  }));
  const total = getTotalCount();
  const categoryCount = getCategories().length;

  return (
    <section className="relative overflow-hidden border-b-2 border-hare bg-duo-blue-light">
      {/* floating decorative emoji */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
        {FLOATERS.map((f, idx) => (
          <span
            key={idx}
            className={`animate-float absolute text-4xl opacity-80 sm:text-5xl ${f.className}`}
            style={{ ["--rot" as string]: f.rot, animationDelay: f.delay }}
          >
            {f.emoji}
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border-2 border-duo-yellow-dark/30 bg-duo-yellow px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink shadow-[0_3px_0_0_#e0a800]">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={3} />
          {total}+ foods decoded
        </span>

        <h1 className="mx-auto max-w-2xl text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl md:text-6xl">
          Nutrition facts,
          <br />
          made <span className="text-duo-green">fun</span> &amp;{" "}
          <span className="text-duo-blue">simple</span>.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base font-semibold text-ink-light sm:text-lg">
          Calories, macros, vitamins, and real health benefits for {total}+ fruits,
          vegetables, grains &amp; more — no fluff, just facts.
        </p>

        <div className="mt-8">
          <SearchBar items={items} />
        </div>

        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-light/70">
          Try: banana &middot; spinach &middot; salmon &middot; quinoa
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <Stat value={`${total}+`} label="Foods" />
          <Divider />
          <Stat value={`${categoryCount}`} label="Categories" />
          <Divider />
          <Stat value="100%" label="Free" />
          <Divider />
          <Stat value="0" label="Ads on facts" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-extrabold text-ink sm:text-3xl">{value}</p>
      <p className="text-xs font-bold uppercase tracking-wide text-ink-light">{label}</p>
    </div>
  );
}

function Divider() {
  return <span className="hidden h-8 w-px bg-hare sm:block" aria-hidden="true" />;
}
