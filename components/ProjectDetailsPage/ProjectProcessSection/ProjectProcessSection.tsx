"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/types/project-types";
import { cleanupProjectDetailsAnimations } from "@/utils/animations/project-details-page-anim";
import { charAnimation } from "@/utils/animations/title-anim";
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
  const fullImageInnerRef = useRef<HTMLDivElement>(null);

  // Floating images refs
  const floatingImage1Ref = useRef<HTMLDivElement>(null);
  const floatingImage2Ref = useRef<HTMLDivElement>(null);
  const floatingImageInner1Ref = useRef<HTMLDivElement>(null);
  const floatingImageInner2Ref = useRef<HTMLDivElement>(null);

  // Track component mount state
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true);
    if (typeof window === "undefined") return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize animations with a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Run character animation for the title
      if (titleRef.current) {
        charAnimation(titleRef.current);
      }

      // Animate the label
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
          }
        );
      }

      // Animate the process text
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.5,
          }
        );
      }

      // Animate full width image
      if (fullImageRef.current && fullImageInnerRef.current) {
        // Parallax effect for the main image
        setupParallax(fullImageRef.current, fullImageInnerRef.current);
      }

      // Setup floating images parallax and animations
      setupFloatingImagesAnimation();

      // Refresh ScrollTrigger to ensure all animations are properly registered
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
      cleanupProjectDetailsAnimations();
    };
  }, []);

  // Setup parallax for main image
  const setupParallax = (
    containerEl: HTMLElement,
    targetEl: HTMLElement
  ): void => {
    gsap.set(targetEl, { y: 0 });

    const instance = ScrollTrigger.create({
      trigger: containerEl,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.to(targetEl, {
          y: `-${self.progress * 15}%`,
          ease: "none",
          overwrite: "auto",
        });
      },
    });
  };

  // Setup floating images animation
  const setupFloatingImagesAnimation = () => {
    // Animate corners for both floating images
    const floatingImages = [
      floatingImage1Ref.current,
      floatingImage2Ref.current,
    ].filter(Boolean);

    floatingImages.forEach((image) => {
      if (!image) return;

      const corners = image.querySelectorAll(".corner");
      gsap.fromTo(
        corners,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.5 }
      );
    });

    // Setup floating image 1 animation
    if (floatingImage1Ref.current) {
      gsap.fromTo(
        floatingImage1Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
      );

      // Parallax effect
      ScrollTrigger.create({
        trigger: floatingImage1Ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.8,
        onUpdate: (self) => {
          gsap.to(floatingImage1Ref.current, {
            y: `${self.progress * -25}%`,
            ease: "none",
            overwrite: "auto",
          });
        },
      });
    }

    // Setup floating image 1 inner parallax
    if (floatingImageInner1Ref.current) {
      ScrollTrigger.create({
        trigger: floatingImageInner1Ref.current.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          gsap.to(floatingImageInner1Ref.current, {
            y: `${self.progress * 15}%`,
            ease: "none",
            overwrite: "auto",
          });
        },
      });
    }

    // Setup floating image 2 animation
    if (floatingImage2Ref.current) {
      gsap.fromTo(
        floatingImage2Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
      );

      // Parallax effect
      ScrollTrigger.create({
        trigger: floatingImage2Ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.8,
        onUpdate: (self) => {
          gsap.to(floatingImage2Ref.current, {
            y: `${self.progress * -20}%`,
            ease: "none",
            overwrite: "auto",
          });
        },
      });
    }

    // Setup floating image 2 inner parallax
    if (floatingImageInner2Ref.current) {
      ScrollTrigger.create({
        trigger: floatingImageInner2Ref.current.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          gsap.to(floatingImageInner2Ref.current, {
            y: `${self.progress * -15}%`,
            ease: "none",
            overwrite: "auto",
          });
        },
      });
    }
  };

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
        <div
          ref={fullImageInnerRef}
          className="project-process-section__image-container"
        >
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

          <div
            ref={floatingImageInner1Ref}
            className="project-process-section__floating-image-inner"
          >
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

          <div
            ref={floatingImageInner2Ref}
            className="project-process-section__floating-image-inner"
          >
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
