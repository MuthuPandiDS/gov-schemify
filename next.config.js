/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@trpc/server': '@trpc/server',
      '@trpc/client': '@trpc/client',
      '@trpc/react-query': '@trpc/react-query',
      '@trpc/next': '@trpc/next',
    };
    return config;
  },
};

module.exports = nextConfig; 