"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import "./HeroSection.scss";

interface HeroSectionProps {
  onImagesLoad?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onImagesLoad }) => {
  const [loadedImages, setLoadedImages] = useState(new Set<number>());
  const totalImages = 4; // 1 main + 3 floating images

  // Simple function to check if we're on a mobile device
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleImageLoad = useCallback((imageIndex: number) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(imageIndex);
      
      // Check if all images are loaded
      if (newSet.size === totalImages && onImagesLoad) {
        setTimeout(onImagesLoad, 50);
      }
      
      return newSet;
    });
  }, [onImagesLoad, totalImages]);

  return (
    <>
      <div className="hero-section">
        <div className="hero-section__image-container featured-image-container">
          <div
            className={`hero-section__image-wrapper fade-in-scale featured-image-wrapper hero-image-wrapper ${
              loadedImages.has(0) ? 'loaded' : 'loading'
            }`}
            data-speed={isMobile ? "1" : "0.9"}
          >
            <Image
              src="/assets/img/team/dospodos_personal_oficina-3.webp"
              alt="Equipo dosxdos"
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
            />
          </div>

          <div className="hero-section__overlay"></div>

          <div className="hero-section__content container">
            <h3 className="hero-section__label label fade_bottom">(SOBRE NOSOTROS)
            </h3>
            <h1 className="hero-section__title title char-animation">
              Todo empieza con una idea. <br /> Lo demás, nos encargamos nosotros.
            </h1>
          </div>
        </div>
      </div>

      <div className="random-images">
        {/* Floating Images */}
        {[1, 2, 3].map((_, i) => {
          const imgSrc = `/assets/img/about-us-page/equipo-${i + 1}.avif`;
          const imageIndex = i + 1; // 1, 2, 3 for floating images

          // Set different speeds based on image index
          const containerSpeed = isMobile
            ? "1"
            : i === 0
            ? "1.3"
            : i === 1
            ? "0.9"
            : "1.1";

          const innerSpeed = i === 0 ? "1.1" : i === 1 ? "0.8" : "0.9";

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
                  loadedImages.has(imageIndex) ? 'loaded' : 'loading'
                }`}
                data-speed={innerSpeed}
              >
                <Image
                  src={imgSrc}
                  alt={`Fiesta ${i + 1}`}
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

export default HeroSection;