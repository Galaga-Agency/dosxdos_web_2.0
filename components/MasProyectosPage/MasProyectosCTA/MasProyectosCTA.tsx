"use client";

import React from "react";
import Link from "next/link";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import "./MasProyectosCTA.scss";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";

interface MasProyectosCTAProps {
  ctaSectionRef: React.RefObject<HTMLDivElement>;
  ctaTextRef: React.RefObject<HTMLHeadingElement>;
  ctaButtonRef: React.RefObject<HTMLDivElement>;
}

const MasProyectosCTA: React.FC<MasProyectosCTAProps> = ({
  ctaSectionRef,
  ctaTextRef,
  ctaButtonRef,
}) => {
  return (
    <div className="mas-proyectos-cta" ref={ctaSectionRef}>
      <div className="mas-proyectos-cta__marquee">
        <div className="mas-proyectos-cta__marquee-inner">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i}>
              <span>DISEÑO DE INTERIORES</span>
              <span className="dot">•</span>
              <span>ESPACIOS COMERCIALES</span>
              <span className="dot">•</span>
              <span>EXPERIENCIAS VISUALES</span>
              <span className="dot">•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mas-proyectos-cta__container">
        <div className="mas-proyectos-cta__content">
          <span className="mas-proyectos-cta__label fade_bottom">
            ESTUDIO CREATIVO
          </span>
          <h2
            className="mas-proyectos-cta__title char-animation"
            ref={ctaTextRef}
          >
            ¿LISTO PARA CREAR
            <br />
            <span className="mas-proyectos-cta__title-row-2">
              TU ESPACIO ÚNICO?
            </span>
          </h2>
          <p className="mas-proyectos-cta__text fade_left">
            Más de 35 años de experiencia en el sector del diseño de interiores
            en espacios comerciales y puntos de venta.
          </p>
          <div
            className="mas-proyectos-cta__button-container"
            ref={ctaButtonRef}
          >
            <PrimaryButton href="/contacto" className="button">
              <span className="button-text">Contáctanos</span>
            </PrimaryButton>
            <SecondaryButton
              href="/servicios"
              className="button"
              lightBg={true}
            >
              Conoce nuestros servicios
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasProyectosCTA;
