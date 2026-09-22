import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 4,
    workerThreads: false,
  },
  // Exclude the large nutrition JSON from the server bundle trace.
  // All pages importing this data are fully static (SSG), so the Worker
  // never needs this file at runtime — it only serves pre-rendered HTML.
  outputFileTracingExcludes: {
    "*": ["./data/nutrition.json"],
  },
};

export default nextConfig;
