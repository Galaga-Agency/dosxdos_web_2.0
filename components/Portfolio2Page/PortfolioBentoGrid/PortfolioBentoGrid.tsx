"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./PortfolioBentoGrid.scss";

interface Project {
  id: string;
  title: string;
  slug: string;
  image: string;
  category?: string;
}

interface PortfolioBentoGridProps {
  projects: Project[];
}

const PortfolioBentoGrid: React.FC<PortfolioBentoGridProps> = ({
  projects,
}) => {
  const router = useRouter();

  // Project click handler
  const handleProjectClick = (projectSlug: string) => {
    router.push(`/portfolio/${projectSlug}`);
  };

  return (
    <div className="portfolio-bento">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`portfolio-bento__item portfolio-bento__item--${
            index + 1
          } reveal-item`}
          onClick={() => handleProjectClick(project.slug)}
        >
          <div className="portfolio-bento__image-wrapper">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              (max-width: 1600px) 33vw,
              25vw"
              unoptimized={true}
              quality={90} // Higher quality for important portfolio images
              className="portfolio-bento__image"
              priority={index < 2} // Load the first two images with priority
            />
          </div>

          <div className="portfolio-bento__hover-info reveal-content">
            <span className="portfolio-bento__label reveal-label">
              {project.category || "CREATIVO"}
            </span>
            <span className="portfolio-bento__title reveal-title">
              {project.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioBentoGrid;
