import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedItems } from "@/lib/data";
import FoodCard from "./FoodCard";

export default function PopularFoods() {
  const featured = getFeaturedItems(8);

  return (
    <section id="popular" className="scroll-mt-20 bg-swan py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              Popular right now
            </h2>
            <p className="mt-2 font-semibold text-ink-light">
              Handpicked foods people search for every day.
            </p>
          </div>
          <Link
            href="/foods"
            className="flex items-center gap-1.5 font-extrabold text-duo-green hover:text-duo-green-dark"
          >
            See all foods
            <ArrowRight className="h-4 w-4" strokeWidth={3} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((item) => (
            <FoodCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
