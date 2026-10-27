"use client";

import { useEffect, useId, useState } from "react";
import type { Per100g } from "@/lib/types";

interface ComparisonFood {
  slug: string;
  name: string;
  per_100g: Per100g;
}

const NUTRIENTS: {
  label: string;
  key: keyof Per100g;
  unit: string;
}[] = [
  { label: "Energy", key: "calories_kcal", unit: "kcal" },
  { label: "Protein", key: "protein_g", unit: "g" },
  { label: "Carbohydrates", key: "carbs_g", unit: "g" },
  { label: "Fiber", key: "fiber_g", unit: "g" },
  { label: "Sugars", key: "sugars_g", unit: "g" },
  { label: "Total fat", key: "fat_g", unit: "g" },
  { label: "Saturated fat", key: "saturated_fat_g", unit: "g" },
  { label: "Sodium", key: "sodium_mg", unit: "mg" },
  { label: "Water", key: "water_g", unit: "g" },
];

function hasNumericNutrients(value: unknown): value is Per100g {
  if (typeof value !== "object" || value === null) return false;

  return NUTRIENTS.every(({ key }) => {
    const nutrient = Reflect.get(value, key);
    return typeof nutrient === "number" && Number.isFinite(nutrient);
  });
}

function isComparisonFoodList(value: unknown): value is ComparisonFood[] {
  if (!Array.isArray(value)) return false;

  return value.every(
    (food) =>
      typeof food === "object" &&
      food !== null &&
      "slug" in food &&
      typeof food.slug === "string" &&
      "name" in food &&
      typeof food.name === "string" &&
      "per_100g" in food &&
      hasNumericNutrients(food.per_100g)
  );
}

function FoodPicker({
  label,
  foods,
  selectedSlug,
  onSelect,
}: {
  label: string;
  foods: ComparisonFood[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const selected = foods.find((food) => food.slug === selectedSlug);
  const matches =
    query.trim().length < 2
      ? []
      : foods
          .filter((food) =>
            food.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
          )
          .slice(0, 8);

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-extrabold text-ink"
      >
        {label}
      </label>
      {selected ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border-2 border-duo-green bg-duo-green-light p-3">
          <span className="font-extrabold text-ink">{selected.name}</span>
          <button
            type="button"
            onClick={() => {
              onSelect("");
              setQuery("");
            }}
            className="shrink-0 rounded-lg px-2 py-1 text-sm font-bold text-duo-green-dark hover:bg-white"
            aria-label={`Change ${label.toLowerCase()}`}
          >
            Change
          </button>
        </div>
      ) : (
        <>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type at least 2 letters"
            autoComplete="off"
            className="w-full rounded-xl border-2 border-hare px-3 py-3 font-semibold text-ink focus:border-duo-green focus:outline-none"
            aria-autocomplete="list"
          />
          {query.trim().length >= 2 && (
            <ul className="mt-2 max-h-56 overflow-y-auto rounded-xl border-2 border-hare bg-white">
              {matches.length > 0 ? (
                matches.map((food) => (
                  <li key={food.slug}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(food.slug);
                        setQuery("");
                      }}
                      className="w-full px-3 py-2 text-left font-semibold text-ink hover:bg-swan focus:bg-swan focus:outline-none"
                    >
                      {food.name}
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-sm text-ink-light">
                  No matching food found.
                </li>
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

function formatValue(value: number, unit: string) {
  return `${value.toLocaleString("en-US", { maximumFractionDigits: 2 })} ${unit}`;
}

export default function FoodComparison() {
  const [foods, setFoods] = useState<ComparisonFood[]>([]);
  const [firstSlug, setFirstSlug] = useState("");
  const [secondSlug, setSecondSlug] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const firstFood = foods.find((food) => food.slug === firstSlug);
  const secondFood = foods.find((food) => food.slug === secondSlug);

  useEffect(() => {
    const controller = new AbortController();

    async function loadFoods() {
      setStatus("loading");
      try {
        const response = await fetch("/food-comparison.json", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Food comparison data request failed (${response.status}).`);
        }

        const payload: unknown = await response.json();
        if (!isComparisonFoodList(payload)) {
          throw new Error("Food comparison data is not in the expected format.");
        }

        setFoods(payload);
        setStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Unable to load food comparison data.", error);
        setStatus("error");
      }
    }

    void loadFoods();
    return () => controller.abort();
  }, [loadAttempt]);

  return (
    <div className="rounded-3xl border-2 border-hare bg-white p-5 sm:p-7">
      <p className="max-w-3xl leading-relaxed text-ink-light">
        Choose two foods to compare the values in this directory on the same
        100-gram basis. Search is performed in the browser against the published
        food list.
      </p>

      {status === "loading" && (
        <p className="mt-5 font-semibold text-ink-light" role="status">
          Loading food comparison data…
        </p>
      )}
      {status === "error" && (
        <div className="mt-5 rounded-xl border-2 border-red-200 bg-red-50 p-4">
          <p className="font-bold text-red-800">
            Food comparison data could not be loaded.
          </p>
          <p className="mt-1 text-sm text-red-800">
            Check your connection and try again.
          </p>
          <button
            type="button"
            onClick={() => setLoadAttempt((attempt) => attempt + 1)}
            className="mt-3 rounded-lg bg-white px-3 py-2 text-sm font-extrabold text-red-800 ring-1 ring-red-300 hover:bg-red-100"
          >
            Retry
          </button>
        </div>
      )}

      {status === "ready" && (
        <>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <FoodPicker
              label="First food"
              foods={foods}
              selectedSlug={firstSlug}
              onSelect={setFirstSlug}
            />
            <FoodPicker
              label="Second food"
              foods={foods}
              selectedSlug={secondSlug}
              onSelect={setSecondSlug}
            />
          </div>

          {firstFood && secondFood && firstFood.slug === secondFood.slug && (
            <p className="mt-4 text-sm font-bold text-amber-800" role="alert">
              Choose two different foods to compare.
            </p>
          )}

          {firstFood && secondFood && firstFood.slug !== secondFood.slug && (
            <div className="mt-7 overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-left">
                <caption className="mb-3 text-left text-sm font-semibold text-ink-light">
                  Values per 100 g of each listed food
                </caption>
                <thead>
                  <tr className="border-b-2 border-hare">
                    <th scope="col" className="py-3 pr-3 text-sm font-extrabold text-ink">
                      Nutrient
                    </th>
                    <th scope="col" className="px-3 py-3 text-sm font-extrabold text-ink">
                      {firstFood.name}
                    </th>
                    <th scope="col" className="px-3 py-3 text-sm font-extrabold text-ink">
                      {secondFood.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {NUTRIENTS.map(({ label, key, unit }) => (
                    <tr key={key} className="border-b border-hare/70">
                      <th scope="row" className="py-3 pr-3 text-sm font-bold text-ink-light">
                        {label}
                      </th>
                      <td className="px-3 py-3 text-sm font-semibold text-ink">
                        {formatValue(firstFood.per_100g[key], unit)}
                      </td>
                      <td className="px-3 py-3 text-sm font-semibold text-ink">
                        {formatValue(secondFood.per_100g[key], unit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <p className="mt-5 text-xs leading-relaxed text-ink-light">
        A per-100-gram comparison is meaningful only when the foods are in
        comparable forms (for example, both raw or both cooked). These are
        reference values from our dataset, not product-specific measurements or
        medical advice.
      </p>
    </div>
  );
}
