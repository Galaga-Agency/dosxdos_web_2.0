"use client";

import React, { useRef } from "react";
import Image from "next/image";
import "./FeaturedprojectsSection.scss";
import { projects } from "@/data/projects";

const FeaturedprojectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const featuredProjects = projects.filter(
    (project) => project.display.homepage === true
  );

  // Generate repeated text elements for marquee
  const repeatedText = Array.from({ length: 20 }).map((_, i) => (
    <span key={i}>
      Hecho en dos x dos&nbsp;<span className="dot">•</span>&nbsp;
    </span>
  ));

  return (
    <section ref={sectionRef} className="latest-projects">
      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-text">{repeatedText}</div>
        </div>
      </div>

      {/* Project panels */}
      <div className="project-panel-area">
        {featuredProjects.map((project) => (
          <div key={project.id} className="project-panel">
            <div className="project-panel__image">
              <Image
                src={project.image}
                alt={project.title}
                width={1920}
                height={1080}
                className="project-panel__image-file"
                priority={project.id === "01"}
                unoptimized={true}
              />
              <div className="project-panel__overlay"></div>
            </div>

            <div className="project-panel__content">
              <h3 className="project-panel__title">
                {project.title}, {project.location}
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
