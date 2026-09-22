import raw from "@/data/nutrition.json";
import type { NutritionItem, Category, FoodCardItem } from "./types";

const items = raw as unknown as NutritionItem[];
const itemBySlug = new Map(items.map((item) => [item.slug, item]));
const allSlugs = items.map((item) => item.slug);
const alphabeticalItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
const alphaIdx = new Map(alphabeticalItems.map((item, i) => [item.slug, i]));
const itemsByCategory = new Map<Category, NutritionItem[]>();
const relatedGroupsCache = new Map<string, ReturnType<typeof buildRelatedItemGroups>>();
const relatedStopWords = new Set(["and", "with", "for", "from", "into", "the", "this", "that", "use", "used"]);

for (const item of items) {
  const categoryItems = itemsByCategory.get(item.category) ?? [];
  categoryItems.push(item);
  itemsByCategory.set(item.category, categoryItems);
}

// Bounded inverted index for nutrients (max 150 items per nutrient)
const nutrientToItems = new Map<string, number[]>();
for (let i = 0; i < items.length; i++) {
  for (const n of items[i].key_micronutrients) {
    const key = n.name.toLowerCase();
    const arr = nutrientToItems.get(key) ?? [];
    if (arr.length < 150) {
      arr.push(i);
      nutrientToItems.set(key, arr);
    }
  }
}

// Bounded inverted index for text tokens (max 50 items per word)
const wordToItems = new Map<string, number[]>();
const itemTokensList: string[][] = [];

for (let i = 0; i < items.length; i++) {
  const item = items[i];
  const words = (
    [...item.serving_ideas, item.intro]
      .join(" ")
      .toLowerCase()
      .match(/[a-z0-9]+/g) ?? []
  ).filter((w) => w.length > 3 && !relatedStopWords.has(w));
  const unique = [...new Set(words)];
  itemTokensList.push(unique);
  for (const word of unique) {
    const arr = wordToItems.get(word) ?? [];
    if (arr.length < 50) {
      arr.push(i);
      wordToItems.set(word, arr);
    }
  }
}

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

export function toCardItem(item: NutritionItem): FoodCardItem {
  return {
    slug: item.slug,
    name: item.name,
    category: item.category,
    intro: item.intro,
    per_100g: {
      calories_kcal: item.per_100g.calories_kcal,
      protein_g: item.per_100g.protein_g,
    },
  };
}

const cardItems = items.map(toCardItem);
const cardItemsByCategory = new Map<Category, FoodCardItem[]>();
for (const card of cardItems) {
  const arr = cardItemsByCategory.get(card.category) ?? [];
  arr.push(card);
  cardItemsByCategory.set(card.category, arr);
}

export function getAllCardItems(): FoodCardItem[] {
  return cardItems;
}

export function getCardItemsByCategory(category: Category): FoodCardItem[] {
  return cardItemsByCategory.get(category) ?? [];
}

export function getCardItemsByMetric(
  metric: HubMetric,
  category?: Category,
  limit?: number
): FoodCardItem[] {
  return getItemsByMetric(metric, category, limit).map(toCardItem);
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

export function getRelatedItemGroups(item: NutritionItem, count = 6) {
  const cacheKey = `${item.slug}:${count}`;
  const cached = relatedGroupsCache.get(cacheKey);
  if (cached) return cached;

  const groups = buildRelatedItemGroups(item, count);
  relatedGroupsCache.set(cacheKey, groups);
  return groups;
}

function buildRelatedItemGroups(item: NutritionItem, count: number) {
  const sameCatLimit = Math.max(4, Math.ceil(count / 2));
  const microLimit = Math.max(3, Math.ceil(count / 2));
  const togetherLimit = Math.max(3, Math.ceil(count / 2));

  // 1. Same category by calorie proximity
  const sameCategory = (itemsByCategory.get(item.category) ?? [])
    .filter((candidate) => candidate.slug !== item.slug)
    .sort(
      (a, b) =>
        Math.abs(a.per_100g.calories_kcal - item.per_100g.calories_kcal) -
        Math.abs(b.per_100g.calories_kcal - item.per_100g.calories_kcal)
    )
    .slice(0, sameCatLimit);

  // 2. Shared micronutrients using bounded index
  const itemIdx = alphaIdx.get(item.slug);
  const microScores = new Map<number, number>();
  for (const n of item.key_micronutrients) {
    const key = n.name.toLowerCase();
    const candidateIndices = nutrientToItems.get(key);
    if (candidateIndices) {
      for (const idx of candidateIndices) {
        if (items[idx].slug !== item.slug) {
          microScores.set(idx, (microScores.get(idx) ?? 0) + 1);
        }
      }
    }
  }
  const sharedMicronutrients = [...microScores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, microLimit)
    .map(([idx]) => items[idx]);

  // 3. Alphabetical neighbours (O(1) lookup via alphaIdx Map)
  const ai = itemIdx ?? alphabeticalItems.findIndex((c) => c.slug === item.slug);
  const alphabetical = alphabeticalItems
    .slice(Math.max(0, ai - 2), ai + 3)
    .filter((candidate) => candidate.slug !== item.slug);

  // 4. Commonly used together using bounded inverted index
  const tokenScores = new Map<number, number>();
  const words = (
    [...item.serving_ideas, item.intro]
      .join(" ")
      .toLowerCase()
      .match(/[a-z0-9]+/g) ?? []
  ).filter((w) => w.length > 3 && !relatedStopWords.has(w));
  for (const word of new Set(words)) {
    const candidateIndices = wordToItems.get(word);
    if (candidateIndices) {
      for (const idx of candidateIndices) {
        if (items[idx].slug !== item.slug) {
          tokenScores.set(idx, (tokenScores.get(idx) ?? 0) + 1);
        }
      }
    }
  }
  const commonlyUsedTogether = [...tokenScores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, togetherLimit)
    .map(([idx]) => items[idx]);

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
