"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import "./DisenoInterioresHeroSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

interface DisenoInterioresHeroSectionProps {
  onImagesLoad?: () => void;
}

const DisenoInterioresHeroSection: React.FC<DisenoInterioresHeroSectionProps> = ({ onImagesLoad }) => {
  const { isMobile } = useDeviceDetect();
  const [loadedImages, setLoadedImages] = useState(new Set<number>());
  const totalImages = 2; // Main + floating image

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
    <div className="diseno-interiores-hero">
      <div className="diseno-interiores-hero__bg-container featured-image-container">
        <div className={`diseno-interiores-hero__image-wrapper featured-image-wrapper hero-image-wrapper ${
          loadedImages.has(0) ? 'loaded' : 'loading'
        }`}>
          <Image
            src="/assets/img/homepage/slider-1.webp"
            alt="Diseño de Interiores"
            fill
            quality={100}
            priority
            onLoad={() => handleImageLoad(0)}
          />
        </div>
        <div className="diseno-interiores-hero__overlay"></div>
        <div className="diseno-interiores-hero__content container">
          <h3 className="diseno-interiores-hero__label label">
            (Forma, función y emoción.)
          </h3>

          <h2 className="diseno-interiores-hero__title title text-1">
            Diseñamos espacios
          </h2>
          <h2 className="diseno-interiores-hero__title title text-2">
            <span>que conectan con las personas.</span>
          </h2>
        </div>
        <div className={`diseno-interiores-hero__floating-image-wrapper hero-image-wrapper ${
          loadedImages.has(1) ? 'loaded' : 'loading'
        }`}>
          <Image
            src="/assets/img/servicios/consultoria/consultoria-1.webp"
            alt="Consultoría dosxdos"
            width={600}
            height={400}
            priority
            quality={100}
            unoptimized={true}
            onLoad={() => handleImageLoad(1)}
            data-speed={isMobile ? "1" : "1.25"}
          />
        </div>
      </div>
    </div>
  );
};

export default DisenoInterioresHeroSection;