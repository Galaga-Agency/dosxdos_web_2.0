"use client";

import React from "react";
import Image from "next/image";
import "./ConsultoriaHeroSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const ConsultoriaHeroSection: React.FC = () => {
  const { isMobile } = useDeviceDetect();
  
  return (
    <>
      <div className="consultoria-hero-section">
        {/* Title and content above the image */}
        <div className="consultoria-hero-section__content container">
          <h3 className="consultoria-hero-section__label label fade_bottom">
            (Diseñamos soluciones con propósito)
          </h3>
          <h1 className="consultoria-hero-section__title title char-animation">
            Consultoría <br />
            creativa y estratégica.
          </h1>
        </div>

        <div className="consultoria-hero-section__image-container featured-image-container">
          <div className="consultoria-hero-section__image-wrapper fade-in-scale featured-image-wrapper">
            <Image
              src="/assets/img/servicios/consultoria/header.webp"
              alt="Consultoría dosxdos"
              fill
              priority
              quality={100}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                willChange: "transform",
              }}
              unoptimized={true}
              data-speed={isMobile ? "1" : ".75"}
            />
          </div>
          <div className="consultoria-hero-section__overlay"></div>
        </div>

        <div className="consultoria-hero-section__bottom-content  container">
          <p className="consultoria-hero-section__description small-title">
            Acompañamos a marcas y organizaciones en la definición de sus
            espacios, campañas y procesos, uniendo visión comercial,
            sostenibilidad y creatividad.
          </p>

          <div className="consultoria-hero-section__columns">
            <div className="consultoria-hero-section__column">
              <p className="consultoria-hero-section__column-text text">
                Partimos del análisis para llegar a la acción. Nuestro enfoque
                se adapta a cada cliente, combinando auditoría, estrategia y
                acompañamiento operativo.
              </p>
            </div>

            <div className="consultoria-hero-section__column">
              <p className="consultoria-hero-section__column-text text">
                Nos implicamos desde el diagnóstico hasta la implementación para
                generar impacto real, medible y alineado con tus objetivos de
                negocio.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="random-images">
        {/* Floating Images */}
        {[1, 2, 3].map((_, i) => {
          const imgSrc = `/assets/img/servicios/consultoria/consultoria-${
            i + 1
          }.webp`;

          const containerSpeed = isMobile
            ? "1"
            : i === 0
            ? "1.1"
            : i === 1
            ? "0.95"
            : "1.05";

          const innerSpeed = i === 0 ? "1.05" : i === 1 ? "0.98" : "1.02";

          return (
            <div
              key={i}
              className={`random-images__container random-images__container--${
                i + 1
              } fade_bottom featured-image-container`}
              data-speed={containerSpeed}
            >
              <div
                className="random-images__inner-container featured-image-wrapper"
                data-speed={innerSpeed}
              >
                <Image
                  src={imgSrc}
                  alt={`Consultoría ${i + 1}`}
                  fill
                  priority
                  unoptimized={true}
                  quality={100}
                  className="random-images__img"
                  sizes="(min-width: 1024px) 80vw, (min-width: 768px) 60vw, 90vw"
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ConsultoriaHeroSection;
