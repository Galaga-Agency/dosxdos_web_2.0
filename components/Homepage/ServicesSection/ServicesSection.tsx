"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "@/plugins";
import { charAnimation } from "@/utils/animations/title-anim";
import { categoriesList } from "@/data/categories";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import "./ServicesSection.scss";

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(SplitText);

    // Title animation
    if (titleRef.current) {
      const timer = setTimeout(() => {
        charAnimation(titleRef.current);
      }, 500);
      return () => clearTimeout(timer);
    }
    
    // Subtitle fade-in
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
      );
    }
    
    // Grid items fade in
    if (gridRef.current) {
      const gridItems = gridRef.current.children;
      gsap.fromTo(
        gridItems,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15, 
          delay: 0.7,
          ease: "power2.out" 
        }
      );
    }
    
    // Decorative elements animation
    if (decorRef.current) {
      const decorElements = decorRef.current.children;
      gsap.fromTo(
        decorElements,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1, 
          stagger: 0.2, 
          delay: 1,
          ease: "elastic.out(1, 0.5)" 
        }
      );
    }
  }, []);

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="services-section__decorative-elements" ref={decorRef}>
        <div className="services-section__decor-dots"></div>
        <div className="services-section__decor-line"></div>
        <div className="services-section__decor-circle"></div>
        <div className="services-section__decor-grid"></div>
      </div>
      
      <div className="services-section__container">
        <h2 ref={titleRef} className="services-section__title">
          Nuestros <span>servicios</span>
        </h2>
        
        <p ref={subtitleRef} className="services-section__subtitle">
          Nuestros equipos en <strong>Canarias</strong> y{" "}
          <strong>Madrid</strong>. Nuestros servicios donde los necesites.
        </p>
        
        <div ref={gridRef} className="services-section__grid">
          {categoriesList.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              name={service.name}
              description={service.description as any}
              imageUrl={service.imageUrl}
            />
          ))}
        </div>
      </div>

      <div className="services-section__marquee-container">
        <div className="services-section__marquee-track">
          <div className="services-section__marquee-text">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i}>OUR WORK&nbsp;</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;