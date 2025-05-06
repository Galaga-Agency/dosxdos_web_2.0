"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import "./ServiciosRecentProjects.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { BsArrowRight } from "react-icons/bs";

const ServiciosRecentProjects: React.FC = () => {
  const { isDesktop } = useDeviceDetect();
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Get the 3 most recent projects, sorted by date
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3); // Always show 3 projects

  const projectsGridRef = useRef<HTMLDivElement>(null);

  // Set up mobile animations
  useEffect(() => {
    // Only run on mobile
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    // Set up IntersectionObserver for mobile animations
    const projectItems = document.querySelectorAll(
      ".servicios-recent-projects__item"
    );
    if (!projectItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Get the intersection ratio (how much of the element is visible)
          const ratio = entry.intersectionRatio;

          // Only add "in-view" class when the element is more than 50% visible
          if (entry.isIntersecting && ratio > 0.5) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1.0], // Track multiple thresholds
        rootMargin: "-20% 0px", // Shrink the effective viewport slightly
      }
    );

    projectItems.forEach((item) => observer.observe(item));

    return () => {
      projectItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  // Set up scroll indicator for tablets
  useEffect(() => {
    // Only run on tablets
    if (
      typeof window === "undefined" ||
      window.innerWidth < 768 ||
      window.innerWidth >= 992
    )
      return;

    // Check if horizontal scrolling is needed
    const grid = projectsGridRef.current;
    if (!grid) return;

    // If content is wider than container, show scroll indicator
    const checkForScrollIndicator = () => {
      if (grid.scrollWidth > grid.clientWidth) {
        setShowScrollIndicator(true);

        // Hide indicator after user has scrolled
        const handleScroll = () => {
          if (grid.scrollLeft > 20) {
            setShowScrollIndicator(false);
            grid.removeEventListener("scroll", handleScroll);
          }
        };

        grid.addEventListener("scroll", handleScroll);
        return () => grid.removeEventListener("scroll", handleScroll);
      } else {
        setShowScrollIndicator(false);
      }
    };

    checkForScrollIndicator();
    window.addEventListener("resize", checkForScrollIndicator);

    return () => {
      window.removeEventListener("resize", checkForScrollIndicator);
    };
  }, []);

  return (
    <section className="servicios-recent-projects">
      <div className="servicios-recent-projects__container">
        <div className="servicios-recent-projects__layout">
          <div className="servicios-recent-projects__header">
            <h2 className="servicios-recent-projects__title">RECENT PROJECT</h2>
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
