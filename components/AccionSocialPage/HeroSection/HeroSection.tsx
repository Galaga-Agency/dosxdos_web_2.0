"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import "./HeroSection.scss";

interface HeroSectionProps {
  onImageLoad?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onImageLoad }) => {
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
    <div className="accion-social-hero">
      <div className="accion-social-hero__bg-container featured-image-container">
        <div 
          ref={imageRef}
          className={`accion-social-hero__image-wrapper featured-image-wrapper hero-image-wrapper ${
            imageLoaded ? 'loaded' : 'loading'
          }`}
        >
          <Image
            src="/assets/img/about-us-page/vicente-ferrer-illustration.avif"
            alt="Acción Social"
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

        <div className="accion-social-hero__overlay"></div>

        <div className="accion-social-hero__content container">
          <h3 className="accion-social-hero__label label">
            (COMPROMISO QUE TRANSFORMA)
          </h3>

          <h2 className="accion-social-hero__title title text-1">
            Un diseño que también
          </h2>
          <h2 className="accion-social-hero__title title text-2">
            <span>transforma comunidades y entorno</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;