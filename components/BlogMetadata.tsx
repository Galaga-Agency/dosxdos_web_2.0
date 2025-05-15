// components/BlogMetadata/BlogMetadata.tsx
"use client";

import { useEffect } from "react";
import { BlogPost } from "@/types/blog-post-types";
import { getImageSource } from "@/utils/editor";
import Head from "next/head";

interface BlogMetadataProps {
  post: BlogPost;
  url: string;
}

const BlogMetadata: React.FC<BlogMetadataProps> = ({ post, url }) => {
  // Next.js 13+ App Router doesn't use Head component directly
  // So we'll update meta tags via direct DOM manipulation
  useEffect(() => {
    // Remove any existing Open Graph tags
    document
      .querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')
      .forEach((el) => el.remove());

    // Create and append Open Graph meta tags
    const metaTags = [
      { property: "og:title", content: post.title },
      {
        property: "og:description",
        content:
          post.excerpt ||
          `Artículo de ${post.author} en Dos por Dos Grupo Imagen sobre ${post.category}`,
      },
      { property: "og:url", content: url },
      { property: "og:image", content: getImageSource(post) },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: "Dos por Dos Grupo Imagen" },

      // Twitter Card tags
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: post.title },
      {
        name: "twitter:description",
        content:
          post.excerpt ||
          `Artículo de ${post.author} en Dos por Dos Grupo Imagen sobre ${post.category}`,
      },
      { name: "twitter:image", content: getImageSource(post) },
    ];

    const fragment = document.createDocumentFragment();

    metaTags.forEach(({ property, name, content }) => {
      const meta = document.createElement("meta");
      if (property) meta.setAttribute("property", property);
      if (name) meta.setAttribute("name", name);
      meta.setAttribute("content", content);
      fragment.appendChild(meta);
    });

    document.head.appendChild(fragment);

    // Clean up
    return () => {
      document
        .querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')
        .forEach((el) => el.remove());
    };
  }, [post, url]);

  // This component doesn't render anything visible
  return null;
};

export default BlogMetadata;
