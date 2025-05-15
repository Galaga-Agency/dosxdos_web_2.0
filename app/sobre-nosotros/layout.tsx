import React from "react";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce nuestro equipo y nuestra historia. Más de 35 años de experiencia en el diseño de espacios comerciales.",
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script id="preload-team-images">
        {`
          // This script runs on the client side to preload images
          (function() {
            // Only run once per session
            if (sessionStorage.getItem('aboutUsImagesPreloaded')) return;
            
            // Helper function to preload an image
            function preloadImage(url) {
              const img = new Image();
              img.src = url;
            }
            
            // Team section images
            preloadImage('/assets/img/team/team-1-1.jpg');
            preloadImage('/assets/img/team/team-1-2.jpg');
            preloadImage('/assets/img/team/team-1-3.jpg');
            preloadImage('/assets/img/team/team-1-4.jpg');
            preloadImage('/assets/img/team/team-1-5.jpg');
            preloadImage('/assets/img/team/team-1-6.jpg');
            preloadImage('/assets/img/team/team-1-7.jpg');
            preloadImage('/assets/img/team/team-1-8.jpg');
            preloadImage('/assets/img/team/team-1-9.jpg');
            
            // CTA and foundation images
            preloadImage('/assets/img/about-us-page/mil-caminos-illustration.jpg');
            preloadImage('/assets/img/about-us-page/yrichen-illustration.webp');
            preloadImage('/assets/img/about-us-page/vicente-ferrer-illustration.jpg');
            
            // Foundation logos
            preloadImage('/assets/img/about-us-page/vicente-ferrer-logo.svg');
            preloadImage('/assets/img/about-us-page/yrichen-logo.webp');
            preloadImage('/assets/img/about-us-page/mil-caminos-logo.png');
            
            // Mark these images as preloaded for this session
            sessionStorage.setItem('aboutUsImagesPreloaded', 'true');
          })();
        `}
      </Script>
      {children}
    </>
  );
}
