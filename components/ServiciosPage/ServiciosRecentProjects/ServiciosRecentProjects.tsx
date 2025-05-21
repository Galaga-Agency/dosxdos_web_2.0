"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import "./ServiciosRecentProjects.scss";

const ServiciosRecentProjects: React.FC = () => {
  const { isDesktop } = useDeviceDetect();
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Get the 3 most recent projects, sorted by date
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3); // Always show 3 projects

  const projectsGridRef = useRef<HTMLDivElement>(null);

  return (
    <section className="servicios-recent-projects">
      <div className="servicios-recent-projects__container">
        <div className="servicios-recent-projects__layout">
          <div className="servicios-recent-projects__header">
            <h2 className="servicios-recent-projects__title">
              PROYECTOS RECIENTES
            </h2>
          </div>

          <div
            className="servicios-recent-projects__grid"
            ref={projectsGridRef}
          >
            {recentProjects.map((project) => (
              <Link
                href={`/portfolio/${project.slug}`}
                className="servicios-recent-projects__item"
                key={project.id}
              >
                <div className="servicios-recent-projects__image-wrapper">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="servicios-recent-projects__image"
                  />
                </div>

                <div className="servicios-recent-projects__hover-info">
                  <span className="servicios-recent-projects__project-title">
                    {project.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiciosRecentProjects;
