import Link from "next/link";
import { Apple } from "lucide-react";
import { getCategories, CATEGORY_LABELS, CATEGORY_EMOJI, getTotalCount } from "@/lib/data";
import { SITE_NAME } from "@/lib/site";
import Image from "next/image";
export default function Footer() {
  const categories = getCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t-2 border-hare bg-swan">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="mb-3 flex items-center gap-2">
              <Image src="/logo.png" alt={SITE_NAME} width={120} height={120} className="w-auto h-auto rounded-xl" priority />
            </Link>
            <p className="text-sm font-medium text-ink-light">
              Free nutrition facts for {getTotalCount()}+ foods — calories, macros,
              vitamins &amp; more, explained simply.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-extrabold text-ink">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((c) => (
                <li key={c}>
                  <Link
                    href={`/foods/${c}`}
                    className="text-sm font-semibold text-ink-light hover:text-duo-green"
                  >
                    {CATEGORY_EMOJI[c]} {CATEGORY_LABELS[c]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-extrabold text-ink">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/foods" className="text-sm font-semibold text-ink-light hover:text-duo-green">
                  All Foods
                </Link>
              </li>
              <li>
                <Link href="/#popular" className="text-sm font-semibold text-ink-light hover:text-duo-green">
                  Popular Foods
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-sm font-semibold text-ink-light hover:text-duo-green">
                  Browse Categories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-extrabold text-ink">Trust &amp; data</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm font-semibold text-ink-light hover:text-duo-green">
                  About {SITE_NAME}
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-sm font-semibold text-ink-light hover:text-duo-green">
                  Methodology &amp; sources
                </Link>
              </li>
              <li>
                <Link href="/corrections" className="text-sm font-semibold text-ink-light hover:text-duo-green">
                  Corrections
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm font-semibold text-ink-light hover:text-duo-green">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm font-semibold text-ink-light hover:text-duo-green">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm font-semibold text-ink-light hover:text-duo-green">
                  Terms of use
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm font-semibold text-ink-light hover:text-duo-green">
                  Nutrition disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t-2 border-hare pt-6 text-xs font-semibold text-wolf sm:flex-row">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p>Made with 💚 for curious eaters.</p>
        </div>
      </div>
    </footer>
  );
}
