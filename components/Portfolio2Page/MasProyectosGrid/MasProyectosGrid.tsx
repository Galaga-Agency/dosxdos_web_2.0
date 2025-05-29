"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import "./MasProyectosGrid.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import useCursorBubble from "@/hooks/useCursorBubble";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import { Project } from "@/types/project-types";

interface MasProyectosGridProps {
  projects: Project[];
}

const MasProyectosGrid: React.FC<MasProyectosGridProps> = ({ projects }) => {
  const { isMobile, isTablet } = useDeviceDetect();
  const [visibleCount, setVisibleCount] = useState(6);
  const [isRevealing, setIsRevealing] = useState(false);
  const projectItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasMoreProjects = visibleCount < projects.length;

  console.log("projects ----> ", projects)
  useEffect(() => {
    projectItemRefs.current = projectItemRefs.current.slice(0, projects.length);
  }, [projects]);

  useCursorBubble(
    !isMobile
      ? projectItemRefs.current
          .slice(0, visibleCount)
          .filter((ref): ref is HTMLAnchorElement => ref !== null)
          .map((ref) => ({ current: ref }))
      : [],
    { text: "Ver más" }
  );

  const handleRevealMore = () => {
    if (isRevealing || !hasMoreProjects) return;

    setIsRevealing(true);

    const buttonElement = buttonRef.current?.querySelector(
      ".hover-circle-button"
    );
    if (buttonElement) {
      gsap.to(buttonElement, {
        scale: 0.9,
        duration: 0.15,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(buttonElement, {
            scale: 1,
            duration: 0.25,
            ease: "back.out(1.7)",
          });
        },
      });
    }

    const currentVisible = visibleCount;
    const nextVisibleCount = Math.min(visibleCount + 6, projects.length);

    setVisibleCount(nextVisibleCount);

    setTimeout(() => {
      const allGridItems = gridRef.current?.querySelectorAll(".item");
      if (!allGridItems) return;

      const allItemsArray = Array.from(allGridItems);
      const newItems = allItemsArray.slice(currentVisible, nextVisibleCount);

      gsap.set(newItems, {
        opacity: 0,
        y: isMobile ? 30 : 50,
      });

      gsap.to(newItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: isMobile ? 0.15 : 0.1,
        ease: "power2.out",
        onComplete: () => {
          setIsRevealing(false);
        },
      });
    }, 50);
  };

  return (
    <div className="mas-proyectos-container">
      <div className="mas-proyectos-grid" ref={gridRef}>
        {projects.slice(0, visibleCount).map((project, index) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.slug}`}
            className={`item item-${(index % 6) + 1}`}
            data-speed={isMobile ? "0" : (0.8 + (index % 6) * 0.02).toFixed(2)}
            ref={(el) => (projectItemRefs.current[index] = el) as any}
          >
            <div className="item__overlay"></div>
            <div className="item__image-wrapper">
              <Image
                src={project.coverImage}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="item-image"
                unoptimized={true}
                data-speed={isMobile ? "0" : ".8"}
                data-lag="0"
                priority={index < 6}
              />
            </div>
            <div className="item__content">
              <h3 className="item__title">{project.name}</h3>
  
            </div>
          </Link>
        ))}
      </div>

      {hasMoreProjects && (
        <div className="reveal-more-container" ref={buttonRef}>
          <HoverCircleButton
            type="button"
            onClick={handleRevealMore}
            disabled={isRevealing}
            label={`Mostrar más`}
          />
        </div>
      )}
    </div>
  );
};

export default MasProyectosGrid;
