/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["cards.scryfall.io", "svgs.scryfall.io"],
  },
};

module.exports = nextConfig;
