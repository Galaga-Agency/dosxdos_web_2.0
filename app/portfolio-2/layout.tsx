import React from "react";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explora nuestra selección de proyectos de diseño de interiores comerciales para marcas de lujo.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script id="preload-portfolio-images">
        {`
          // This script runs on the client side to preload images
          (function() {
            // Only run once per session
            if (sessionStorage.getItem('portfolioImagesPreloaded')) return;
            
            // Helper function to preload an image
            function preloadImage(url) {
              const img = new Image();
              img.src = url;
            }
            
            // Portfolio thumbnails
            preloadImage('/assets/img/portfolio/project-1-thumbnail.webp');
            preloadImage('/assets/img/portfolio/project-2-thumbnail.webp');
            preloadImage('/assets/img/portfolio/project-3-thumbnail.webp');
            preloadImage('/assets/img/portfolio/project-4-thumbnail.webp');
            preloadImage('/assets/img/portfolio/project-5-thumbnail.webp');
            preloadImage('/assets/img/portfolio/project-6-thumbnail.webp');
            
            // Mark these images as preloaded for this session
            sessionStorage.setItem('portfolioImagesPreloaded', 'true');
          })();
        `}
      </Script>
      {children}
    </>
  );
}
