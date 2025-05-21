"use client";

import React from "react";
import { Project } from "@/types/project-types";
import "./HeroSection.scss";

interface HeroSectionProps {
  project: Project;
}

const HeroSection: React.FC<HeroSectionProps> = ({ project }) => {
  // Formatear fecha para mostrar
  const formattedDate = new Date(project.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  });

  // Obtener nombre de categoría
  const getCategoryName = (categorySlug: string) => {
    return categorySlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <section
      className="portfolio-hero"
      style={{ backgroundImage: `url(${project.image})` }}
    >
      <div className="portfolio-hero__wrapper">
        <div className="portfolio-hero__container">
          <div className="portfolio-hero__row">
            <div className="portfolio-hero__col-title">
              <div className="portfolio-hero__title-box">
                <h1 className="portfolio-hero__title char-animation">
                  {project.title}
                </h1>
                <span className="portfolio-hero__subtitle fade_bottom">
                  {getCategoryName(project.category)}
                </span>
              </div>
            </div>

            <div className="portfolio-hero__col-desc">
              <div className="portfolio-hero__description rollup-text">
                <p>{project.description}</p>
                {project.longDescription && (
                  <p className="portfolio-hero__long-description rollup-text">
                    {project.longDescription}
                  </p>
                )}
              </div>

              {/* Asegurar que los metadatos estén estructurados correctamente */}
              <div className="portfolio-hero__meta-wrapper">
                <div className="portfolio-hero__meta">
                  <span>CLIENTE</span>
                  <h5>{project.client}</h5>
                </div>
                {project.services && (
                  <div className="portfolio-hero__meta">
                    <span>SERVICIOS</span>
                    <h5>{project.services.join(", ")}</h5>
                  </div>
                )}
                {project.location && (
                  <div className="portfolio-hero__meta">
                    <span>UBICACIÓN</span>
                    <h5>{project.location}</h5>
                  </div>
                )}
                <div className="portfolio-hero__meta">
                  <span>FECHA</span>
                  <h5>{formattedDate}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
