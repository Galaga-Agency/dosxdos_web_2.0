"use client";

import React, { useRef } from "react";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import "./SustainabilityImagesSection.scss";

const SustainabilityImagesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Sample data for the hover cards
  const sustainabilityCards = [
    {
      id: "sustainability-1",
      title: "Materiales Sostenibles",
      description:
        "Utilizamos materiales eco-friendly y reciclados en nuestros proyectos de diseño.",
      imageUrl: "/assets/img/about-us-page/yrichen-illustration.webp",
      linkUrl: "/sobre-nosotros/accion-social",
      linkText: "Conocer más",
    },
    {
      id: "sustainability-2",
      title: "Eficiencia Energética",
      description:
        "Diseñamos espacios que optimizan el uso de recursos naturales y reducen el consumo energético.",
      imageUrl: "/assets/img/about-us-page/vicente-ferrer-illustration.jpg",
      linkUrl: "/sobre-nosotros/accion-social",
      linkText: "Conocer más",
    },
    {
      id: "sustainability-3",
      title: "Economía Circular",
      description:
        "Promovemos prácticas que extienden la vida útil de los materiales y reducen desperdicios.",
      imageUrl: "/assets/img/about-us-page/mil-caminos-illustration.jpg",
      linkUrl: "/sobre-nosotros/accion-social",
      linkText: "Conocer más",
    },
  ];

  return (
    <section ref={sectionRef} className="sustainability-images-section">
      <div className="sustainability-images-section__container">
        <div className="sustainability-images-section__cards">
          {sustainabilityCards.map((card) => (
            <HoverCard
              key={card.id}
              id={card.id}
              imageUrl={card.imageUrl}
              showLink={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SustainabilityImagesSection;
