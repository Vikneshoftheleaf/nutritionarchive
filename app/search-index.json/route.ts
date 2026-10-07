import { getAllItems } from "@/lib/data";

export const dynamic = "force-static";

export function GET() {
  const items = getAllItems().map(({ slug, name, category }) => ({
    slug,
    name,
    category,
  }));

  return Response.json(items);
}
