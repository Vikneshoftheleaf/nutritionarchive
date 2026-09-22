import Link from "next/link";
import type { NutritionItem } from "@/lib/types";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type Matcher = {
  pattern: RegExp;
  itemsByName: Map<string, NutritionItem>;
};

const matcherCache = new WeakMap<readonly NutritionItem[], Matcher>();

function getMatcher(items: readonly NutritionItem[]): Matcher | undefined {
  const cached = matcherCache.get(items);
  if (cached) return cached;

  const itemsByName = new Map<string, NutritionItem>();
  for (const item of items) {
    const name = item.name.toLowerCase();
    if (!itemsByName.has(name)) itemsByName.set(name, item);
  }

  if (itemsByName.size === 0) return undefined;

  const pattern = new RegExp(
    `(${[...itemsByName.values()]
      .sort((a, b) => b.name.length - a.name.length)
      .map((item) => escapeRegExp(item.name))
      .join("|")})`,
    "gi"
  );
  const matcher = { pattern, itemsByName };
  matcherCache.set(items, matcher);
  return matcher;
}

export default function ContextualLinks({
  text,
  items,
}: {
  text: string;
  items: readonly NutritionItem[];
}) {
  const matcher = getMatcher(items);
  if (!matcher) return text;

  return text.split(matcher.pattern).map((part, index) => {
    const match = matcher.itemsByName.get(part.toLowerCase());
    return match ? (
      <Link key={`${match.slug}-${index}`} href={`/nutrition-facts/${match.slug}`} className="font-extrabold text-duo-green hover:text-duo-green-dark">
        {part}
      </Link>
    ) : (
      part
    );
  });
}