"use client";

import React from "react";
import Image from "next/image";
import { Project } from "@/types/project-types";
import "./ProjectObjectiveSection.scss";

interface ProjectObjectiveSectionProps {
  project: Project;
}

const ProjectObjectiveSection: React.FC<ProjectObjectiveSectionProps> = ({
  project,
}) => {
  return (
    <section className="project-objective-section">
      <div className="project-objective-section__container">
        <div className="project-objective-section__content-wrapper">
          <h2 className="project-objective-section__title fade_bottom">
            Simple & <span className="highlight">Significant</span>
          </h2>

          <div className="project-objective-section__text">
            <div className="project-objective-section__text-label">
              <div className="project-objective-section__label">
                <span>Objective</span>
              </div>
              <p>
                {project.longDescription ||
                  "Liko website was using a generic template, felt quite outdated and not in-line with the quality of his work. The main goal was to translate his high-end photography into a digital experience that would honor and present his work in a memorable and contemporary way."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="project-objective-section__image-column">
        <div className="project-objective-section__gallery">
          <div className="moving-gallery slider-wrap-top">
            <div className="wrapper-gallery">
              {project.images.slice(0, 4).map((imgSrc, i) => (
                <div
                  key={i}
                  className="project-objective-section__gallery-item"
                >
                  <div className="image-container">
                    <Image
                      src={imgSrc}
                      alt={`Project image ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="moving-gallery slider-wrap-bottom">
            <div className="wrapper-gallery">
              {project.images.slice(4, 8).map((imgSrc, i) => (
                <div
                  key={i + 4}
                  className="project-objective-section__gallery-item"
                >
                  <div className="image-container">
                    <Image
                      src={imgSrc}
                      alt={`Project image ${i + 5}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectObjectiveSection;
