"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import "./SloganSection.scss";

const SloganSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Simple fade-in animation
    gsap.fromTo(
      ".slogan-wrapper",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    );

    // Floating animation for decorative elements
    gsap.to(".slogan-decor", {
      y: -8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    });
  }, []);

  return (
    <section ref={sectionRef} className="slogan-section">
      {/* Decorative elements */}
      <div className="slogan-decor decor-dot1"></div>
      <div className="slogan-decor decor-dot2"></div>
      <div className="slogan-decor decor-line1"></div>
      <div className="slogan-decor decor-line2"></div>
      <div className="slogan-decor decor-dot3"></div>

      <div className="container">
        <div className="slogan-wrapper" ref={contentRef}>
          {/* Text content */}
          <div className="slogan-text">
            <h2 className="slogan-main">
              Diseño, distribución del espacio,{" "}
              <span>gráfica, producción digital</span>
            </h2>
            <p className="slogan-subtitle">
              planos técnicos, fabricación e implantación{" "}
              <span>en el punto de venta.</span>
            </p>
          </div>

          {/* Original image - using regular img tag instead of Next Image */}
          <div className="slogan-image-container">
            <img
              src="/assets/img/homepage/slogan-35.png"
              alt="Espacios que Inspiran"
              className="slogan-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SloganSection;
