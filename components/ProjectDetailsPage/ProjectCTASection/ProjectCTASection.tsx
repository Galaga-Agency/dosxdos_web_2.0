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
          <p className="project-cta-section__text">
            Explora nuestra colección de {categoryName} y encuentra la
            inspiración para tu próximo proyecto.
          </p>
          <div className="project-cta-section__button">
            <PrimaryButton href={`/portfolio/mas-proyectos`}>
              Ver más proyectos →
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCTASection;
