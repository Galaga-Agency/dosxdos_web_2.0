"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import "./MontajeMantenimientoHeroSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

interface MontajeMantenimientoHeroSectionProps {
  onImagesLoad?: () => void;
}

const MontajeMantenimientoHeroSection: React.FC<
  MontajeMantenimientoHeroSectionProps
> = ({ onImagesLoad }) => {
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
      <div className="montaje-mantenimiento-hero-section">
        {/* Title and content above the image */}
        <div className="montaje-mantenimiento-hero-section__content container">
          <h3 className="montaje-mantenimiento-hero-section__label label ">
            (Del diseño a la realidad… y su cuidado en el tiempo)
          </h3>
          <h1 className="montaje-mantenimiento-hero-section__title title char-animation">
            Montaje y
            mantenimiento.
          </h1>
        </div>

        <div className="montaje-mantenimiento-hero-section__image-container featured-image-container">
          <div
            className={`montaje-mantenimiento-hero-section__image-wrapper fade-in-scale featured-image-wrapper hero-image-wrapper ${
              loadedImages.has(0) ? "loaded" : "loading"
            }`}
          >
            <Image
              src="/assets/img/servicios/montaje-mantenimiento/header.avif"
              alt="Montaje y mantenimiento dosxdos"
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
              data-speed={isMobile ? "1" : ".85"}
            />
          </div>
          <div className="montaje-mantenimiento-hero-section__overlay"></div>
        </div>

        <div className="montaje-mantenimiento-hero-section__bottom-content container">
          <h3 className="montaje-mantenimiento-hero-section__description small-title">
            Diseñar bien es importante. <br />
            Ejecutar con precisión y cuidar lo instalado, lo es todavía más.
          </h3>

          <div className="montaje-mantenimiento-hero-section__columns">
            <div className="montaje-mantenimiento-hero-section__column">
              <p className="montaje-mantenimiento-hero-section__column-text text">
                Acompañamos a nuestros clientes más allá de la entrega del
                proyecto: nos ocupamos del montaje completo y del mantenimiento
                continuo de los espacios,
              </p>
            </div>

            <div className="montaje-mantenimiento-hero-section__column">
              <p className="montaje-mantenimiento-hero-section__column-text text">
                asegurando que cada detalle funcione, esté en su sitio y
                mantenga el impacto que se pensó desde el inicio.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="random-images">
        {/* Floating Images */}
        {[1, 2, 3].map((_, i) => {
          const imgSrc = `/assets/img/servicios/montaje-mantenimiento/montaje-${
            i + 1
          }.avif`;
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
                  alt={`Montaje y mantenimiento ${i + 1}`}
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

export default MontajeMantenimientoHeroSection;
