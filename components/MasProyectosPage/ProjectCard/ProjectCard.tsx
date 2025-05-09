import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./ProjectCard.scss";

interface ProjectCardProps {
  project: {
    id: string;
    slug: string;
    title: string;
    category: string;
    image: string;
  };
  dataSpeed?: string; // For parallax effect
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  dataSpeed = "0.1",
}) => {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="project-card"
      data-speed={dataSpeed}
    >
      <div className="project-card__image-wrapper">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="project-card__image"
        />
      </div>

      <div className="project-card__overlay"></div>

      <div className="project-card__info">
        <span className="project-card__title">{project.title}</span>
      </div>
    </Link>
  );
};

export default ProjectCard;
