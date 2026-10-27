"use client";

import { useId, useState } from "react";
import type { Per100g, Serving } from "@/lib/types";

const DISPLAY_NUTRIENTS: {
  label: string;
  key: keyof Per100g;
  unit: string;
}[] = [
  { label: "Calories", key: "calories_kcal", unit: "kcal" },
  { label: "Protein", key: "protein_g", unit: "g" },
  { label: "Carbohydrates", key: "carbs_g", unit: "g" },
  { label: "Fiber", key: "fiber_g", unit: "g" },
  { label: "Sugars", key: "sugars_g", unit: "g" },
  { label: "Fat", key: "fat_g", unit: "g" },
  { label: "Sodium", key: "sodium_mg", unit: "mg" },
];

export default function ServingSizeCalculator({
  foodName,
  per100g,
  serving,
}: {
  foodName: string;
  per100g: Per100g;
  serving: Serving;
}) {
  const inputId = useId();
  const [grams, setGrams] = useState(String(serving.grams));
  const quantity = Number(grams);
  const isValidQuantity =
    grams.trim() !== "" &&
    Number.isFinite(quantity) &&
    quantity > 0 &&
    quantity <= 5000;

  return (
    <div className="rounded-2xl border-2 border-hare bg-white p-5">
      <p className="font-semibold leading-relaxed text-ink-light">
        Estimate nutrients in a portion of {foodName}. The calculation scales
        the values shown per 100 g; it is not a measurement of a specific food
        or product.
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <div>
          <label
            htmlFor={inputId}
            className="mb-1 block text-sm font-extrabold text-ink"
          >
            Portion weight in grams
          </label>
          <input
            id={inputId}
            type="number"
            min="1"
            max="5000"
            step="any"
            inputMode="decimal"
            value={grams}
            onChange={(event) => setGrams(event.target.value)}
            className="w-44 rounded-xl border-2 border-hare px-3 py-2 font-bold text-ink focus:border-duo-green focus:outline-none"
            aria-describedby={`${inputId}-hint`}
          />
        </div>
        <p id={`${inputId}-hint`} className="pb-2 text-sm text-ink-light">
          Listed serving: {serving.description} ({serving.grams} g). Enter 1–5000 g.
        </p>
      </div>
      {isValidQuantity ? (
        <dl
          className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"
          aria-live="polite"
          aria-label={`Estimated nutrition in ${quantity} grams of ${foodName}`}
        >
          {DISPLAY_NUTRIENTS.map(({ label, key, unit }) => (
            <div key={key} className="rounded-xl bg-swan p-3">
              <dt className="text-xs font-bold uppercase tracking-wide text-ink-light">
                {label}
              </dt>
              <dd className="mt-1 text-lg font-extrabold text-ink">
                {((per100g[key] * quantity) / 100).toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}{" "}
                <span className="text-sm font-bold">{unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-4 text-sm font-bold text-red-700" role="alert">
          Enter a portion weight greater than 0 and no more than 5000 grams.
        </p>
      )}
      <p className="mt-4 text-xs leading-relaxed text-ink-light">
        Estimate only. Food varieties, brands, preparation, and actual portion
        weights can change the values. Use product packaging for packaged foods.
      </p>
    </div>
  );
}
