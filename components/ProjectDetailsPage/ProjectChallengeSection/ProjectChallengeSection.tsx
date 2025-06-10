"use client";

import React from "react";
import { Project } from "@/types/project-types";
import "./ProjectChallengeSection.scss";
import { renderFormattedText } from "@/utils/textFormatting";

interface ProjectChallengeSectionProps {
  project: Project;
}

const ProjectChallengeSection: React.FC<ProjectChallengeSectionProps> = ({
  project,
}) => {
  return (
    <section className="project-challenge-section">
      <div className="project-challenge-section__container container">
        <div className="project-challenge-section__content-wrapper">
          <h3 className="project-challenge-section__label label">
            (Reto del Proyecto)
          </h3>
          <h2 className="project-challenge-section__title secondary-title ">
            El <span className="highlight">Desafío</span>
          </h2>

          <div className="project-challenge-section__text">
            {renderFormattedText(project.challenge)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectChallengeSection;
