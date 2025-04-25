"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/types/project-types";
import {
  animateCTASection,
  cleanupProjectDetailsAnimations,
} from "@/utils/animations/project-details-page-anim";
import "./ProjectCTASection.scss";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

interface ProjectCTASectionProps {
  project: Project;
  categorySlug?: string;
  categoryName?: string;
}

const ProjectCTASection: React.FC<ProjectCTASectionProps> = ({
  project,
  categorySlug = "proyectos",
  categoryName = "proyectos similares",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize animations from utils file
    animateCTASection({
      section: sectionRef.current,
      title: titleRef.current,
      text: textRef.current,
      cta: ctaRef.current,
    });

    // Cleanup function
    return () => {
      // Use the shared cleanup function
      cleanupProjectDetailsAnimations();
    };
  }, []);

  return (
    <div ref={sectionRef} className="project-cta-section">
      <div className="project-cta-section__container">
        <div className="project-cta-section__content">
          <h2 ref={titleRef} className="project-cta-section__title">
            Descubre más <span className="highlight">inspiración</span>
          </h2>
          <p ref={textRef} className="project-cta-section__text">
            Explora nuestra colección de {categoryName} y encuentra la
            inspiración para tu próximo proyecto.
          </p>
          <div ref={ctaRef} className="project-cta-section__cta">
            <PrimaryButton
              href={`/portfolio/${categorySlug}`}
              className="project-cta-section__button"
            >
              <span className="button-text">Ver más proyectos</span>
              <span className="button-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCTASection;
