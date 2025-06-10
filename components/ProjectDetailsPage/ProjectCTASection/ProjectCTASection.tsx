"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/types/project-types";
import "./ProjectCTASection.scss";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";

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
    <section className="project-cta-section container">
      <div className="project-cta-section__header header">
        <h3 className="project-cta-section__label label">(Inspiración)</h3>
        <h2 className="project-cta-section__title title ">
          DESCUBRE MÁS&nbsp;
          <span className="highlight">PROYECTOS ESPECIALES</span>
        </h2>
      </div>

      <p className="project-cta-section__text subtitle">
        Explora nuestra colección de {categoryName} y encuentra la inspiración
        para tu próximo proyecto.
      </p>
      <div className="project-cta-section__button">
        <HoverCircleButton href="/portfolio" label="Ver más proyectos" />
      </div>
    </section>
  );
};

export default ProjectCTASection;
