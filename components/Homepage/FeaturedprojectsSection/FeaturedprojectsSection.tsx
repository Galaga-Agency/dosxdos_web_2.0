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
  const isFirstRender = useRef(true);
  const featuredProjects = projects.filter(
    (project) => project.display.homepage === true
  );

  useEffect(() => {
    // We need a flag to track if the component is mounted
    let isMounted = true;

    // Don't freeze body scroll immediately - wait for cleanup first
    clearScrollTriggers();

    // Add a longer delay on first render, shorter on subsequent renders
    const initialDelay = isFirstRender.current ? 800 : 300;
    isFirstRender.current = false;

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!isMounted) return;

      console.log("Initializing panel animation");
      // Initialize the panel animation only after first render is complete
      panelAnimation();

      // Force refresh ScrollTrigger with a small delay
      setTimeout(() => {
        if (isMounted) {
          console.log("First ScrollTrigger refresh");
          refreshScrollTrigger();
          
          // Force another refresh after a longer delay to catch any stragglers
          setTimeout(() => {
            if (isMounted) {
              console.log("Second ScrollTrigger refresh");
              refreshScrollTrigger();
              
              // Reset SmoothScroller if needed
              if ((window as any).__smoother__) {
                console.log("Refreshing smoother");
                (window as any).__smoother__.refresh();
              }
            }
          }, 500);
        }
      }, 300);
    }, initialDelay);

    return () => {
      // Mark component as unmounted
      isMounted = false;

      // Clear timers and animations
      clearTimeout(timer);
      clearScrollTriggers();

      // If the ScrollTrigger smoother exists, update it
      if ((window as any).__smoother__) {
        (window as any).__smoother__.paused(false);
      }
    };
  }, []);

  // Generate repeated text elements for marquee
  const repeatedText = Array.from({ length: 20 }).map((_, i) => (
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