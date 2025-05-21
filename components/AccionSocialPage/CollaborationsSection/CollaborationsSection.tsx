"use client";

import React, { useRef } from "react";
import Image from "next/image";
import "./CollaborationsSection.scss";
import { collaborationData } from "@/data/collaborations";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

const CollaborationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="collaborations-section">
      <div className="collaborations-section__header">
        <span className="collaborations-section__label fade_left">
          Compromiso Social
        </span>
        <h2 className="collaborations-section__title fade_bottom">
          FUNDACIONES COLABORADORAS
        </h2>
        <p className="collaborations-section__subtitle fade_bottom">
          Nuestro compromiso social con organizaciones que marcan la diferencia
        </p>
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
                <div className="project-panel__overlay"></div>
                <div className="project-panel__logo">
                  <Image
                    src={collaboration.image}
                    alt={`Logo de ${collaboration.title}`}
                    width={180}
                    height={120}
                    className={`project-panel__logo-image ${
                      collaboration.id === 1
                        ? "project-panel__logo-image--first"
                        : ""
                    }`}
                  />
                </div>
              </div>

              <div className="project-panel__content-side">
                <div className="project-panel__content">
                  <div className="project-panel__index">
                    {String(collaboration.id).padStart(2, "0")}
                  </div>
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
