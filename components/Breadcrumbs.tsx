import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm font-bold">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className="flex items-center gap-1">
            {idx > 0 && (
              <ChevronRight className="h-3.5 w-3.5 text-wolf" strokeWidth={3} />
            )}
            {item.href && !isLast ? (
              <Link href={item.href} className="text-ink-light hover:text-duo-green">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-ink" : "text-ink-light"}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
