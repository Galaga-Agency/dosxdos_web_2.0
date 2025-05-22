"use client";

import React, { useRef } from "react";
import Image from "next/image";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import "./AccionSocialCTASection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const AccionSocialCTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useDeviceDetect();

  return (
    <section ref={sectionRef} className="cta-section">
      <div className="cta-section__container">
        {/* Header section */}
        <div className="cta-section__header">
          <div className="cta-section__label fade_left">
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
          <div
            className="cta-section__visual-column"
            data-speed={isMobile ? "0" : "1.3"}
          >
            <div className="cta-section__image-wrapper">
              <Image
                src="/assets/img/team/dospodos_personal_oficina-3.webp"
                alt="Equipo Dos Por Dos"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                width={800}
                height={600}
                quality={90}
              />
            </div>
          </div>

          {/* Right column with content */}
          <div className="cta-section__content-column">
            <div className="cta-section__text">
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

            <div className="cta-section__cta">
              <HoverCircleButton
                href="/sobre-nosotros/equipo"
                label="Conocer al Equipo"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccionSocialCTASection;
