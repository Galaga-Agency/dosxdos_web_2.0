"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  onImagesLoad?: () => void;
}

const MasProyectosGrid: React.FC<MasProyectosGridProps> = ({
  projects,
  onImagesLoad,
}) => {
  const { isMobile, isTablet } = useDeviceDetect();
  const [visibleCount, setVisibleCount] = useState(6);
  const [isRevealing, setIsRevealing] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set<number>());
  const projectItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasMoreProjects = visibleCount < projects.length;

  // Track initial visible images (first 6)
  const initialImageCount = Math.min(6, projects.length);

  console.log("projects ----> ", projects);

  useEffect(() => {
    projectItemRefs.current = projectItemRefs.current.slice(0, projects.length);
  }, [projects]);

  // Handle individual image load
  const handleImageLoad = useCallback(
    (imageIndex: number) => {
      setLoadedImages((prev) => {
        const newSet = new Set(prev);
        newSet.add(imageIndex);

        // Check if all initial images are loaded
        if (newSet.size === initialImageCount && onImagesLoad) {
          setTimeout(onImagesLoad, 50);
        }

        return newSet;
      });
    },
    [onImagesLoad, initialImageCount]
  );

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
      const allItems = gridRef.current?.querySelectorAll(".item");
      if (!allItems) return;

      const itemsToReveal = Array.from(allItems).slice(
        currentVisible,
        nextVisibleCount
      );

      // Just remove the class - CSS transition handles the fade
      itemsToReveal.forEach((item: any, index: number) => {
        setTimeout(() => {
          item.classList.remove("is-hidden");
          item.style.pointerEvents = "auto";
        }, index * 100); // Stagger the reveals
      });

      // Wait for all animations to complete
      setTimeout(() => {
        setIsRevealing(false);
      }, itemsToReveal.length * 100 + 1000);
    }, 50);
  };

  // Function to get consistent random speed per index
  const getRandomSpeed = (index: number) => {
    // Use index as seed for consistent random values
    const seed = index * 0.1234;
    const random = (Math.sin(seed) + 1) / 2; // Pseudo-random between 0-1
    return (0.8 + random * 0.2).toFixed(2); // Random between 0.8 and 1.0
  };

  // Function to get the correct item class based on index
  const getItemClass = (index: number) => {
    const itemNumber = (index % 18) + 1; // Create pattern for 18 different layouts
    return `item item-${itemNumber}`;
  };

  return (
    <div className="mas-proyectos-container">
      <div className="mas-proyectos-grid" ref={gridRef}>
        {/* Render ALL projects for parallax */}
        {projects.map((project, index) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.slug}`}
            className={`${getItemClass(index)} ${
              index >= visibleCount ? "is-hidden" : ""
            }`}
            data-speed={isMobile ? "0" : getRandomSpeed(index)}
            ref={(el: any) => (projectItemRefs.current[index] = el) as any}
          >
            <div className="item__overlay"></div>
            <div
              className={`item__image-wrapper hero-image-wrapper ${
                loadedImages.has(index) ? "loaded" : "loading"
              }`}
            >
              <Image
                src={project.portfolioThumbnail || project.coverImage}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="item-image"
                unoptimized={true}
                onLoad={() => handleImageLoad(index)}
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

      {/* Absolutely positioned button exactly where you drew it */}
      {hasMoreProjects && (
        <div className="floating-button" ref={buttonRef}>
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
