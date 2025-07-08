"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import "./EventosHeroSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

interface EventosHeroSectionProps {
  onImagesLoad?: () => void;
}

const EventosHeroSection: React.FC<EventosHeroSectionProps> = ({
  onImagesLoad,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { isMobile } = useDeviceDetect();

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);

    // Notify the parent page that image is ready
    if (onImagesLoad) onImagesLoad();
  }, [onImagesLoad]);

  return (
    <div className="eventos-hero">
      <div className="eventos-hero__container featured-image-container">
        <div className="eventos-hero__image-wrapper featured-image-wrapper hero-image-wrapper">
          <Image
            src="/assets/img/servicios/eventos/header-eventos.webp"
            alt="Eventos - Dos por Dos"
            fill
            priority
            sizes="100vw"
            className="eventos-hero__image"
            onLoad={handleImageLoad}
            quality={90}
          />
        </div>
      </div>

      <div className="eventos-hero__content">
        <div className="eventos-hero__text">
          <h3 className="eventos-hero__label label">
            (Soluciones completas hechas a medida.)
          </h3>
          <h1 className="eventos-hero__title title char-animation">
            Diseñamos lo que se ve. <br /> Ejecutamos lo que se vive.
          </h1>
        </div>
      </div>
      {/* <div className="eventos-methodology-section__below-image">
        <div
          className="eventos-methodology-section__below-image-container"
          data-speed={isMobile ? "0" : "0.95"}
        >
          <Image
            src="/assets/img/servicios/eventos/horizontal-segunda-eventos.webp"
            alt="Metodología de eventos"
            width={500}
            height={500}
          />
        </div>
      </div> */}
    </div>
  );
};

export default EventosHeroSection;
