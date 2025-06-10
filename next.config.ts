// @ts-nocheck

/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: false,

  // Webpack configuration
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "."),
    };

    // Completely exclude GSAP from server builds
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        gsap: false,
        "gsap/ScrollTrigger": false,
        "gsap/ScrollSmoother": false,
        "gsap/SplitText": false,
      };
    }

    return config;
  },

  sassOptions: {
    includePaths: ["./styles"],
    prependData: `@use "styles/abstracts" as *;`,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 64, 96, 128, 256, 384, 512, 768, 1024],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    domains: ["dospordosgrupoimagen.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dospordosgrupoimagen.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
