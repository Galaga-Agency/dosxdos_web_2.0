"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  panelTwoAnimation,
  clearScrollTriggers,
} from "@/utils/animations/panel-animation";
import "./CollaborationsSection.scss";
import { collaborationData } from "@/data/collaborations";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

const CollaborationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up any existing ScrollTrigger instances first
    clearScrollTriggers();
    
    // Short timeout to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      panelTwoAnimation();
      
      // Force refresh ScrollTrigger
      if (typeof window !== "undefined") {
        const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");
        if (ScrollTrigger && ScrollTrigger.refresh) {
          ScrollTrigger.refresh();
        }
      }
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="latest-projects">
      {/* Header section with title and subtitle */}
      <div className="latest-projects__header-container" ref={headerRef}>
        {/* Added corner elements for animation */}
        <div className="latest-projects__corner top-left"></div>
        <div className="latest-projects__corner bottom-right"></div>
        <div className="latest-projects__header">
          <h2 className="latest-projects__title">
            FUNDACIONES <span className="highlight">COLABORADORAS</span>
          </h2>
          <p className="latest-projects__subtitle">
            Nuestro compromiso social con organizaciones que marcan la
            diferencia
          </p>
        </div>
      </div>

      {/* Projects panel area */}
      <div className="project-panel-area">
        {collaborationData.map((collaboration) => (
          <div key={collaboration.id} className="project-panel">
            <div className="project-panel__split-container">
              <div className="project-panel__image-side">
                <Image
                  src={collaboration.illustration}
                  alt={collaboration.title}
                  fill
                  className="project-panel__image-file"
                  priority={collaboration.id === 1}
                />
                <div className="project-panel__logo">
                  <Image
                    src={collaboration.image}
                    alt={`Logo de ${collaboration.title}`}
                    width={180}
                    height={120}
                    className="project-panel__logo-image"
                  />
                </div>
              </div>

              <div className="project-panel__content-side">
                <div className="project-panel__content">
                  <h3 className="project-panel__title">
                    {collaboration.title}
                  </h3>
                  <p className="project-panel__description">
                    {collaboration.description}
                  </p>
                  <PrimaryButton
                    href={collaboration.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-panel__link"
                  >
                    Visitar Web Oficial
                    <span className="project-panel__link-arrow">→</span>
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollaborationsSection;