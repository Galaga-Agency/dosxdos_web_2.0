"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animateServiciosHero } from "@/utils/animations/pages/servicios-page-anim";
import "./ServiciosHero.scss";

const ServiciosHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("ServiciosHero mounted");
    
    if (sectionRef.current && titleRef.current) {      
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        animateServiciosHero({
          section: sectionRef.current,
          title: titleRef.current,
          subtitle: subtitleRef.current,
          button: buttonRef.current,
        });
      }, 1500);
    } else {
      console.error("Required refs not available");
    }

    return () => {
      console.log("ServiciosHero unmounting");
    };
  }, []);

  // Debug rendering
  console.log("ServiciosHero rendering");

  return (
    <section ref={sectionRef} className="servicios-hero">
      <div className="servicios-hero__container">
        <h1 ref={titleRef} className="servicios-hero__title char-animation">
          <span className="experience">Experience</span> 
          <span className="plus">+</span> 
          <span className="creatividad">Creativity</span>
        </h1>
        
        <p ref={subtitleRef} className="servicios-hero__subtitle">
          We're an innovative global ui/ux design agency building high-end products 
          and experiences that grow your business exponentially.
        </p>
        
        <div ref={buttonRef} className="servicios-hero__button-wrapper">
          <Link href="/portfolio" className="servicios-hero__button">
            View Our Works →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiciosHero;