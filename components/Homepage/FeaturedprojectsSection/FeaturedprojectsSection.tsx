"use client";

import React from "react";
import Image from "next/image";
import "./FeaturedprojectsSection.scss";
import { useDataStore } from "@/store/useDataStore";

const FeaturedprojectsSection: React.FC = () => {
  const projects = useDataStore((state) => state.projects);
  const featuredProjects = projects.filter((project) => project.featured);

  const repeatedText = Array.from({ length: 20 }).map((_, i) => (
    <span key={i}>
      Hecho en dos x dos&nbsp;<span className="dot">•</span>&nbsp;
    </span>
  ));

  return (
    <section className="latest-projects">
      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-text">{repeatedText}</div>
        </div>
      </div>

      <div className="project-panel-area">
        {featuredProjects.map((project) => (
          <div key={project.id} className="project-panel">
            <div className="project-panel__image">
              <Image
                src={project.coverImage}
                alt={project.name}
                width={1920}
                height={1080}
                className="project-panel__image-file"
                priority={project.featured}
                unoptimized
              />
              <div className="project-panel__overlay"></div>
            </div>

            <div className="project-panel__content">
              <h3 className="project-panel__title">
                {project.name}
              </h3>
              <a
                href={`/portfolio/${project.slug}`}
                className="project-panel__link"
              >
                Explorar proyecto
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedprojectsSection;
