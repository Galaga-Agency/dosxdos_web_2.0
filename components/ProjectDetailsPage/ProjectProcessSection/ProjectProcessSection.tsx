"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/types/project-types";
import { initProcessSectionAnimations } from "@/utils/animations/pages/project-details-page-anim";
import "./ProjectProcessSection.scss";

interface ProjectProcessSectionProps {
  project: Project;
}

const ProjectProcessSection: React.FC<ProjectProcessSectionProps> = ({
  project,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fullImageRef = useRef<HTMLDivElement>(null);
  const floatingImage1Ref = useRef<HTMLDivElement>(null);
  const floatingImage2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize animations with a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initProcessSectionAnimations({
        section: sectionRef.current,
        label: labelRef.current,
        title: titleRef.current,
        text: textRef.current,
        fullImage: fullImageRef.current,
        imageLeft: floatingImage1Ref.current,
        imageRight: floatingImage2Ref.current,
        steps: null,
      });

      // Refresh ScrollTrigger to ensure all animations are properly registered
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Default process description if not provided
  const processDescription =
    project?.process ||
    "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.";

  // Check for valid image sources
  const hasValidImages =
    project?.images &&
    project.images.length >= 3 &&
    project.images[0] &&
    project.images[1] &&
    project.images[2];

  // Default/fallback image paths
  const defaultImages = [
    "/assets/img/blog/default-blog-image.jpg",
    "/assets/img/blog/default-blog-image.jpg",
    "/assets/img/blog/default-blog-image.jpg",
  ];

  // Get image sources securely
  const imageSources = hasValidImages ? project.images : defaultImages;

  return (
    <section ref={sectionRef} className="project-process-section">
      <div className="project-process-section__container">
        <div className="project-process-section__content-wrapper">
          <div ref={labelRef} className="project-process-section__label">
            <span>EL PROCESO</span>
          </div>

          <h2
            ref={titleRef}
            className="project-process-section__title char-animation"
          >
            Nuestro enfoque metodológico
          </h2>

          <div ref={textRef} className="project-process-section__text">
            <p>{processDescription}</p>
          </div>
        </div>
      </div>

      <div ref={fullImageRef} className="project-process-section__full-image">
        <div className="project-process-section__image-container">
          <Image
            src={imageSources[0]}
            alt="Imagen del proceso del proyecto"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>

      <div className="project-process-section__floating-images">
        <div
          ref={floatingImage1Ref}
          className="project-process-section__floating-image project-process-section__floating-image--1"
        >
          <div className="corner corner--tl"></div>
          <div className="corner corner--tr"></div>
          <div className="corner corner--bl"></div>
          <div className="corner corner--br"></div>

          <div className="project-process-section__floating-image-inner">
            <Image
              src={imageSources[1]}
              alt="Materiales del proyecto"
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <div className="project-process-section__floating-image-overlay"></div>
          </div>
        </div>

        <div
          ref={floatingImage2Ref}
          className="project-process-section__floating-image project-process-section__floating-image--2"
        >
          <div className="corner corner--tl"></div>
          <div className="corner corner--tr"></div>
          <div className="corner corner--bl"></div>
          <div className="corner corner--br"></div>

          <div className="project-process-section__floating-image-inner">
            <Image
              src={imageSources[2]}
              alt="Acabados del proyecto"
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <div className="project-process-section__floating-image-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectProcessSection;
