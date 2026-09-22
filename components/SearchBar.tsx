"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import { CATEGORY_EMOJI } from "@/lib/data";
import type { Category } from "@/lib/types";

type LiteItem = { slug: string; name: string; category: Category };

export default function SearchBar({
  items,
  compact = false,
}: {
  items: LiteItem[];
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["name"],
        threshold: 0.35,
        distance: 60,
      }),
    [items]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8).map((r) => r.item);
  }, [query, fuse]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function goTo(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/nutrition-facts/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = results[activeIndex];
      if (pick) goTo(pick.slug);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-xl">
      <div
        className={`flex items-center gap-2 rounded-2xl border-2 border-hare bg-swan px-4 transition-colors focus-within:border-duo-blue focus-within:bg-white ${
          compact ? "py-2" : "py-3.5"
        }`}
      >
        <Search className="h-5 w-5 shrink-0 text-wolf" strokeWidth={2.5} />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search nutrition facts… e.g. banana"
          className={`w-full min-w-0 bg-transparent font-bold text-ink placeholder:text-wolf placeholder:font-semibold focus:outline-none ${
            compact ? "text-sm" : "text-base sm:text-lg"
          }`}
          aria-label="Search nutrition facts"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            aria-label="Clear search"
            className="shrink-0 rounded-full p-1 text-wolf hover:bg-hare hover:text-ink"
          >
            <X className="h-4 w-4" strokeWidth={3} />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-auto rounded-2xl border-2 border-hare bg-white p-2 shadow-xl">
          {results.map((r, idx) => (
            <li key={r.slug}>
              <button
                onClick={() => goTo(r.slug)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-bold text-ink transition-colors ${
                  idx === activeIndex ? "bg-duo-green-light" : "hover:bg-swan"
                }`}
              >
                <span className="text-xl">{CATEGORY_EMOJI[r.category]}</span>
                <span className="flex-1 truncate">{r.name}</span>
                <span className="text-xs font-bold uppercase tracking-wide text-duo-blue">
                  Nutrition Facts
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border-2 border-hare bg-white p-4 text-center font-semibold text-ink-light shadow-xl">
          No matches for &ldquo;{query}&rdquo; yet. Try another food!
        </div>
      )}
    </div>
  );
}
