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
  images: {
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
    ],
  },
};

module.exports = nextConfig;
