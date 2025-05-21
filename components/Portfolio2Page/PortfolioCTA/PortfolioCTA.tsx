"use client";

import React from "react";
import "./PortfolioCTA.scss";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";

const PortfolioCTA: React.FC = () => {
  return (
    <div className="portfolio-cta">
      <div className="portfolio-cta__container">
        <div className="portfolio-cta__more-button">
          <HoverCircleButton
            href="/portfolio/mas-proyectos"
            label={"Más\nProyectos"}
          />
        </div>
        <div className="portfolio-cta__top-labels">
          <span className="portfolio-cta__label">
            EXPERIENCIA EN DISEÑO DIGITAL
          </span>
          <span className="portfolio-cta__label">ESTUDIO CREATIVO</span>
        </div>
        <h2 className="portfolio-cta__title char-animation">CONTÁCTANOS</h2>
      </div>
    </div>
  );
};

export default PortfolioCTA;
