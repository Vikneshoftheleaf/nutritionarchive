/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 4,
    workerThreads: false,
  },
};

module.exports = nextConfig;
