import Link from "next/link";
import type { NutritionItem } from "@/lib/types";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function ContextualLinks({
  text,
  items,
}: {
  text: string;
  items: NutritionItem[];
}) {
  const candidates = [...items]
    .sort((a, b) => b.name.length - a.name.length)
    .filter((item, index, all) => all.findIndex((candidate) => candidate.name.toLowerCase() === item.name.toLowerCase()) === index);
  if (candidates.length === 0) return text;

  const pattern = new RegExp(`(${candidates.map((item) => escapeRegExp(item.name)).join("|")})`, "gi");
  return text.split(pattern).map((part, index) => {
    const match = candidates.find((item) => item.name.toLowerCase() === part.toLowerCase());
    return match ? (
      <Link key={`${match.slug}-${index}`} href={`/nutrition-facts/${match.slug}`} className="font-extrabold text-duo-green hover:text-duo-green-dark">
        {part}
      </Link>
    ) : (
      part
    );
  });
}