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
  const initialized = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const collaborationsRef = useRef<HTMLDivElement>(null);

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
    <section className="latest-collaborations" ref={sectionRef}>
      {/* Header section with title and subtitle */}
      <div className="latest-collaborations__header-container">
        <div className="latest-collaborations__header">
          <h2 ref={titleRef} className="latest-collaborations__title">
            FUNDACIONES <span className="highlight">COLABORADORAS</span>
          </h2>
          <p ref={subtitleRef} className="latest-collaborations__subtitle">
            Nuestro compromiso social con organizaciones que marcan la
            diferencia
          </p>
        </div>
      </div>

      {/* Collaborations panel area */}
      <div className="latest-collaborations__panels" ref={collaborationsRef}>
        {collaborationData.map((collaboration) => (
          <div key={collaboration.id} className="collaboration-panel">
            <div className="collaboration-panel__illustration-container">
              <div
                className="collaboration-panel__illustration"
                style={{
                  backgroundImage: `url(${collaboration.illustration})`,
                }}
              >
                <div className="collaboration-panel__logo-container">
                  <Image
                    src={collaboration.image}
                    alt={`${collaboration.title} logo`}
                    width={120}
                    height={80}
                    className="collaboration-panel__logo"
                  />
                </div>
              </div>
            </div>
            <div className="collaboration-panel__content">
              <h3 className="collaboration-panel__title">
                {collaboration.title}
              </h3>
              <p className="collaboration-panel__description">
                {collaboration.description}
              </p>
              <Link
                href={collaboration.link}
                target="_blank"
                rel="noopener noreferrer"
                className="collaboration-panel__link"
              >
                Ver Colaboración
                <span className="collaboration-panel__link-arrow">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollaborationsSection;
