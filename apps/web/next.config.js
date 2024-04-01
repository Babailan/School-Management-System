// @ts-check

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // output: "export",
  // assetPrefix: "./",

  experimental: {
    instrumentationHook: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
