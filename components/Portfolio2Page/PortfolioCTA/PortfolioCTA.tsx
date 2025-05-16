// components/PortfolioCTA.tsx
"use client";

import React, { useEffect, useRef } from "react";
import "./PortfolioCTA.scss";
import Link from "next/link";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import useCursorBubble from "@/hooks/useCursorBubble";

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
  // Use our custom cursor bubble hook
  useCursorBubble([ctaTextRef], {
    text: "Contactar",
    backgroundColor: "#e63322", // Primary color
  });

  // Make the title clickable (optional)
  useEffect(() => {
    const titleElement = ctaTextRef?.current;
    if (titleElement) {
      titleElement.style.cursor = "pointer";

      const handleClick = () => {
        window.location.href = "/contacto";
      };

      titleElement.addEventListener("click", handleClick);

      return () => {
        titleElement.removeEventListener("click", handleClick);
      };
    }
  }, [ctaTextRef]);

  return (
    <div className="portfolio-cta" ref={ctaSectionRef}>
      <div className="portfolio-cta__container">
        <div className="portfolio-cta__more-button">
          <HoverCircleButton
            href="/portfolio-2/mas-proyectos"
            label={"More\nProjects"}
          />
        </div>
        <div className="portfolio-cta__top-labels">
          <span className="portfolio-cta__label">
            DIGITAL DESIGN EXPERIENCE
          </span>
          <span className="portfolio-cta__label">CREATIVE STUDIO</span>
        </div>
        <h2 className="portfolio-cta__title char-animation" ref={ctaTextRef}>
          CONTACTÁNOS
        </h2>
      </div>
    </div>
  );
};

export default PortfolioCTA;
