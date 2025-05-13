"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/types/project-types";
import {
  movingImageSlider,
  imageRevealAnimation,
  initFadeAnimations,
} from "@/utils/animations/pages/project-details-page-anim";
import "./ProjectObjectiveSection.scss";

interface ProjectObjectiveSectionProps {
  project: Project;
}

const ProjectObjectiveSection: React.FC<ProjectObjectiveSectionProps> = ({
  project,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize animations after DOM is ready
    setTimeout(() => {
      // Initialize fade animations
      initFadeAnimations();

      // Initialize gallery animations
      movingImageSlider();
      imageRevealAnimation();
    }, 300);
  }, []);

  return (
    <section ref={sectionRef} className="project-objective-section">
      <div className="project-objective-section__container">
        <div className="project-objective-section__content-wrapper">
          <h2
            ref={titleRef}
            className="project-objective-section__title fade_bottom"
          >
            Simple & Significant
          </h2>

          <div
            ref={textRef}
            className="project-objective-section__text fade_bottom"
          >
            <div className="project-objective-section__text-label">
              <div
                ref={labelRef}
                className="project-objective-section__label fade_bottom"
              >
                <span>Objective</span>
              </div>
              <p>
                {project.longDescription ||
                  "Liko website was using a generic template, felt quite outdated and not in-line with the quality of his work. The main goal was to translate his high-end photography into a digital experience that would honor and present his work in a memorable and contemporary way."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="project-objective-section__image-column">
        <div ref={galleryRef} className="project-objective-section__gallery">
          <div className="moving-gallery slider-wrap-top">
            <div className="wrapper-gallery">
              {project.images.slice(0, 4).map((imgSrc, i) => (
                <div
                  key={i}
                  className="project-objective-section__gallery-item fade_bottom"
                >
                  <div className="image-container">
                    <Image
                      src={imgSrc}
                      alt={`Project image ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="moving-gallery slider-wrap-bottom">
            <div className="wrapper-gallery">
              {project.images.slice(4, 8).map((imgSrc, i) => (
                <div
                  key={i + 4}
                  className="project-objective-section__gallery-item fade_bottom"
                >
                  <div className="image-container">
                    <Image
                      src={imgSrc}
                      alt={`Project image ${i + 5}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectObjectiveSection;
