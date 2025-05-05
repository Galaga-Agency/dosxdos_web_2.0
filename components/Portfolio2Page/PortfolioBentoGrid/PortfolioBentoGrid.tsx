"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./PortfolioBentoGrid.scss";
import { initBentoRevealForTouchDevices } from "@/utils/animations/pages/portfolio-page-anim";
import useDeviceDetect from "@/hooks/useDeviceDetect";

interface Project {
  id: string;
  title: string;
  slug: string;
  image: string;
  category?: string;
}

interface PortfolioBentoGridProps {
  projects: Project[];
  bentoGridRef: React.RefObject<HTMLDivElement>;
}

const PortfolioBentoGrid: React.FC<PortfolioBentoGridProps> = ({
  projects,
  bentoGridRef,
}) => {
  const router = useRouter();
  const { isTouchDevice } = useDeviceDetect();
  const isAnimationInitialized = useRef(false);

  // Project click handler
  const handleProjectClick = (projectSlug: string) => {
    router.push(`/portfolio/${projectSlug}`);
  };

  useEffect(() => {
    // Only initialize once and only for touch devices
    if (bentoGridRef.current && isTouchDevice && !isAnimationInitialized.current) {
      initBentoRevealForTouchDevices(bentoGridRef.current);
      isAnimationInitialized.current = true;
    }
    
    // Cleanup function
    return () => {
      isAnimationInitialized.current = false;
    };
  }, [bentoGridRef, isTouchDevice]);

  return (
    <div className="portfolio-bento" ref={bentoGridRef}>
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`portfolio-bento__item portfolio-bento__item--${
            index + 1
          }`}
          onClick={() => handleProjectClick(project.slug)}
        >
          <div className="portfolio-bento__image-wrapper">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="portfolio-bento__image"
            />
          </div>

          <div className="portfolio-bento__hover-info">
            <span className="portfolio-bento__label">
              {project.category || "CREATIVE"}
            </span>
            <span className="portfolio-bento__title">{project.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioBentoGrid;