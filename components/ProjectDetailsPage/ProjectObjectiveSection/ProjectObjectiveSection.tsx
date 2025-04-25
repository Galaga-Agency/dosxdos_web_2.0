"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/types/project-types";
import {
  movingImageSlider,
  imageRevealAnimation,
  cleanupProjectDetailsAnimations,
  animateObjectiveSection,
} from "@/utils/animations/project-details-page-anim";
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

    // Initialize section animations
    animateObjectiveSection({
      section: sectionRef.current,
      label: labelRef.current,
      title: titleRef.current,
      text: textRef.current,
      gallery: galleryRef.current,
    });

    // Initialize gallery animations after DOM is ready
    const galleryTimer = setTimeout(() => {
      movingImageSlider();
      imageRevealAnimation();
    }, 500);

    // Cleanup function
    return () => {
      clearTimeout(galleryTimer);
      cleanupProjectDetailsAnimations();
    };
  }, []);

  return (
    <section ref={sectionRef} className="project-objective-section">
      <div className="project-objective-section__container">
        <div className="project-objective-section__content-wrapper">
          <div ref={labelRef} className="project-objective-section__label">
            <span>EL PROYECTO</span>
          </div>

          <h2 ref={titleRef} className="project-objective-section__title">
            <span className="word">Creamos</span>{" "}
            <span className="word">espacios</span>{" "}
            <span className="word">que</span>{" "}
            <span className="word">cuentan</span>{" "}
            <span className="highlight">historias únicas</span>
          </h2>

          <div ref={textRef} className="project-objective-section__text">
            <p>{project.longDescription}</p>
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
                  className="project-objective-section__gallery-item"
                >
                  <div className="image-container">
                    <Image
                      src={imgSrc}
                      alt={`Project image ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="image-overlay"></div>
                    <div className="image-corner tl"></div>
                    <div className="image-corner tr"></div>
                    <div className="image-corner bl"></div>
                    <div className="image-corner br"></div>
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
                  className="project-objective-section__gallery-item"
                >
                  <div className="image-container">
                    <Image
                      src={imgSrc}
                      alt={`Project image ${i + 5}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="image-overlay"></div>
                    <div className="image-corner tl"></div>
                    <div className="image-corner tr"></div>
                    <div className="image-corner bl"></div>
                    <div className="image-corner br"></div>
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
