"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { refreshScrollTrigger } from "@/utils/animations/scrolltrigger-config";
import "./FeaturedprojectsSection.scss";
import { projects } from "@/data/projects";
import {
  clearScrollTriggers,
  panelAnimation,
} from "@/utils/animations/components/panel-animation";

const FeaturedprojectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredProjects = projects.filter(
    (project) => project.display.homepage === true
  );

  useEffect(() => {
    if (sectionRef.current) {
      // Delay animation slightly to allow DOM to fully render
      const timer = setTimeout(() => {
        // Clean any existing scroll triggers for this section first
        clearScrollTriggers();

        panelAnimation();

        // Force refresh ScrollTrigger
        refreshScrollTrigger();
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <section ref={sectionRef} className="latest-projects">
      {/* Marquee container */}
      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-text">
            {Array.from({ length: 50 }).map((_, i) => (
              <span key={i}>Nuestros Trabajos&nbsp;&nbsp;</span>
            ))}
          </div>
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
              />
              <div className="project-panel__overlay"></div>
            </div>

            <div className="project-panel__content">
              <h3 className="project-panel__title">{project.title}</h3>
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