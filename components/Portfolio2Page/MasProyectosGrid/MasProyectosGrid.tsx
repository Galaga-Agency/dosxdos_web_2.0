"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import "./MasProyectosGrid.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import useCursorBubble from "@/hooks/useCursorBubble";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import AdminProjectOrdering from "@/components/AdminProjectOrdering/AdminProjectOrdering";
import { Project } from "@/types/project-types";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

interface MasProyectosGridProps {
  projects: Project[];
  onImagesLoad?: () => void;
  isAdmin?: boolean; // Add this prop to check if user is admin
  onUpdateProjectOrder?: (updatedProjects: Project[]) => Promise<void>; // Add this for saving
}

const MasProyectosGrid: React.FC<MasProyectosGridProps> = ({
  projects,
  onImagesLoad,
  isAdmin = false,
  onUpdateProjectOrder,
}) => {
  const { isMobile, isTablet } = useDeviceDetect();
  const [visibleCount, setVisibleCount] = useState(6);
  const [isRevealing, setIsRevealing] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set<number>());
  const [showAdminOrdering, setShowAdminOrdering] = useState(false);
  const projectItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Sort projects by order field, then by year if no order
  const sortedProjects = React.useMemo(() => {
    return [...projects].sort((a, b) => {
      // If both have order, sort by order
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      // If only one has order, prioritize it
      if (a.order !== undefined && b.order === undefined) {
        return -1;
      }
      if (a.order === undefined && b.order !== undefined) {
        return 1;
      }
      // If neither has order, sort by year (newest first)
      const yearA = parseInt(a.year.toString());
      const yearB = parseInt(b.year.toString());
      return yearB - yearA;
    });
  }, [projects]);

  const hasMoreProjects = visibleCount < sortedProjects.length;
  const initialImageCount = Math.min(6, sortedProjects.length);

  useEffect(() => {
    projectItemRefs.current = projectItemRefs.current.slice(
      0,
      sortedProjects.length
    );
  }, [sortedProjects]);

  // Handle individual image load
  const handleImageLoad = useCallback(
    (imageIndex: number) => {
      setLoadedImages((prev) => {
        const newSet = new Set(prev);
        newSet.add(imageIndex);

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
    const nextVisibleCount = Math.min(visibleCount + 6, sortedProjects.length);

    setVisibleCount(nextVisibleCount);

    setTimeout(() => {
      const allItems = gridRef.current?.querySelectorAll(".item");
      if (!allItems) return;

      const itemsToReveal = Array.from(allItems).slice(
        currentVisible,
        nextVisibleCount
      );

      itemsToReveal.forEach((item: any, index: number) => {
        setTimeout(() => {
          item.classList.remove("is-hidden");
          item.style.pointerEvents = "auto";
        }, index * 100);
      });

      setTimeout(() => {
        setIsRevealing(false);
      }, itemsToReveal.length * 100 + 1000);
    }, 50);
  };

  const getRandomSpeed = (index: number) => {
    const seed = index * 0.1234;
    const random = (Math.sin(seed) + 1) / 2;
    return (0.8 + random * 0.2).toFixed(2);
  };

  const getItemClass = (index: number) => {
    const itemNumber = (index % 18) + 1;
    return `item item-${itemNumber}`;
  };

  const handleSaveProjectOrder = async (updatedProjects: Project[]) => {
    if (onUpdateProjectOrder) {
      await onUpdateProjectOrder(updatedProjects);
      setShowAdminOrdering(false);
    }
  };

  return (
    <div className="mas-proyectos-container">
      {/* Admin controls */}
      {isAdmin && (
        <div className="admin-controls">
          <PrimaryButton
            onClick={() => setShowAdminOrdering(true)}
          >
            Reordenar Proyectos
          </PrimaryButton>
        </div>
      )}

      <div className="mas-proyectos-grid" ref={gridRef}>
        {sortedProjects.map((project, index) => (
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

            {/* Show order number for admin */}
            {isAdmin && (
              <div className="admin-order-indicator">
                {project.order || index + 1}
              </div>
            )}
          </Link>
        ))}
      </div>

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

      {/* Admin ordering interface */}
      <AdminProjectOrdering
        projects={sortedProjects}
        onSaveOrder={handleSaveProjectOrder}
        isVisible={showAdminOrdering}
        onClose={() => setShowAdminOrdering(false)}
      />

      {/* Close admin overlay */}
      {showAdminOrdering && (
        <button
          type="button"
          onClick={() => setShowAdminOrdering(false)}
          className="admin-overlay-close"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default MasProyectosGrid;
