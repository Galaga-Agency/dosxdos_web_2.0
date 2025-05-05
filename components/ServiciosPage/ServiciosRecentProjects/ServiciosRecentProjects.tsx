"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import "./ServiciosRecentProjects.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const ServiciosRecentProjects: React.FC = () => {
  // Get the 3 most recent projects, sorted by date
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const { isTouchDevice } = useDeviceDetect();
  
  return (
    <section className="servicios-recent-projects">
      <div className="servicios-recent-projects__container">
        <div className="servicios-recent-projects__layout">
          <div className="servicios-recent-projects__header">
            <h2 className="servicios-recent-projects__title">RECENT PROJECT</h2>
          </div>
          
          <div className="servicios-recent-projects__grid" ref={projectsGridRef}>
            {recentProjects.map((project, index) => (
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
                  <span className="servicios-recent-projects__label">
                    {project.category}
                  </span>
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