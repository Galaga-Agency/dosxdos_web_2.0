"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import { featuredProjects } from "@/data/projects";
import {
  initPortfolioPageAnimations,
  cleanupAllAnimations,
} from "@/utils/animations/portfolio-page-anim";
import "./PortfolioPage.scss";
import SocialIcons from "@/components/SocialIcons/SocialIcons";

const PortfolioPage: React.FC = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const infoSectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
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
                if (
                  containerRef.current &&
                  titleRef.current &&
                  projectsRef.current &&
                  infoSectionRef.current &&
                  ctaRef.current
                ) {
                  containerRef.current.classList.add("loaded");

                  // Initialize page animations
                  initPortfolioPageAnimations({
                    section: sectionRef.current,
                    title: titleRef.current,
                    projects: projectsRef.current,
                    infoSection: infoSectionRef.current,
                    ctaButton: ctaRef.current,
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

        {/* Social sidebar */}
        <div className="portfolio-page__social-sidebar">
          <div className="portfolio-page__social-wrapper">
            <span className="portfolio-page__social-label">Síguenos</span>
            <SocialIcons orientation="vertical" color="white" />
          </div>
        </div>

        {/* Main container */}
        <div ref={containerRef} className="portfolio-page__container">
          {/* Title */}
          <h1 className="portfolio-page__title" ref={titleRef}>
            Proyectos que hablan por si solos
            <span className="portfolio-page__title-accent"></span>
          </h1>

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
                <div className="portfolio-page__project-number">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <div className="portfolio-page__project-content">
                  <h2 className="portfolio-page__project-title">
                    {project.title}
                  </h2>
                  <div className="portfolio-page__project-meta">
                    <span className="portfolio-page__project-client">
                      {project.client}
                    </span>
                    <span className="portfolio-page__project-separator">·</span>
                    <span className="portfolio-page__project-category">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="portfolio-page__project-arrow">
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Info section */}
          <div className="portfolio-page__info-section" ref={infoSectionRef}>
            <div className="portfolio-page__info-text">
              <p>
                Nos encargamos de la{" "}
                <strong>gestión integral de las firmas</strong>. Estudiamos las
                necesidades específicas de cada proyecto y diseñamos basándonos
                en las especificaciones de la firma. Posteriormente, realizamos
                los planos técnicos, producción de materiales e instalación en
                el punto de venta.
              </p>
              <p>
                Ya son muchos los{" "}
                <strong>proyectos que hemos llevado a cabo</strong> para marcas
                de prestigio. Escaparates, diseño de interiores para tiendas,
                impresiones, stands, muebles comerciales, mostradores o
                góndolas… Aquí podéis ver algunos ejemplos de trabajos
                realizados por el equipo de Dos por Dos Grupo Imagen:
              </p>
            </div>
          </div>

          {/* CTA section */}
          <div className="portfolio-page__cta" ref={ctaRef}>
            <PrimaryButton href="/proyectos/todos" size="large">
              Explore nuestra colección completa de trabajos
            </PrimaryButton>
          </div>
        </div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default PortfolioPage;
