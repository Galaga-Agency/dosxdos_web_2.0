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

const CollaborationsSection: React.FC = () => {
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    // Only initialize once
    if (!initialized.current) {
      // Clean up any existing ScrollTrigger instances first
      clearScrollTriggers();

      // Short timeout to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        panelTwoAnimation();
        initialized.current = true;
      }, 100);

      return () => {
        clearTimeout(timer);
        clearScrollTriggers();
      };
    }

    // Cleanup when component unmounts
    return () => {
      clearScrollTriggers();
    };
  }, []);

  return (
    <section className="latest-projects">
      {/* Header section with title and subtitle */}
      <div className="latest-projects__header-container">
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
            <div className="project-panel__image">
              <Image
                src={collaboration.illustration}
                alt={collaboration.title}
                width={1920}
                height={1080}
                className="project-panel__image-file"
                priority={collaboration.id === 1}
              />
              <div className="project-panel__overlay"></div>
              <div className="project-panel__logo">
                <Image
                  src={collaboration.image}
                  alt={`Logo de ${collaboration.title}`}
                  width={120}
                  height={80}
                  className="project-panel__logo-image"
                />
              </div>
            </div>

            <div className="project-panel__content">
              <h3 className="project-panel__title">{collaboration.title}</h3>
              <Link
                href={collaboration.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-panel__link"
              >
                Ver Colaboración
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollaborationsSection;
