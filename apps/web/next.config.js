// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // output: "export",
  // assetPrefix: "./",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
      },
    ],
  },
  experimental: {
    instrumentationHook: true,
  },
};

module.exports = nextConfig;
