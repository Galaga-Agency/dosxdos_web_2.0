"use client";

import React, { useEffect, useRef } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { animateAccionSocialCTASection } from "@/utils/animations/accion-social-page-anim";
import "./AccionSocialCTASection.scss";

const AccionSocialCTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        animateAccionSocialCTASection({
          section: sectionRef.current,
          content: contentRef.current,
          title: titleRef.current,
          text: textRef.current,
          decor: decorRef.current,
        });
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} className="accion-social-cta-section">
      <div className="accion-social-cta-section__container">
        <div ref={contentRef} className="accion-social-cta-section__glass-card">
          <div className="accion-social-cta-section__label">
            <span>NUESTRO EQUIPO</span>
          </div>

          <div className="accion-social-cta-section__content">
            <h2 ref={titleRef} className="accion-social-cta-section__title">
              <span className="word">Conoce</span>{" "}
              <span className="word">a</span> <span className="word">las</span>{" "}
              <span className="word highlight">
                personas detrás de nuestra misión
              </span>
            </h2>

            <p ref={textRef} className="accion-social-cta-section__subtitle">
              Descubre al equipo de profesionales que hacen posible nuestras
              iniciativas sociales y ambientales, y aprende más sobre cómo
              trabajamos para crear un impacto positivo en nuestro entorno.
            </p>
          </div>

          <div className="accion-social-cta-section__action">
            <PrimaryButton href="/sobre-nosotros/equipo" size="large">
              Conocer al Equipo
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccionSocialCTASection;
