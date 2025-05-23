"use client";

import React from "react";
import "./PortfolioCTA.scss";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import Link from "next/link";

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
          <span className="portfolio-cta__label">EXPERIENCIA EN DISEÑO</span>
          <span className="portfolio-cta__label">ESTUDIO CREATIVO</span>
        </div>
        <h2 className="portfolio-cta__title char-animation"><Link href="/contacto">CONTÁCTANOS</Link></h2>
        <PrimaryButton href="/contacto" className="portfolio-cta__button">
          Hablamos →
        </PrimaryButton>
      </div>
    </div>
  );
};

export default PortfolioCTA;
