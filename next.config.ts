/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'export',
  experimental: {
    cpus: 4,
    workerThreads: false,
  },
};

module.exports = nextConfig;
