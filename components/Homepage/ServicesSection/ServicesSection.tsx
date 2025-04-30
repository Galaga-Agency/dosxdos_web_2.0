"use client";
import React, { useEffect, useRef } from "react";
import { SplitText } from "@/plugins";
import { animateServicesSection } from "@/utils/animations/homepage-anim";
import { categoriesList } from "@/data/categories";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import { initCardMouseParallax } from "@/utils/animations/card-hover-anim";
import "./ServicesSection.scss";

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate Services Section
    const timer = setTimeout(() => {
      if (
        sectionRef.current &&
        titleRef.current &&
        subtitleRef.current &&
        gridRef.current
      ) {
        animateServicesSection({
          section: sectionRef.current,
          title: titleRef.current,
          subtitle: subtitleRef.current,
          grid: gridRef.current,
        });
      }
    }, 500);

    // Initialize card mouse parallax
    const parallaxTimer = setTimeout(() => {
      initCardMouseParallax();
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(parallaxTimer);
    };
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
