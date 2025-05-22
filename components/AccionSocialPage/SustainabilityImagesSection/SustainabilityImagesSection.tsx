"use client";

import React, { useRef } from "react";
import Image from "next/image";
import "./SustainabilityImagesSection.scss";

const SustainabilityImagesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Sample data for the images
  const sustainabilityImages = [
    {
      id: "sustainability-1",
      alt: "Materiales Sostenibles",
      imageUrl: "/assets/img/about-us-page/yrichen-illustration.webp",
    },
    {
      id: "sustainability-2",
      alt: "Eficiencia Energética",
      imageUrl: "/assets/img/about-us-page/vicente-ferrer-illustration.jpg",
    },
    {
      id: "sustainability-3",
      alt: "Economía Circular",
      imageUrl: "/assets/img/about-us-page/mil-caminos-illustration.jpg",
    },
  ];

  return (
    <section ref={sectionRef} className="sustainability-images-section">
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
