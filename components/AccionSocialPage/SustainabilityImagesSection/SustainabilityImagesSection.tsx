"use client";

import React, { useRef } from "react";
import Image from "next/image";
import "./SustainabilityImagesSection.scss";

const SustainabilityImagesSection: React.FC = () => {

  const sustainabilityImages = [
    {
      id: 1,
      alt: "Materiales Sostenibles",
      imageUrl: "/assets/img/about-us-page/placas-solares.webp",
    },
    {
      id: 2,
      alt: "Eficiencia Energética",
      imageUrl: "/assets/img/about-us-page/materiales.webp",
    },
    {
      id: 3,
      alt: "Economía Circular",
      imageUrl: "/assets/img/about-us-page/recorrido.webp",
    },
  ];

  return (
    <section className="sustainability-images-section">
      <div className="sustainability-images-section__container">
        <div className="sustainability-images-section__images">
          {sustainabilityImages.map((image) => (
            <div
              key={image.id}
              className="sustainability-images-section__image-wrapper"
            >
              <Image
                src={image.imageUrl}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                className="sustainability-images-section__image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SustainabilityImagesSection;
