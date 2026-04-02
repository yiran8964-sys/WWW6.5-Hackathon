/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
const path = require('path');

const withNextIntl = createNextIntlPlugin(path.resolve(__dirname, './src/i18n.ts'));

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.io', 'nftstorage.link'],
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
}

module.exports = withNextIntl(nextConfig)
