"use client";

import React from "react";
import Image from "next/image";
import { Project } from "@/types/project-types";
import "./ProjectProcessSection.scss";

interface ProjectProcessSectionProps {
  project: Project;
}

const ProjectProcessSection: React.FC<ProjectProcessSectionProps> = ({
  project,
}) => {
  // Default process description if not provided
  const processDescription =
    project?.process ||
    "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.";

  // Check for valid image sources
  const hasValidImages =
    project?.images &&
    project.images.length >= 3 &&
    project.images[0] &&
    project.images[1] &&
    project.images[2];

  // Default/fallback image paths
  const defaultImages = [
    "/assets/img/blog/default-blog-image.jpg",
    "/assets/img/blog/default-blog-image.jpg",
    "/assets/img/blog/default-blog-image.jpg",
  ];

  const imageSources = hasValidImages ? project.images : defaultImages;

  return (
    <section className="project-process-section">
      <div className="project-process-section__container">
        <div className="project-process-section__content-wrapper">
          <h2 className="project-process-section__title fade_bottom">
            Simple & <span className="highlight">Significant</span>
          </h2>

          <div className="project-process-section__text">
            <div className="project-process-section__text-label">
              <div className="project-process-section__label">
                <span>El Proceso</span>
              </div>
              <p>{processDescription}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="project-process-section__full-image">
        <div className="project-process-section__image-container">
          <Image
            src={imageSources[0]}
            alt="Imagen del proceso del proyecto"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>

      <div className="project-process-section__floating-images">
        <div className="project-process-section__floating-image project-process-section__floating-image--1 fade_bottom">
          <div className="project-process-section__floating-image-inner">
            <Image
              src={imageSources[1]}
              alt="Materiales del proyecto"
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <div className="project-process-section__floating-image-overlay"></div>
          </div>
        </div>

        <div className="project-process-section__floating-image project-process-section__floating-image--2 fade_bottom">
          <div className="project-process-section__floating-image-inner">
            <Image
              src={imageSources[2]}
              alt="Acabados del proyecto"
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <div className="project-process-section__floating-image-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectProcessSection;
