"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import "./ServiciosRecentProjects.scss";

import { Project } from "@/types/project-types";
import Link from "next/link";

interface ServiciosRecentProjectsProps {
  projects: Project[];
}

const ServiciosRecentProjects: React.FC<ServiciosRecentProjectsProps> = ({
  projects,
}) => {
  const { isTablet } = useDeviceDetect();
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
            <h3 className="servicios-recent-projects__title">
              (PROYECTOS RECIENTES)&nbsp;&nbsp;
            </h3>
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
                  className="servicios-recent-projects__item"
                  key={project.id}
                >
                  <div className="servicios-recent-projects__image-wrapper">
                    <Image
                      src={project.coverImage}
                      alt={project.name || "Proyecto reciente"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      className="servicios-recent-projects__image"
                    />
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
