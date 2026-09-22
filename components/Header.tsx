import Link from "next/link";
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
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2 sm:gap-6 sm:px-6 sm:py-3">
        {/* Logo — smaller on mobile so the search bar gets space */}
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={SITE_NAME}>
          <Image
            src="/logo.png"
            alt={SITE_NAME}
            width={100}
            height={100}
            priority
            className="h-[72px] w-auto sm:h-[70px] lg:h-[90px]"
          />
        </Link>

        {/* Search bar — takes all remaining space */}
        <div className="flex-1 min-w-0">
          <SearchBar items={items} compact />
        </div>

        {/* Nav — hidden on mobile */}
        <nav className="hidden shrink-0 items-center gap-1 md:flex">
          <Link
            href="/#categories"
            className="rounded-xl px-3 py-2 font-bold text-sm text-ink-light hover:bg-swan hover:text-ink transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/#popular"
            className="rounded-xl px-3 py-2 font-bold text-sm text-ink-light hover:bg-swan hover:text-ink transition-colors"
          >
            Popular
          </Link>
          <Link
            href="/foods"
            className="rounded-xl px-3 py-2 font-bold text-sm text-ink-light hover:bg-swan hover:text-ink transition-colors"
          >
            All Foods
          </Link>
        </nav>
      </div>
    </header>
  );
}
