"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import "./FabricacionImpresionHeroSection.scss";

interface FabricacionImpresionHeroSectionProps {
  onImagesLoad?: () => void;
}

const FabricacionImpresionHeroSection: React.FC<
  FabricacionImpresionHeroSectionProps
> = ({ onImagesLoad }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);

    // Notify the parent page that image is ready
    if (onImagesLoad) onImagesLoad();
  }, [onImagesLoad]);

  return (
    <div className="fabricacion-hero">
      <div className="fabricacion-hero__container featured-image-container">
        <div className="fabricacion-hero__image-wrapper featured-image-wrapper hero-image-wrapper">
          <Image
            src="/assets/img/servicios/fabricacion-impresion/header.avif"
            alt="Fabricación e Impresión - Dos por Dos"
            fill
            priority
            sizes="100vw"
            className="fabricacion-hero__image"
            onLoad={handleImageLoad}
            quality={90}
          />
        </div>
      </div>

      <div className="fabricacion-hero__content">
        <div className="fabricacion-hero__text">
          <h3 className="fabricacion-hero__label label">
            (Fabricación e impresión)
          </h3>
          <h1 className="fabricacion-hero__title title char-animation">
            Diseño que se construye.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FabricacionImpresionHeroSection;
