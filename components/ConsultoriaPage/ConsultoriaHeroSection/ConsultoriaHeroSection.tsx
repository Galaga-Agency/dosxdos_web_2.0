"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import "./ConsultoriaHeroSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

interface ConsultoriaHeroSectionProps {
  onImagesLoad?: () => void;
}

const ConsultoriaHeroSection: React.FC<ConsultoriaHeroSectionProps> = ({
  onImagesLoad,
}) => {
  const { isMobile } = useDeviceDetect();
  const [loadedImages, setLoadedImages] = useState(new Set<number>());
  const totalImages = 4; // 1 main + 3 floating images

  const handleImageLoad = useCallback(
    (imageIndex: number) => {
      setLoadedImages((prev) => {
        const newSet = new Set(prev);
        newSet.add(imageIndex);

        // Check if all images are loaded
        if (newSet.size === totalImages && onImagesLoad) {
          setTimeout(onImagesLoad, 50);
        }

        return newSet;
      });
    },
    [onImagesLoad, totalImages]
  );

  return (
    <>
      <div className="consultoria-hero-section">
        {/* Title and content above the image */}
        <div className="consultoria-hero-section__content container">
          <h3 className="consultoria-hero-section__label label ">
            (Diseñamos soluciones con propósito)
          </h3>
          <h1 className="consultoria-hero-section__title title char-animation">
            Consultoría creativa y estratégica.
          </h1>
        </div>

        <div className="consultoria-hero-section__image-container featured-image-container">
          <div
            className={`consultoria-hero-section__image-wrapper fade-in-scale featured-image-wrapper hero-image-wrapper ${
              loadedImages.has(0) ? "loaded" : "loading"
            }`}
          >
            <Image
              src="/assets/img/servicios/consultoria/header.webp"
              alt="Consultoría dosxdos"
              fill
              priority
              quality={100}
              onLoad={() => handleImageLoad(0)}
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
          <h3 className="consultoria-hero-section__description small-title">
            Acompañamos a marcas y organizaciones en la definición de sus
            espacios, campañas y procesos, uniendo visión comercial,
            sostenibilidad y creatividad.
          </h3>

          {!isMobile ? (
            <div className="consultoria-hero-section__columns">
              <div className="consultoria-hero-section__column">
                <p className="consultoria-hero-section__column-text text">
                  Partimos del análisis para llegar a la acción. Nuestra
                  consultoría combina auditoría, estrategia y acompañamiento
                  operativo para ayudarte a tomar decisiones fundamentadas y
                  construir marcas, espacios y experiencias con propósito.
                  Entendemos cada proyecto como un reto único, por eso adaptamos
                  nuestro enfoque a tus necesidades reales, involucrándonos
                  desde
                </p>
              </div>

              <div className="consultoria-hero-section__column">
                <p className="consultoria-hero-section__column-text text">
                  el diagnóstico hasta la implementación. Investigamos,
                  preguntamos, escuchamos y proponemos: todo en estrecha
                  colaboración contigo. Aportamos una visión externa, creativa y
                  crítica, pero también compromiso operativo y capacidad de
                  ejecución. Nuestro objetivo es generar impacto tangible,
                  medible y alineado con los objetivos de tu negocio.
                </p>
              </div>
            </div>
          ) : (
            <div className="consultoria-hero-section__columns">
              <div className="consultoria-hero-section__column">
                <p className="consultoria-hero-section__column-text text">
                  Partimos del análisis para llegar a la acción. Nuestra
                  consultoría combina auditoría, estrategia y acompañamiento
                  operativo para ayudarte a tomar decisiones fundamentadas y
                  construir marcas, espacios y experiencias con propósito.
                  Entendemos cada proyecto como un reto único, por eso adaptamos
                  nuestro enfoque a tus necesidades reales, involucrándonos
                  desde el diagnóstico hasta la implementación.
                </p>
              </div>

              <div className="consultoria-hero-section__column">
                <p className="consultoria-hero-section__column-text text">
                  Investigamos, preguntamos, escuchamos y proponemos: todo en
                  estrecha colaboración contigo. Aportamos una visión externa,
                  creativa y crítica, pero también compromiso operativo y
                  capacidad de ejecución. Nuestro objetivo es generar impacto
                  tangible, medible y alineado con los objetivos de tu negocio.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="random-images">
        {/* Floating Images */}
        {[1, 2, 3].map((_, i) => {
          const imgSrc = `/assets/img/servicios/consultoria/consultoria-${
            i + 1
          }.webp`;
          const imageIndex = i + 1; // 1, 2, 3 for floating images

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
              } featured-image-container`}
              data-speed={containerSpeed}
            >
              <div
                className={`random-images__inner-container featured-image-wrapper hero-image-wrapper ${
                  loadedImages.has(imageIndex) ? "loaded" : "loading"
                }`}
                data-speed={innerSpeed}
              >
                <Image
                  src={imgSrc}
                  alt={`Consultoría ${i + 1}`}
                  fill
                  priority
                  unoptimized={true}
                  quality={100}
                  onLoad={() => handleImageLoad(imageIndex)}
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
