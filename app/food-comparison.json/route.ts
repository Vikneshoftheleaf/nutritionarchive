import { getAllItems } from "@/lib/data";

export const dynamic = "force-static";

export function GET() {
  const foods = getAllItems().map(({ slug, name, per_100g }) => ({
    slug,
    name,
    per_100g,
  }));

  return Response.json(foods);
}
