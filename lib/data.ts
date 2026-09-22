import raw from "@/data/nutrition.json";
import type { NutritionItem, Category } from "./types";

const items = raw as unknown as NutritionItem[];
const itemBySlug = new Map(items.map((item) => [item.slug, item]));
const allSlugs = items.map((item) => item.slug);
const alphabeticalItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
const itemsByCategory = new Map<Category, NutritionItem[]>();
const relatedGroupsCache = new Map<string, ReturnType<typeof buildRelatedItemGroups>>();
const relatedStopWords = new Set(["and", "with", "for", "from", "into", "the", "this", "that", "use", "used"]);

for (const item of items) {
  const categoryItems = itemsByCategory.get(item.category) ?? [];
  categoryItems.push(item);
  itemsByCategory.set(item.category, categoryItems);
}

const relatedTextTokens = new Map<string, Set<string>>(
  items.map((item) => [
    item.slug,
    new Set(
      [...item.serving_ideas, item.intro]
        .join(" ")
        .toLowerCase()
        .match(/[a-z0-9]+/g) ?? []
    ),
  ])
);

export const CATEGORY_LABELS: Record<Category, string> = {
  fruit: "Fruits",
  vegetable: "Vegetables",
  grain: "Grains",
  meat: "Meat & Poultry",
  seafood: "Seafood",
  dairy: "Dairy",
  legume: "Legumes",
  beverage: "Beverages",
  herb_or_spice: "Herbs & Spices",
  nut_or_seed: "Nuts & Seeds",
  oil_or_fat: "Oils & Fats",
  egg: "Eggs",
  other: "Other Foods",
};

export const CATEGORY_EMOJI: Record<Category, string> = {
  fruit: "🍎",
  vegetable: "🥦",
  grain: "🌾",
  meat: "🍗",
  seafood: "🐟",
  dairy: "🥛",
  legume: "🫘",
  beverage: "🥤",
  herb_or_spice: "🌿",
  nut_or_seed: "🥜",
  oil_or_fat: "🫒",
  egg: "🥚",
  other: "🍽️",
};

export function getAllItems(): NutritionItem[] {
  return items;
}

export function getItemBySlug(slug: string): NutritionItem | undefined {
  return itemBySlug.get(slug);
}

export function getAllSlugs(): string[] {
  return allSlugs;
}

export function getCategories(): Category[] {
  const set = new Set<Category>();
  items.forEach((i) => set.add(i.category));
  return Array.from(set).sort(
    (a, b) => getItemsByCategory(b).length - getItemsByCategory(a).length
  );
}

export function getItemsByCategory(category: Category): NutritionItem[] {
  return itemsByCategory.get(category) ?? [];
}

export function getRelatedItems(item: NutritionItem, count = 6): NutritionItem[] {
  const groups = getRelatedItemGroups(item, count);
  const candidates = [
    ...groups.sameCategory,
    ...groups.sharedMicronutrients,
    ...groups.alphabetical,
    ...groups.commonlyUsedTogether,
  ];
  const seen = new Set<string>();
  return candidates.filter((candidate) => {
    if (seen.has(candidate.slug)) return false;
    seen.add(candidate.slug);
    return true;
  }).slice(0, count);
}

export type HubMetric = "highest-calorie" | "highest-protein" | "lowest-calorie";

export const HUB_METRICS: HubMetric[] = [
  "highest-protein",
  "lowest-calorie",
  "highest-calorie",
];

export function getMetricLabel(metric: HubMetric): string {
  return {
    "highest-calorie": "Highest-calorie foods",
    "highest-protein": "Highest-protein foods",
    "lowest-calorie": "Lowest-calorie foods",
  }[metric];
}

export function getItemsByMetric(
  metric: HubMetric,
  category?: Category,
  limit?: number
): NutritionItem[] {
  const source = category ? items.filter((i) => i.category === category) : items;
  const sorted = [...source].sort((a, b) => {
    if (metric === "highest-protein") return b.per_100g.protein_g - a.per_100g.protein_g;
    if (metric === "lowest-calorie") return a.per_100g.calories_kcal - b.per_100g.calories_kcal;
    return b.per_100g.calories_kcal - a.per_100g.calories_kcal;
  });
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

function sharedTokens(left: Set<string>, right: Set<string>): number {
  return [...left].filter((word) => word.length > 3 && !relatedStopWords.has(word) && right.has(word)).length;
}

export function getRelatedItemGroups(item: NutritionItem, count = 6) {
  const cacheKey = `${item.slug}:${count}`;
  const cached = relatedGroupsCache.get(cacheKey);
  if (cached) return cached;

  const groups = buildRelatedItemGroups(item, count);
  relatedGroupsCache.set(cacheKey, groups);
  return groups;
}

function buildRelatedItemGroups(item: NutritionItem, count: number) {
  const others = items.filter((candidate) => candidate.slug !== item.slug);
  const sameCategory = (itemsByCategory.get(item.category) ?? [])
    .filter((candidate) => candidate.slug !== item.slug)
    .sort((a, b) => Math.abs(a.per_100g.calories_kcal - item.per_100g.calories_kcal) - Math.abs(b.per_100g.calories_kcal - item.per_100g.calories_kcal))
    .slice(0, Math.max(4, Math.ceil(count / 2)));
  const nutrientNames = new Set(item.key_micronutrients.map((nutrient) => nutrient.name.toLowerCase()));
  const sharedMicronutrients = others
    .map((candidate) => ({
      candidate,
      score: candidate.key_micronutrients.filter((nutrient) => nutrientNames.has(nutrient.name.toLowerCase())).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name))
    .map(({ candidate }) => candidate)
    .slice(0, Math.max(3, Math.ceil(count / 2)));
  const alphabeticalIndex = alphabeticalItems.findIndex((candidate) => candidate.slug === item.slug);
  const alphabetical = alphabeticalItems
    .slice(Math.max(0, alphabeticalIndex - 2), alphabeticalIndex + 3)
    .filter((candidate) => candidate.slug !== item.slug);
  const itemTokens = relatedTextTokens.get(item.slug) ?? new Set<string>();
  const commonlyUsedTogether = others
    .map((candidate) => ({
      candidate,
      score: sharedTokens(itemTokens, relatedTextTokens.get(candidate.slug) ?? new Set<string>()),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name))
    .map(({ candidate }) => candidate)
    .slice(0, Math.max(3, Math.ceil(count / 2)));

  return { sameCategory, sharedMicronutrients, alphabetical, commonlyUsedTogether };
}

export function getHighestCalorie(limit = 8): NutritionItem[] {
  return getItemsByMetric("highest-calorie", undefined, limit);
}

export function getHighestProtein(limit = 8): NutritionItem[] {
  return getItemsByMetric("highest-protein", undefined, limit);
}

export function getLowestCalorie(limit = 8): NutritionItem[] {
  return getItemsByMetric("lowest-calorie", undefined, limit);
}

export function getTotalCount(): number {
  return items.length;
}

// A stable "featured" sample for the homepage, spread across categories.
export function getFeaturedItems(limit = 8): NutritionItem[] {
  const cats = getCategories();
  const picks: NutritionItem[] = [];
  let i = 0;
  while (picks.length < limit && i < 50) {
    const cat = cats[i % cats.length];
    const catItems = getItemsByCategory(cat);
    const pick = catItems[Math.floor(i / cats.length) % catItems.length];
    if (pick && !picks.find((p) => p.slug === pick.slug)) {
      picks.push(pick);
    }
    i++;
  }
  return picks.slice(0, limit);
}
