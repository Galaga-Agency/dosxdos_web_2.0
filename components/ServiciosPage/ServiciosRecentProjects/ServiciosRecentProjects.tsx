"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import "./ServiciosRecentProjects.scss";

const ServiciosRecentProjects: React.FC = () => {
  const { isDesktop, isTablet } = useDeviceDetect();
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [showNextArrow, setShowNextArrow] = useState(false);
  const [showPrevArrow, setShowPrevArrow] = useState(false);

  // Get the 3 most recent projects, sorted by date
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const projectsGridRef = useRef<HTMLDivElement>(null);

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    if (!projectsGridRef.current || !isTablet) return;

    const element = projectsGridRef.current;
    const scrollLeft = element.scrollLeft;
    const scrollWidth = element.scrollWidth;
    const clientWidth = element.clientWidth;

    setShowPrevArrow(scrollLeft > 10);
    setShowNextArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Handle scroll navigation
  const handleScroll = (direction: "prev" | "next") => {
    if (!projectsGridRef.current) return;

    const element = projectsGridRef.current;
    const scrollAmount = 320;

    if (direction === "next") {
      element.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      element.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  // Initialize scroll position check
  useEffect(() => {
    if (isTablet) {
      const timer = setTimeout(() => {
        checkScrollPosition();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isTablet]);

  // Add scroll event listener
  useEffect(() => {
    const element = projectsGridRef.current;
    if (!element || !isTablet) return;

    element.addEventListener("scroll", checkScrollPosition);
    return () => element.removeEventListener("scroll", checkScrollPosition);
  }, [isTablet]);

  return (
    <section className="servicios-recent-projects">
      <div className="servicios-recent-projects__container">
        <div className="servicios-recent-projects__layout">
          <div className="servicios-recent-projects__header">
            <h2 className="servicios-recent-projects__title fade_bottom">
              PROYECTOS RECIENTES
            </h2>
          </div>

          <div className="servicios-recent-projects__grid-container">
            {/* Navigation Arrows - Only on tablets */}
            {isTablet && (
              <>
                {showPrevArrow && (
                  <button
                    className="servicios-recent-projects__nav-arrow servicios-recent-projects__nav-arrow--prev"
                    onClick={() => handleScroll("prev")}
                    aria-label="Ver proyectos anteriores"
                  >
                    <ChevronRight />
                  </button>
                )}

                {showNextArrow && (
                  <button
                    className="servicios-recent-projects__nav-arrow servicios-recent-projects__nav-arrow--next"
                    onClick={() => handleScroll("next")}
                    aria-label="Ver más proyectos"
                  >
                    <ChevronRight />
                  </button>
                )}
              </>
            )}

            <div
              className="servicios-recent-projects__grid"
              ref={projectsGridRef}
            >
              {recentProjects.map((project) => (
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="servicios-recent-projects__item reveal-item"
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

                  <div className="servicios-recent-projects__hover-info reveal-content">
                    <span className="servicios-recent-projects__label reveal-label">
                      CREATIVO
                    </span>
                    <span className="servicios-recent-projects__item-title reveal-title">
                      {project.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiciosRecentProjects;
