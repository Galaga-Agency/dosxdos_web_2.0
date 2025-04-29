"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import { featuredProjects } from "@/data/projects";
import {
  initPortfolioPageAnimations,
  cleanupAllAnimations,
} from "@/utils/animations/portfolio-page-anim";
import "./portfolio-page.scss";

const PortfolioPage: React.FC = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clear backgrounds and rebuild them on every component mount
  useEffect(() => {
    setIsLoaded(false);

    // Clear existing background elements if any
    if (bgWrapperRef.current) {
      bgWrapperRef.current.innerHTML = "";

      // Create new background elements
      if (featuredProjects.length > 0) {
        setActiveProject(featuredProjects[0].id);

        // Create overlay first (at the bottom layer)
        const overlay = document.createElement("div");
        overlay.className = "portfolio-page__overlay";
        bgWrapperRef.current.appendChild(overlay);

        // Create background elements for each project
        featuredProjects.forEach((project, index) => {
          const bgElement = document.createElement("div");
          bgElement.className = "portfolio-page__background-image";
          if (index === 0) bgElement.classList.add("active");

          // Preload the image
          const img = new Image();
          img.onload = () => {
            bgElement.style.backgroundImage = `url(${project.image})`;

            // If this is the first image, mark the page as loaded
            if (index === 0) {
              setTimeout(() => {
                setIsLoaded(true);

                // Animate container after image is loaded
                if (containerRef.current && projectsRef.current) {
                  containerRef.current.classList.add("loaded");

                  // Initialize page animations
                  initPortfolioPageAnimations({
                    section: sectionRef.current,
                    projects: projectsRef.current,
                    infoSection: null,
                    ctaButton: null,
                  });
                }
              }, 100);
            }
          };
          img.src = project.image;

          // Store the project ID as a data attribute for easy lookup
          bgElement.dataset.projectId = project.id;

          if (bgWrapperRef.current) {
            bgWrapperRef.current.appendChild(bgElement);
          }
        });
      }
    }

    // Cleanup function
    return () => {
      // Call cleanup function to remove any lingering ScrollTriggers
      cleanupAllAnimations();
    };
  }, []);

  // Handle project hover
  const handleProjectHover = (projectId: string) => {
    if (projectId === activeProject || !bgWrapperRef.current || !isLoaded)
      return;

    // Find background element for this project
    const targetBg = bgWrapperRef.current.querySelector(
      `[data-project-id="${projectId}"]`
    );
    if (!targetBg) return;

    // Find current active background
    const currentBg = bgWrapperRef.current.querySelector(".active");
    if (currentBg) currentBg.classList.remove("active");

    // Activate new background
    targetBg.classList.add("active");
    setActiveProject(projectId);
  };

  // Project click handler
  const handleProjectClick = (projectSlug: string) => {
    router.push(`/portfolio/${projectSlug}`);
  };

  return (
    <SmoothScrollWrapper>
      <div className="portfolio-page" ref={sectionRef}>
        {/* Background container */}
        <div ref={bgWrapperRef} className="portfolio-page__background"></div>
        {/* Main container */}
        <div ref={containerRef} className="portfolio-page__container">
          {/* Projects list */}
          <div ref={projectsRef} className="portfolio-page__projects">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`portfolio-page__project-item ${
                  activeProject === project.id ? "active" : ""
                }`}
                onMouseEnter={() => handleProjectHover(project.id)}
                onClick={() => handleProjectClick(project.slug)}
              >
                <h2 className="portfolio-page__project-title">
                  <span className="text-outline">{project.title}</span>
                </h2>
              </div>
            ))}
          </div>
          {/* Call to action */}
        </div>
        <div className="portfolio-page__cta">
          <a href="/portfolio/all" className="portfolio-page__cta-link">
            <span className="portfolio-page__cta-text">Ver más proyectos</span>
            <span className="portfolio-page__cta-arrow">→</span>
          </a>
        </div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default PortfolioPage;
