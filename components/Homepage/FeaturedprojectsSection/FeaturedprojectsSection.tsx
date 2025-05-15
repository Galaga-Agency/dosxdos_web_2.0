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
      // Temporarily prevent scrolling to avoid auto-scroll issues
      document.body.style.overflow = "hidden";

      // Clean any existing scroll triggers for this section first
      clearScrollTriggers();

      // Longer delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        // Restore scrolling
        document.body.style.overflow = "";

        // Initialize animation
        panelAnimation();

        // Force refresh ScrollTrigger with a small delay
        setTimeout(() => {
          refreshScrollTrigger();
        }, 100);
      }, 300); // Increased from 100ms to 300ms for more stability

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
        clearScrollTriggers();
      };
    }
  }, []);

  // Generate repeated text elements for marquee
  const repeatedText = Array.from({ length: 50 }).map((_, i) => (
    <span key={i}>Nuestros Trabajos&nbsp;&nbsp;</span>
  ));

  return (
    <section ref={sectionRef} className="latest-projects">
      {/* Marquee container - Pure CSS implementation */}
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
