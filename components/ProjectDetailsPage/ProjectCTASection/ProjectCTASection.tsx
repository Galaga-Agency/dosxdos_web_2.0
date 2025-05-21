"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/types/project-types";
import "./ProjectCTASection.scss";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

interface ProjectCTASectionProps {
  project: Project;
  categorySlug?: string;
  categoryName?: string;
}

const ProjectCTASection: React.FC<ProjectCTASectionProps> = ({
  project,
  categorySlug = "proyectos",
  categoryName = "proyectos similares",
}) => {
  return (
    <section className="project-cta-section">
      <div className="project-cta-section__container">
        <div className="project-cta-section__content">
          <span className="project-cta-section__label fade_bottom">
            Inspiración
          </span>
          <h2 className="project-cta-section__title fade_bottom">
            DESCUBRE MÁS
            <br />
            <span className="project-cta-section__title-row-2">
              PROYECTOS ESPECIALES
            </span>
          </h2>
          <p className="project-cta-section__text fade_bottom">
            Explora nuestra colección de {categoryName} y encuentra la
            inspiración para tu próximo proyecto.
          </p>
          <div className="project-cta-section__button">
            <PrimaryButton href={`/portfolio/mas-proyectos`}>
              <span className="button-text">Ver más proyectos</span>
              <span className="button-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCTASection;
