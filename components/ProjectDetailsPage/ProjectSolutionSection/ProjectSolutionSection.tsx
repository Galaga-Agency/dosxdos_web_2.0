"use client";

import React from "react";
import { Project } from "@/types/project-types";
import "./ProjectSolutionSection.scss";
import { renderFormattedText } from "@/utils/textFormatting";

interface ProjectSolutionSectionProps {
  project: Project;
}

const ProjectSolutionSection: React.FC<ProjectSolutionSectionProps> = ({
  project,
}) => {
  return (
    <section className="project-solution-section">
      <div className="project-solution-section__container container">
        <div className="project-solution-section__content-wrapper">
          <h3 className="project-solution-section__label label">
            (Nuestra Propuesta)
          </h3>
          <h2 className="project-solution-section__title title fade_bottom">
            La <span className="highlight">Solución</span>
          </h2>
          <div className="project-solution-section__text">
            {renderFormattedText(project.solution)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSolutionSection;
