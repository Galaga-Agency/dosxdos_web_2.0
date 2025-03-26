/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./styles'],
    prependData: `@use "styles/abstracts" as *;`,
  },
}

module.exports = nextConfig