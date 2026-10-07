"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function RedirectWatcher() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      window.location.replace(`/foods/${encodeURIComponent(category)}`);
    }
  }, [searchParams]);

  return null;
}

export default function LegacyCategoryRedirect() {
  return (
    <Suspense fallback={null}>
      <RedirectWatcher />
    </Suspense>
  );
}
