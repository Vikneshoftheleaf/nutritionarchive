"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import FoodCard from "@/components/FoodCard";
import type { FoodCardItem, NutritionItem } from "@/lib/types";

const PAGE_SIZE = 60;

function GridContent({
  items,
  basePath,
  emptyMessage = "No foods found.",
}: {
  items: (FoodCardItem | NutritionItem)[];
  basePath: string;
  emptyMessage?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get("page");
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const activePage = Math.min(currentPage, totalPages);
  const start = (activePage - 1) * PAGE_SIZE;
  const pageItems = items.slice(start, start + PAGE_SIZE);

  function pageHref(p: number) {
    if (p <= 1) return basePath;
    return `${basePath}?page=${p}`;
  }

  function handlePageClick(e: React.MouseEvent, p: number) {
    e.preventDefault();
    if (p === activePage) return;
    router.push(pageHref(p), { scroll: true });
  }

  return (
    <div>
      {pageItems.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {pageItems.map((item) => (
            <FoodCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border-2 border-dashed border-hare p-10 text-center font-bold text-ink-light">
          {emptyMessage}
        </div>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          <Link
            href={pageHref(Math.max(1, activePage - 1))}
            onClick={(e) => handlePageClick(e, Math.max(1, activePage - 1))}
            rel={activePage > 1 ? "prev" : undefined}
            aria-disabled={activePage === 1}
            className={`rounded-xl border-2 border-hare px-3 py-2 text-sm font-extrabold ${
              activePage === 1
                ? "pointer-events-none opacity-40"
                : "text-ink hover:border-duo-green"
            }`}
          >
            Prev
          </Link>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (p) =>
                p === 1 ||
                p === totalPages ||
                Math.abs(p - activePage) <= 1
            )
            .map((p, idx, arr) => (
              <span key={p} className="flex items-center gap-2">
                {idx > 0 && arr[idx - 1] !== p - 1 && (
                  <span className="font-bold text-wolf">…</span>
                )}
                <Link
                  href={pageHref(p)}
                  onClick={(e) => handlePageClick(e, p)}
                  className={`rounded-xl border-2 px-3.5 py-2 text-sm font-extrabold ${
                    p === activePage
                      ? "border-duo-green bg-duo-green text-white"
                      : "border-hare text-ink hover:border-duo-green"
                  }`}
                >
                  {p}
                </Link>
              </span>
            ))}
          <Link
            href={pageHref(Math.min(totalPages, activePage + 1))}
            onClick={(e) => handlePageClick(e, Math.min(totalPages, activePage + 1))}
            rel={activePage < totalPages ? "next" : undefined}
            aria-disabled={activePage === totalPages}
            className={`rounded-xl border-2 border-hare px-3 py-2 text-sm font-extrabold ${
              activePage === totalPages
                ? "pointer-events-none opacity-40"
                : "text-ink hover:border-duo-green"
            }`}
          >
            Next
          </Link>
        </nav>
      )}
    </div>
  );
}

export default function PaginatedFoodGrid({
  items,
  basePath,
  emptyMessage,
}: {
  items: (FoodCardItem | NutritionItem)[];
  basePath: string;
  emptyMessage?: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.slice(0, PAGE_SIZE).map((item) => (
            <FoodCard key={item.slug} item={item} />
          ))}
        </div>
      }
    >
      <GridContent items={items} basePath={basePath} emptyMessage={emptyMessage} />
    </Suspense>
  );
}
