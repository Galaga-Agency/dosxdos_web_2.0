import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://dospordosgrupoimagen.com";
  const isProduction = process.env.NODE_ENV === "production";

  // In development, block everything except localhost
  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  // Production rules - allow search engines
  return {
    rules: [
      // General rules for all bots
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Block admin areas
          "/admin/",
          "/admin/*",

          // Block API endpoints
          "/api/",
          "/api/*",

          // Block NextJS internal files
          "/_next/",
          "/_next/*",

          // Block private assets
          "/assets/private/",
          "/assets/private/*",

          // Block error pages (users shouldn't find these)
          "/404",
          "/500",

          // Block login/auth pages
          "/login",
          "/login/*",

          // Block specific admin blog editing pages
          "/admin/blog/editar/*",
          "/admin/blog/nuevo",

          // Optional: Block upload endpoint
          "/upload",
          "/upload/*",
        ],
        // Add crawl delay to be respectful
        crawlDelay: 1,
      },

      // Special rules for Googlebot (more permissive)
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/assets/private/", "/login"],
        // No crawl delay for Google
      },

      // Special rules for Bingbot
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/assets/private/", "/login"],
        crawlDelay: 2, // Slightly slower for Bing
      },

      // Block bad bots (optional)
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot"],
        disallow: "/",
      },
    ],

    // Sitemap location
    sitemap: `${baseUrl}/sitemap.xml`,

    // Host declaration (optional but good for SEO)
    host: baseUrl,
  };
}
