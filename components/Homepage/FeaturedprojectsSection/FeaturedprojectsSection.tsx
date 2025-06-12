"use client";

import React from "react";
import Image from "next/image";
import TextMarquee from "@/components/TextMarquee/TextMarquee";
import "./FeaturedprojectsSection.scss";
import { Project } from "@/types/project-types";
import Link from "next/link";

interface FeaturedprojectsSectionProps {
  projects: Project[];
}

const FeaturedprojectsSection: React.FC<FeaturedprojectsSectionProps> = ({
  projects,
}) => {
  return (
    <section className="latest-projects">
      <TextMarquee
        text="Hecho en dos x dos"
        speed={50}
        className="projects-marquee"
      />

      <div className="project-panel-area">
        {projects.map((project) => (
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
              <h3 className="project-panel__title">{project.name}</h3>
              <Link
                href={`/portfolio/${project.slug}`}
                className="project-panel__link"
              >
                Explorar proyecto
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedprojectsSection;
