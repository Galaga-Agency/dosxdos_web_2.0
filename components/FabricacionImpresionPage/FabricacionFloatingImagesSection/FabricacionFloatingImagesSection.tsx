"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import "./FabricacionFloatingImagesSection.scss";

interface FabricacionFloatingImagesSectionProps {
  onImagesLoad?: () => void;
}

const FabricacionFloatingImagesSection: React.FC<
  FabricacionFloatingImagesSectionProps
> = ({ onImagesLoad }) => {
  const [loadedImages, setLoadedImages] = useState(new Set<number>());
  const totalImages = 3;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleImageLoad = useCallback(
    (imageIndex: number) => {
      setLoadedImages((prev) => {
        const newSet = new Set(prev);
        newSet.add(imageIndex);

        if (newSet.size === totalImages && onImagesLoad) {
          setTimeout(onImagesLoad, 50);
        }

        return newSet;
      });
    },
    [onImagesLoad, totalImages]
  );

  return (
    <section className="fabricacion-floating-images">
      <div className="fabricacion-floating-images__container container">
        <div className="fabricacion-floating-images__grid">
          {/* Left container with absolutely positioned images */}
          <div className="fabricacion-floating-images__left">
            {/* Small image - top left */}
            <div
              className="fabricacion-floating-images__small-top"
              data-speed={isMobile ? "1" : "0.9"}
            >
              <Image
                src="/assets/img/about-us-page/equipo-1.avif"
                alt="Elementos de diseño"
                fill
                quality={100}
                onLoad={() => handleImageLoad(1)}
              />
            </div>

            {/* Medium image - bottom left */}
            <div
              className="fabricacion-floating-images__medium-bottom"
              data-speed={isMobile ? "1" : "1.05"}
            >
              <Image
                src="/assets/img/about-us-page/equipo-2.avif"
                alt="Equipo trabajando"
                fill
                quality={100}
                onLoad={() => handleImageLoad(2)}
              />
            </div>
          </div>

          {/* Large image - right side */}
          <div
            className="fabricacion-floating-images__large-right"
            data-speed={isMobile ? "1" : "1.1"}
          >
            <Image
              src="/assets/img/about-us-page/equipo-3.avif"
              alt="Espacio comercial moderno"
              fill
              priority
              quality={100}
              onLoad={() => handleImageLoad(3)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FabricacionFloatingImagesSection;
