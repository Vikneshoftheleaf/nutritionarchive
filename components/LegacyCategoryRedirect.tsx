"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function RedirectWatcher() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      router.replace(`/foods/${category}`);
    }
  }, [searchParams, router]);

  return null;
}

export default function LegacyCategoryRedirect() {
  return (
    <Suspense fallback={null}>
      <RedirectWatcher />
    </Suspense>
  );
}
