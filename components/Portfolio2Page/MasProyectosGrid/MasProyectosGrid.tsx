"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import "./MasProyectosGrid.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import useCursorBubble from "@/hooks/useCursorBubble";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  display: {
    masProyectosPage: boolean;
    portfolioPage: boolean;
  };
}

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
  const remainingProjects = projects.length - visibleCount;
  const nextBatchSize = Math.min(6, remainingProjects);

  // Set up refs for each project item
  useEffect(() => {
    projectItemRefs.current = projectItemRefs.current.slice(0, projects.length);
  }, [projects]);

  // Use cursor bubble hook only for visible items
  useCursorBubble(
    projectItemRefs.current
      .slice(0, visibleCount)
      .filter((ref): ref is HTMLAnchorElement => ref !== null)
      .map((ref) => ({ current: ref })),
    { text: "Ver más" }
  );

  const handleRevealMore = () => {
    if (isRevealing || !hasMoreProjects) return;

    setIsRevealing(true);

    // Button shrink animation on the HoverCircleButton
    const buttonElement = buttonRef.current?.querySelector(
      ".hover-circle-button"
    );
    if (buttonElement) {
      gsap.to(buttonElement, {
        scale: 0.8,
        duration: 0.15,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(buttonElement, {
            scale: 1,
            duration: 0.2,
            ease: "back.out(1.7)",
          });
        },
      });
    }

    // Store current visible count before updating
    const currentVisible = visibleCount;

    // Calculate next batch of items to reveal (always 6 more, or remaining if less than 6)
    const nextVisibleCount = Math.min(visibleCount + 6, projects.length);

    // Update visible count
    setVisibleCount(nextVisibleCount);

    // Use setTimeout to wait for React to re-render with new items
    setTimeout(() => {
      // Get ALL items in the grid after re-render
      const allGridItems = gridRef.current?.querySelectorAll(".item");
      if (!allGridItems) return;

      // Convert to array and get only the NEW items
      const allItemsArray = Array.from(allGridItems);
      const newItems = allItemsArray.slice(currentVisible, nextVisibleCount);

      // Set initial state for new items
      gsap.set(newItems, {
        opacity: 0,
        y: 50,
      });

      // Animate new items with curtain effect
      gsap.to(newItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        onComplete: () => {
          setIsRevealing(false);
        },
      });
    }, 100); // Give React time to re-render
  };

  return (
    <div className="mas-proyectos-container">
      <div className="mas-proyectos-grid" ref={gridRef}>
        {projects.slice(0, visibleCount).map((project, index) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.slug}`}
            className={`item item-${(index % 6) + 1}`}
            data-speed={
              !isMobile || !isTablet ? (0.8 + (index % 5) * 0.02).toFixed(2) : 0
            }
            ref={(el) => (projectItemRefs.current[index] = el) as any}
          >
            <div className="item__overlay"></div>
            <div className="item__image-wrapper">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="item-image"
                unoptimized={true}
                data-speed=".8"
                data-lag="0"
              />
            </div>
            <div className="item__content">
              <h3 className="item__title">{project.title}</h3>
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
            label="Más Proyectos"
          />
        </div>
      )}
    </div>
  );
};

export default MasProyectosGrid;
