"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import {
  initFadeAnimations,
  initImageParallax,
} from "@/utils/animations/pages/accion-social-page-anim";
import "./AccionSocialCTASection.scss";

const AccionSocialCTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      setTimeout(() => {
        // Initialize fade animations
        initFadeAnimations();

        // Initialize parallax effect separately
        if (imageContainerRef.current && imageInnerRef.current) {
          initImageParallax(imageContainerRef.current, imageInnerRef.current);
        }
      }, 300);
    }
  }, []);

  return (
    <section ref={sectionRef} className="cta-section">
      <div className="cta-section__container">
        {/* Header section */}
        <div className="cta-section__header">
          <div className="cta-section__label fade_bottom">
            <span>NUESTRO EQUIPO</span>
          </div>

          <h2 className="cta-section__title fade_bottom">
            CONOCE A LAS PERSONAS
            <br />
            DETRÁS DE NUESTRA MISIÓN
          </h2>
        </div>

        {/* Content area with two columns */}
        <div className="cta-section__content">
          {/* Left column with image with parallax effect */}
          <div ref={imageContainerRef} className="cta-section__visual-column">
            <div ref={imageInnerRef} className="cta-section__animated-logo">
              <Image
                src="/assets/img/about-us-page/family.webp"
                alt="Equipo Dos Por Dos"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Right column with content */}
          <div className="cta-section__content-column">
            <div className="cta-section__text fade_bottom">
              <p>
                Con un gran equipo de más de 45 profesionales, formado por
                arquitectos, interioristas, diseñadores y expertos en producción
                e instalación, te acompañamos durante todo el proceso para crear
                espacios únicos con personalidad propia.
              </p>
              <p>
                Descubre al equipo de profesionales que hacen posible nuestros
                proyectos e iniciativas sociales, y aprende más sobre cómo
                trabajamos para crear un impacto positivo en cada espacio que
                diseñamos.
              </p>
            </div>

            <div className="cta-section__cta fade_bottom">
              <PrimaryButton href="/sobre-nosotros/equipo" size="medium">
                Conocer al Equipo
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccionSocialCTASection;
