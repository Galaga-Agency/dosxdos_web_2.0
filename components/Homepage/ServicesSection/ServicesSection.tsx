"use client";

import React, { useEffect, useRef } from "react";
import { SplitText } from "@/plugins";
import { charAnimation } from "@/utils/animations/title-anim";
import { categoriesList } from "@/data/categories";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import { initCardMouseParallax } from "@/utils/animations/card-hover-anim";
import "./ServicesSection.scss";

const ServicesSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      const timer = setTimeout(() => {
        charAnimation(titleRef.current);
      }, 500);
      
      // Initialize card mouse parallax after everything is rendered
      const parallaxTimer = setTimeout(() => {
        initCardMouseParallax();
      }, 1000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(parallaxTimer);
      };
    }
  }, []);

  return (
    <section className="services-section">
      <div className="services-section__decorative-elements">
        <div className="services-section__decor-dots"></div>
        <div className="services-section__decor-line"></div>
        <div className="services-section__decor-circle"></div>
        <div className="services-section__decor-grid"></div>
      </div>
      
      <div className="container">
        <h2 ref={titleRef} className="title">
          Nuestros <span>servicios</span>
        </h2>
        <p className="subtitle">
          Nuestros equipos en <strong>Canarias</strong> y{" "}
          <strong>Madrid</strong>. Nuestros servicios donde los necesites.
        </p>
        
        <div className="grid">
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
      
      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-text">
            {Array.from({ length: 50 }).map((_, i) => (
              <span key={i}>OUR WORK&nbsp;</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;