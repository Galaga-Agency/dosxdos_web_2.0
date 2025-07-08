// @ts-nocheck

/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: false,

  // Performance optimizations
  experimental: {
    optimizePackageImports: ["gsap", "lucide-react"],
    scrollRestoration: true,
    optimizeCss: true,
  },

  // Webpack configuration
  webpack: (config, { isServer, dev }) => {
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

    // Production optimizations
    if (!dev) {
      // Split chunks for better caching
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          animations: {
            name: "animations",
            chunks: "all",
            test: /[\\/]node_modules[\\/](gsap|@gsap)[\\/]/,
            priority: 20,
          },
          vendor: {
            name: "vendor",
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
        },
      };

      // Minimize bundle size
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
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
    // Remove React DevTools in production
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },

  // Performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Optimize images
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"], // AVIF first for better compression
    minimumCacheTTL: 60 * 60 * 24 * 365, // Cache for 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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

  // Output configuration for better performance
  output: "standalone",

  // Disable powered by header
  poweredByHeader: false,

  // Compress pages
  compress: true,

  // Generate ETags for better caching
  generateEtags: true,
};

module.exports = nextConfig;
