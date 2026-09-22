/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 2,
    workerThreads: false,
  },
};

module.exports = nextConfig;
