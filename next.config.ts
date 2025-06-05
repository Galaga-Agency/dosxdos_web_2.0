/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Include large desktop sizes
    imageSizes: [16, 32, 64, 96, 128, 256, 384, 512, 768, 1024],
    formats: ["image/webp", "image/avif"], // Modern formats for better quality/size ratio
    minimumCacheTTL: 60 * 60 * 24 * 30, // Cache images for longer (30 days)
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
