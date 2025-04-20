"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import "./CTASection.scss";

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && contentRef.current) {
      // Decorative floating animations
      gsap.to(".cta-decor", {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Main section animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="cta-section">
      {/* Decorative elements */}
      <div className="cta-decor cta-decor-dot1"></div>
      <div className="cta-decor cta-decor-dot2"></div>
      <div className="cta-decor cta-decor-dot3"></div>
      <div className="cta-decor cta-decor-line1"></div>
      <div className="cta-decor cta-decor-line2"></div>

      <div className="container">
        <div ref={contentRef} className="cta-content glass-card">
          <div className="cta-text">
            <h2 className="cta-title">
              ¿Listo para comenzar <span>tu próximo proyecto</span>?
            </h2>
            <p className="cta-subtitle">
              Contáctanos hoy y descubre cómo podemos ayudarte a crear espacios
              con personalidad única.
            </p>
          </div>

          <div className="cta-action">
            <PrimaryButton href="/contacto" size="large" className="cta-button">
              Contáctanos
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
