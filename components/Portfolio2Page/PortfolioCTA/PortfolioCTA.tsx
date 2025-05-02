"use client";

import React from "react";
import "./PortfolioCTA.scss";
import Link from "next/link";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

interface PortfolioCTAProps {
  ctaSectionRef: React.RefObject<HTMLDivElement> | null;
  ctaTextRef: React.RefObject<HTMLHeadingElement> | null;
  ctaButtonRef: React.RefObject<HTMLDivElement> | null;
}

const PortfolioCTA: React.FC<PortfolioCTAProps> = ({
  ctaSectionRef,
  ctaTextRef,
  ctaButtonRef,
}) => {
  return (
    <div className="portfolio-cta" ref={ctaSectionRef}>
      <div className="portfolio-cta__container">
        <div className="portfolio-cta__more-button">
          <HoverCircleButton href="/portfolio/all" label={"More\nProjects"} />
        </div>
        <div className="portfolio-cta__top-labels">
          <span className="portfolio-cta__label">
            DIGITAL DESIGN EXPERIENCE
          </span>
          <span className="portfolio-cta__label">CREATIVE STUDIO</span>
        </div>
        <h2 className="portfolio-cta__title char-animation" ref={ctaTextRef}>
          GET IN TOUCH
        </h2>
        <div className="portfolio-cta__content" ref={ctaButtonRef}>
          <PrimaryButton href="/contacto" className="portfolio-cta__button">
            <span>Contáctanos</span>
            <span className="arrow">→</span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCTA;
