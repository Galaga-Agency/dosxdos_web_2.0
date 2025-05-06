"use client";

import React, { useEffect, useRef } from "react";
import { animateCTASection } from "@/utils/animations/pages/equipo-page-anim";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import "./CTASection.scss";

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      animateCTASection({
        section: sectionRef.current,
        content: contentRef.current,
        title: titleRef.current,
        text: textRef.current,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="cta-section" ref={sectionRef}>
      <div className="cta-section__container">
        <div ref={contentRef} className="cta-section__content">
          <div className="cta-section__label">ACCIÓN SOCIAL</div>

          <h2 ref={titleRef} className="cta-section__title">
            Nuestro <span className="highlight">Compromiso</span>
          </h2>

          <p ref={textRef} className="cta-section__description">
            Más allá de los proyectos comerciales, creemos en el impacto social.
            Cada proyecto es una oportunidad para contribuir positivamente a
            nuestra comunidad y generar un cambio significativo.
          </p>

          <div ref={ctaRef} className="cta-section__actions">
            <PrimaryButton
              href="/sobre-nosotros/accion-social"
              size="large"
            >
              Descubre Nuestra Labor Social
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;