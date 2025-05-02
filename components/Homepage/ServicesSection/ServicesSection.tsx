"use client";

import React, { useEffect, useRef } from "react";
import { animateServicesSection } from "@/utils/animations/pages/homepage-anim";
import { categoriesList } from "@/data/categories";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import { initCardMouseParallax } from "@/utils/animations/components/card-hover-anim";
import "./ServicesSection.scss";

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      sectionRef.current &&
      titleRef.current &&
      subtitleRef.current &&
      gridRef.current
    ) {
      // Delay animation slightly to allow DOM to fully render
      const timer = setTimeout(() => {
        animateServicesSection({
          section: sectionRef.current,
          title: titleRef.current,
          subtitle: subtitleRef.current,
          grid: gridRef.current,
        });

        // Initialize card mouse parallax after animations
        const parallaxTimer = setTimeout(() => {
          initCardMouseParallax();
        }, 500);

        return () => {
          clearTimeout(parallaxTimer);
        };
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section ref={sectionRef} className="services-section">
      <div className="container">
        <h2 ref={titleRef} className="title">
          Nuestros servicios
        </h2>
        <p ref={subtitleRef} className="subtitle">
          Nuestros equipos en <strong>Canarias</strong> y{" "}
          <strong>Madrid</strong>. Nuestros servicios donde los necesites.
        </p>

        <div ref={gridRef} className="grid">
          {categoriesList.map((service) => (
            <HoverCard
              key={service.id}
              id={service.id}
              title={service.name}
              description={service.description as string}
              imageUrl={service.imageUrl}
              linkUrl={`/servicios/${service.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
