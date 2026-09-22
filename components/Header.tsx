import Link from "next/link";
import { Apple } from "lucide-react";
import SearchBar from "./SearchBar";
import { getAllItems } from "@/lib/data";
import Image from "next/image";
import { SITE_NAME } from "@/lib/site";
export default function Header() {
  const items = getAllItems().map((i) => ({
    slug: i.slug,
    name: i.name,
    category: i.category,
  }));

  return (
    <header className="sticky top-0 z-50 border-b-2 border-hare bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
        <Image src="/logo.png" alt={SITE_NAME} width={120} height={120} priority className="w-auto h-auto" />
        </Link>

        <div className="flex-1">
          <SearchBar items={items} compact />
        </div>

        <nav className="hidden shrink-0 items-center gap-1 md:flex">
          <Link
            href="/#categories"
            className="rounded-xl px-3 py-2 font-bold text-sm text-ink-light hover:bg-swan hover:text-ink"
          >
            Categories
          </Link>
          <Link
            href="/#popular"
            className="rounded-xl px-3 py-2 font-bold text-sm text-ink-light hover:bg-swan hover:text-ink"
          >
            Popular
          </Link>
          <Link
            href="/foods"
            className="rounded-xl px-3 py-2 font-bold text-sm text-ink-light hover:bg-swan hover:text-ink"
          >
            All Foods
          </Link>
        </nav>
      </div>
    </header>
  );
}
