"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./NuestrosClientesHeroSection.scss";

const NuestrosClientesHeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Set initial states to prevent visual glitches
    if (titleRef.current && subtitleRef.current) {
      // Hide elements initially
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 30,
      });

      // Set specific initial state for char animation elements
      const chars = titleRef.current.querySelectorAll(".char");
      if (chars.length > 0) {
        gsap.set(chars, {
          opacity: 0,
          y: 100,
          rotateX: -90,
        });
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className="nuestros-clientes-hero-section">
      <div className="nuestros-clientes-hero-section__container container">
        <div className="nuestros-clientes-hero-section__header header">
          <h1
            ref={titleRef}
            className="nuestros-clientes-hero-section__title title char-animation"
          >
            Marcas que <span className="highlight">confían en nosotros.</span>
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="nuestros-clientes-hero-section__subtitle text rollup-text"
        >
          Más de 38 años creando experiencias únicas para las mejores marcas del
          sector cosmético y perfumería.
        </p>
      </div>
    </section>
  );
};

export default NuestrosClientesHeroSection;
