// Import Nextra configuration
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

// Define your existing Next.js configuration
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  // Add the images configuration here
  images: {
    domains: ["sdbooth2-production.s3.amazonaws.com"],
  },
};

// Merge Nextra with your Next.js configuration
module.exports = withNextra(nextConfig);
