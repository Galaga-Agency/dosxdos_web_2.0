"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import "./ComunicacionHeroSection.scss";

interface ComunicacionHeroSectionProps {
  onImageLoad?: () => void;
}

const ComunicacionHeroSection: React.FC<ComunicacionHeroSectionProps> = ({
  onImageLoad,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    // Trigger animations after image is fully loaded
    if (onImageLoad) {
      // Small delay to ensure image is fully rendered
      setTimeout(onImageLoad, 50);
    }
  }, [onImageLoad]);

  return (
    <div className="comunicacion-hero">
      <div className="comunicacion-hero__bg-container featured-image-container">
        <div
          ref={imageRef}
          className={`comunicacion-hero__image-wrapper featured-image-wrapper hero-image-wrapper ${
            imageLoaded ? "loaded" : "loading"
          }`}
        >
          <Image
            src="/assets/img/servicios/comunicacion/header-comunicacion.avif"
            alt="Comunicación"
            fill
            quality={100}
            priority
            onLoad={handleImageLoad}
            onError={() => {
              console.error("Hero image failed to load");
              // Still trigger animations even if image fails
              handleImageLoad();
            }}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli2YY7jk/wB1OzN2+WV1OmT4BuLhR6wFpvGHrv1f6CqU\u003d\u003d"
          />
        </div>

        <div className="comunicacion-hero__overlay"></div>

        <div className="comunicacion-hero__content container">
          <h3 className="comunicacion-hero__label label">
            (Diseño, estrategia y digitalización para marcas que quieren
            avanzar.)
          </h3>

          <h2 className="comunicacion-hero__title title text-1">
            Comunicación
          </h2>
          <h2 className="comunicacion-hero__title title text-2">
            <span>que construye.</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ComunicacionHeroSection;
