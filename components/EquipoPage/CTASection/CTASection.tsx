"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import "./CTASection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const CTASection: React.FC = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <section className="cta-section">
      <div className="cta-section__container">
        {/* Header section */}
        <div className="cta-section__header">
          <div className="cta-section__label">
            <span>Acción Social</span>
          </div>

          <h2 className="cta-section__title fade_bottom">
            DISEÑO CON CONCIENCIA. COMPROMISO CON <span className="highlight">IMPACTO</span>
          </h2>
        </div>

        {/* Content section with two columns */}
        <div className="cta-section__content">
          {/* Left column with text and button */}
          <div className="cta-section__text-column">
            <div className="cta-section__text">
              <p>
                Entendemos la acción social como una parte esencial de nuestro
                compromiso con la sociedad. A través de proyectos que promueven
                la inclusión, la sostenibilidad y el desarrollo, trabajamos para
                generar un impacto duradero. Porque crear valor también es crear
                oportunidades.
              </p>
            </div>

            {/* Button properly placed below text */}
            <div className="cta-section__cta">
              <HoverCircleButton
                href="/sobre-nosotros/accion-social"
                label="Nuestro Compromiso Social"
              />
            </div>
          </div>

          {/* Right column with image */}
          <div className="cta-section__image-column">
            <div
              className="cta-section__image-wrapper"
              data-speed={isMobile ? "0" : "1.15"}
            >
              <Image
                src="/assets/img/about-us-page/accion-social-cta.webp"
                alt="Acción Social"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="cta-section__image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
