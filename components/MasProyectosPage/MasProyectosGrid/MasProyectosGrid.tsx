"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "./MasProyectosGrid.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import useCursorBubble from "@/hooks/useCursorBubble";

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
  const { isMobile } = useDeviceDetect();
  const projectItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Set up refs for each project item
  useEffect(() => {
    projectItemRefs.current = projectItemRefs.current.slice(0, projects.length);
  }, [projects]);

  // Use our custom cursor bubble hook with all project items
  useCursorBubble(
    projectItemRefs.current
      .filter((ref): ref is HTMLAnchorElement => ref !== null)
      .map((ref) => ({ current: ref })),
    { text: "Ver más" }
  );

  return (
    <div className="mas-proyectos-grid">
      {projects.slice(0, 6).map((project, index) => (
        <Link
          key={project.id}
          href={`/portfolio/${project.slug}`}
          className={`item item-${index + 1}`}
          data-speed={!isMobile ? (0.8 + (index % 5) * 0.02).toFixed(2) : 0}
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
  );
};

export default MasProyectosGrid;
