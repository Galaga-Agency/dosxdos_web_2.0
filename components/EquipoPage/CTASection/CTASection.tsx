"use client";

import React, { useEffect, useRef } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { animateCTASection } from "@/utils/animations/equipo-page-anim";
import "./CTASection.scss";

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        animateCTASection({
          section: sectionRef.current,
          content: contentRef.current,
          title: titleRef.current,
          text: textRef.current,
          decor: decorRef.current
        });
      });
    }, 300);
  
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} className="cta-section">
      <div className="cta-section__decorative-elements" ref={decorRef}>
        <div className="cta-section__decor cta-section__decor-dots"></div>
        <div className="cta-section__decor cta-section__decor-line-1"></div>
        <div className="cta-section__decor cta-section__decor-line-2"></div>
        <div className="cta-section__decor cta-section__decor-circle"></div>
        <div className="cta-section__decor cta-section__decor-grid"></div>
      </div>

      <div className="cta-section__container">
        <div ref={contentRef} className="cta-section__glass-card">
          <div className="cta-section__label">
            <span>HABLEMOS</span>
          </div>
          
          <div className="cta-section__content">
            <h2 ref={titleRef} className="cta-section__title">
              <span className="word">¿Listo</span>{" "}
              <span className="word">para</span>{" "}
              <span className="word">comenzar</span>{" "}
              <span className="word highlight">tu próximo proyecto</span>?
            </h2>
            
            <p ref={textRef} className="cta-section__subtitle">
              Contáctanos hoy y descubre cómo podemos ayudarte a crear 
              espacios comerciales con personalidad única y experiencias 
              memorables para tus clientes.
            </p>
          </div>

          <div className="cta-section__action">
            <PrimaryButton href="/contacto" size="large">
              Contáctanos
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;