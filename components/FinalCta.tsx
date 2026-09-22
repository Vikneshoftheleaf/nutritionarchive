import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTotalCount } from "@/lib/data";

export default function FinalCta() {
  const total = getTotalCount();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-duo-green px-6 py-14 text-center shadow-[0_8px_0_0_#3D8B01] sm:px-12">
        <div
          className="pointer-events-none absolute -left-6 -top-6 text-7xl opacity-20 sm:text-8xl"
          aria-hidden="true"
        >
          🥑
        </div>
        <div
          className="pointer-events-none absolute -bottom-8 -right-4 text-7xl opacity-20 sm:text-8xl"
          aria-hidden="true"
        >
          🍊
        </div>

        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          {total}+ foods are waiting to be explored
        </h2>
        <p className="mx-auto mt-3 max-w-lg font-semibold text-white/90">
          No sign-up. No paywall. Just fast, accurate nutrition facts whenever you
          need them.
        </p>
        <Link
          href="/foods"
          className="btn-duo mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-extrabold text-duo-green shadow-[0_4px_0_0_#dcdcdc] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
        >
          Browse all foods
          <ArrowRight className="h-5 w-5" strokeWidth={3} />
        </Link>
      </div>
    </section>
  );
}
