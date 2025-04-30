"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  panelTwoAnimation,
  clearScrollTriggers,
} from "@/utils/animations/panel-animation";
import { animateAboutUsSection } from "@/utils/animations/homepage-anim";
import {
  initScrollTriggerConfig,
  refreshScrollTrigger,
} from "@/utils/animations/scrolltrigger-config";
import "./FeaturedprojectsSection.scss";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { featuredProjects } from "@/data/projects";

const FeaturedprojectsSection: React.FC = () => {
  const animatedRef = useRef<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Make sure we only animate once per component instance
    if (animatedRef.current) return;

    // Ensure ScrollTrigger is configured
    initScrollTriggerConfig();

    // Initialize panel animation with proper delay
    const timer = setTimeout(() => {
      // Clean any existing scroll triggers for this section first
      clearScrollTriggers();

      // Initialize the panel animation
      panelTwoAnimation();

      // Also animate the content section if available
      if (titleRef.current && textRef.current) {
        animateAboutUsSection({
          section: sectionRef.current,
          label: labelRef.current,
          title: titleRef.current,
          text: textRef.current,
          cta: ctaRef.current,
        });
      }

      // Mark as animated
      animatedRef.current = true;

      // Force refresh ScrollTrigger
      refreshScrollTrigger();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="latest-projects">
      {/* Marquee container */}
      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-text">
            {Array.from({ length: 50 }).map((_, i) => (
              <span key={i}>our work&nbsp;</span>
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
