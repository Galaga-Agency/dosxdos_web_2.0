"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import "./ComunicacionProcessSection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

interface ComunicacionProcessSectionProps {
  onImagesLoad?: () => void;
}

const ComunicacionProcessSection: React.FC<ComunicacionProcessSectionProps> = ({
  onImagesLoad,
}) => {
  const [loadedImages, setLoadedImages] = useState(new Set<number>());
  const totalImages = 2;

  const { isMobile } = useDeviceDetect();

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
    <div className="comunicacion-process">
      <div className="comunicacion-process__container container">
        <div className="comunicacion-process__header">
          <h2 className="comunicacion-process__title small-title">
            Hay marcas que se abren paso en el mercado, y otras que logran&nbsp;
            <span className="highlight">quedarse en la memoria.</span>
            <br /> Nuestro trabajo empieza cuando una marca quiere hacer ambas
            cosas.
          </h2>
        </div>
      </div>

      <div className="comunicacion-floating-images">
        {[0, 1].map((i) => {
          const imgSrc =
            i === 0
              ? "/assets/img/servicios/comunicacion/comunicacion-1.avif"
              : "/assets/img/servicios/comunicacion/comunicacion-2.avif";

          const containerSpeed = isMobile ? "1" : i === 0 ? "1.2" : "0.9";
          const innerSpeed = i === 0 ? "0.8" : "1.1";

          return (
            <div
              key={i}
              className={`comunicacion-floating-images__container comunicacion-floating-images__container--${
                i + 1
              } featured-image-container`}
              data-speed={containerSpeed}
            >
              <div
                className={`comunicacion-floating-images__inner-container featured-image-wrapper ${
                  loadedImages.has(i) ? "loaded" : "loading"
                }`}
                data-speed={innerSpeed}
              >
                <Image
                  src={imgSrc}
                  alt={`Comunicación ${i + 1}`}
                  fill
                  priority
                  unoptimized={true}
                  quality={100}
                  onLoad={() => handleImageLoad(i)}
                  className="comunicacion-floating-images__img"
                  sizes="(min-width: 1024px) 80vw, (min-width: 768px) 60vw, 90vw"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComunicacionProcessSection;
