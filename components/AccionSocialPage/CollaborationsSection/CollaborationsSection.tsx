"use client";

import React, { useRef } from "react";
import Image from "next/image";
import "./CollaborationsSection.scss";
import { collaborationData } from "@/data/collaborations";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

const CollaborationsSection: React.FC = () => {
  return (
    <section className="collaborations-section ">
      <div className="collaborations-section__header header container">
        <h3 className="collaborations-section__label label">
          (Comprometidos con lo que de verdad importa)
        </h3>
        <h2 className="collaborations-section__title secondary-title ">
          Colaboramos con quienes{" "}
          <span className="highlight">transforman vidas</span>.
        </h2>
        <p className="collaborations-section__subtitle subtitle ">
          Apoyamos a fundaciones y organizaciones que construyen un futuro más
          justo. <br/>Diseñamos con propósito, y también con corazón.
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
                <div className="project-panel__logo">
                  <Image
                    src={collaboration.image}
                    alt={`Logo de ${collaboration.title}`}
                    width={180}
                    height={120}
                    className={`project-panel__logo-image ${
                      collaboration.id === 2
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
                  <h3 className="project-panel__title small-title">
                    {collaboration.title}
                  </h3>
                  <p className="project-panel__description text">
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
