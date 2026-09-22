import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a fully static site in the `out/` directory.
  // Every page in this app is SSG (○/●), so no Worker is needed at runtime.
  // Deploy `out/` as Cloudflare Pages static assets — no 64 MB Worker limit applies.
  output: "export",

  // Recommended for static hosts: avoids redirect loops on paths without trailing slashes.
  trailingSlash: true,

  experimental: {
    cpus: 4,
    workerThreads: false,
  },
};

export default nextConfig;
