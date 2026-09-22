/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",

  images: {
    unoptimized: true,
  },
  experimental: {
    cpus: 2,
    workerThreads: false,
  },

  trailingSlash: true,
};

module.exports = nextConfig;
