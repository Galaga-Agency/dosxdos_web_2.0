"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { categoriesList } from "@/data/categories";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import { initFadeAnimations } from "@/utils/animations/pages/homepage-anim";
import { initCardMouseParallax } from "@/utils/animations/components/card-hover-anim";
import "./ServicesSection.scss";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      // Delay animation slightly to allow DOM to fully render
      const timer = setTimeout(() => {
        // Initialize fade animations
        initFadeAnimations();

        // Initialize card mouse parallax after animations
        const parallaxTimer = setTimeout(() => {
          initCardMouseParallax();
        }, 500);

        // Force refresh to ensure ScrollTrigger works properly
        setTimeout(() => {
          if ((window as any).__smoother__) {
            console.log("Refreshing ScrollSmoother");
            (window as any).__smoother__.refresh();
          }
          ScrollTrigger.refresh();
        }, 100);

        return () => {
          clearTimeout(parallaxTimer);
        };
      }, 300);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section ref={sectionRef} className="services-section">
      <div className="services-section__container">
        <div className="services-section__header">
          <div className="services-section__label fade_bottom">
            <span>Nuestros servicios</span>
          </div>

          <h2 className="services-section__title">
            <div className="title-row fade_bottom">SOLUCIONES INTEGRALES</div>
            <div className="title-row fade_bottom">
              PARA ESPACIOS COMERCIALES DE LUJO
            </div>
          </h2>
        </div>

        <p className="services-section__subtitle fade_bottom">
          Nuestros equipos en <strong>Canarias</strong> y{" "}
          <strong>Madrid</strong>. Nuestros servicios donde los necesites.
        </p>

        <div className="services-section__grid">
          {categoriesList.map((service, index) => (
            <div
              key={service.id}
              className={`services-section__card-wrapper fade_bottom`}
            >
              <HoverCard
                id={service.id}
                title={service.name}
                description={service.description as string}
                imageUrl={service.imageUrl}
                linkUrl={`/servicios/${service.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
