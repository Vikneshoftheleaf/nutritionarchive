"use client";

import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X, ArrowRight } from "lucide-react";
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
  // Whether the mobile full-screen overlay is active
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayInputRef = useRef<HTMLInputElement>(null);

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

  // Close dropdown on outside click (desktop)
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Lock body scroll when mobile overlay is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      // Autofocus overlay input
      setTimeout(() => overlayInputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile overlay on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function goTo(slug: string) {
    setOpen(false);
    setMobileOpen(false);
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

  function onMobileKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;
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
      setMobileOpen(false);
    }
  }

  const clearQuery = useCallback(() => {
    setQuery("");
    setOpen(false);
  }, []);

  return (
    <>
      {/* ── Desktop / non-compact trigger ─────────────────────────────── */}
      <div ref={containerRef} className="relative mx-auto w-full max-w-xl">
        {/* Search input box */}
        <div
          className={`flex items-center gap-2 rounded-2xl border-2 border-hare bg-swan px-4 transition-colors focus-within:border-duo-blue focus-within:bg-white ${
            compact ? "py-2" : "py-3.5"
          }`}
        >
          <Search className="h-5 w-5 shrink-0 text-wolf" strokeWidth={2.5} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            // On mobile (pointer: coarse) open the overlay instead of typing inline
            onFocus={(e) => {
              // detect touch device via media query
              const isTouch = window.matchMedia("(pointer: coarse)").matches;
              if (compact && isTouch) {
                e.currentTarget.blur();
                setMobileOpen(true);
                return;
              }
              setOpen(true);
            }}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={compact ? "Search foods…" : "Search nutrition facts… e.g. banana"}
            className={`w-full min-w-0 bg-transparent font-bold text-ink placeholder:text-wolf placeholder:font-semibold focus:outline-none ${
              compact ? "text-sm" : "text-base sm:text-lg"
            }`}
            aria-label="Search nutrition facts"
            autoComplete="off"
          />
          {query && (
            <button
              onClick={clearQuery}
              aria-label="Clear search"
              className="shrink-0 rounded-full p-1 text-wolf hover:bg-hare hover:text-ink"
            >
              <X className="h-4 w-4" strokeWidth={3} />
            </button>
          )}
        </div>

        {/* Desktop dropdown results */}
        {open && results.length > 0 && (
          <ul className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-auto rounded-2xl border-2 border-hare bg-white p-2 shadow-xl animate-pop">
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
                  <span className="hidden text-xs font-bold uppercase tracking-wide text-duo-blue sm:block">
                    Nutrition Facts
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-wolf sm:hidden" strokeWidth={2.5} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {open && query.trim() && results.length === 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border-2 border-hare bg-white p-4 text-center font-semibold text-ink-light shadow-xl animate-pop">
            No matches for &ldquo;{query}&rdquo; yet. Try another food!
          </div>
        )}
      </div>

      {/* ── Mobile full-screen overlay ─────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{ background: "rgba(0,0,0,0.45)" }}
        >
          {/* Overlay panel */}
          <div className="flex flex-col bg-white w-full" style={{ maxHeight: "85dvh" }}>
            {/* Top bar */}
            <div className="flex items-center gap-3 border-b-2 border-hare px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-duo-blue" strokeWidth={2.5} />
              <input
                ref={overlayInputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onMobileKeyDown}
                placeholder="Search foods… e.g. banana"
                className="flex-1 min-w-0 bg-transparent text-base font-bold text-ink placeholder:text-wolf placeholder:font-semibold focus:outline-none"
                aria-label="Search nutrition facts"
                autoComplete="off"
                autoFocus
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="shrink-0 rounded-full p-1.5 text-wolf hover:bg-hare"
                >
                  <X className="h-4 w-4" strokeWidth={3} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setQuery("");
                  }}
                  aria-label="Close search"
                  className="shrink-0 rounded-full px-3 py-1.5 text-sm font-bold text-ink-light hover:bg-swan"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Results */}
            <div className="overflow-y-auto flex-1">
              {results.length > 0 ? (
                <ul className="p-3 space-y-1">
                  {results.map((r, idx) => (
                    <li key={r.slug}>
                      <button
                        onClick={() => goTo(r.slug)}
                        onTouchStart={() => setActiveIndex(idx)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left font-bold text-ink transition-colors ${
                          idx === activeIndex ? "bg-duo-green-light" : "bg-swan"
                        }`}
                      >
                        <span className="text-2xl leading-none">{CATEGORY_EMOJI[r.category]}</span>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-base font-extrabold text-ink">{r.name}</p>
                          <p className="text-xs font-bold uppercase tracking-wide text-duo-blue mt-0.5">
                            Nutrition Facts
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 shrink-0 text-wolf" strokeWidth={2} />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : query.trim() ? (
                <div className="p-8 text-center">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="font-bold text-ink">No results for &ldquo;{query}&rdquo;</p>
                  <p className="text-sm text-ink-light mt-1">Try another food name!</p>
                </div>
              ) : (
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-light mb-3">
                    Try searching for
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Banana", "Spinach", "Salmon", "Quinoa", "Avocado", "Egg"].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setQuery(s);
                          setActiveIndex(0);
                          overlayInputRef.current?.focus();
                        }}
                        className="rounded-full border-2 border-hare bg-swan px-4 py-2 text-sm font-bold text-ink hover:border-duo-blue hover:bg-duo-blue-light transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Backdrop tap area to close */}
          <div
            className="flex-1"
            onClick={() => {
              setMobileOpen(false);
              setQuery("");
            }}
          />
        </div>
      )}
    </>
  );
}
