import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projectCategories } from "@/data/projects";
import "./ProjectSection.scss";

interface ProjectSectionProps {
  project: any;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ project }) => {
  return (
    <section className="portfolio-section project-section">
      <div className="section-container">
        <div className="project-content">
          <div className="project-details">
            <span className="project-category">
              {projectCategories.find((cat) => cat.id === project.category)
                ?.name || project.category}
            </span>
            <h2 className="section-title">{project.title}</h2>
            <div className="section-content">
              <p>{project.description}</p>
              <Link
                href={`/proyectos/${project.slug}`}
                className="view-project-btn"
              >
                Ver detalles
              </Link>
            </div>
          </div>
          <div className="project-image section-image">
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="project-img"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
