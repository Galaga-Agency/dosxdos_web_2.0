"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "./MasProyectosGrid.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

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
  projectsGridRef: React.RefObject<HTMLDivElement>;
}

const MasProyectosGrid: React.FC<MasProyectosGridProps> = ({
  projects,
  projectsGridRef,
}) => {
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const { isMobile } = useDeviceDetect();

  // Setup cursor bubble
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create cursor bubble
    const bubble = document.createElement("div");
    bubble.className = "cursor-bubble";
    bubble.innerHTML = "<span>Ver más</span>";
    document.body.appendChild(bubble);
    bubbleRef.current = bubble;

    let mouseX = 0;
    let mouseY = 0;
    let bubbleX = 0;
    let bubbleY = 0;

    // Mouse move handler
    const mouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Animation loop
    const animate = () => {
      const speed = 0.2;
      bubbleX += (mouseX - bubbleX) * speed;
      bubbleY += (mouseY - bubbleY) * speed;

      if (bubble) {
        bubble.style.left = bubbleX + "px";
        bubble.style.top = bubbleY + "px";
      }

      requestAnimationFrame(animate);
    };

    // Hover handlers
    const addHoverHandlers = () => {
      const items = document.querySelectorAll(".item");

      items.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          bubble.classList.add("active");
        });

        item.addEventListener("mouseleave", () => {
          bubble.classList.remove("active");
        });
      });
    };

    // Init
    document.addEventListener("mousemove", mouseMove);
    animate();
    setTimeout(addHoverHandlers, 500); // Delay slightly to ensure DOM is ready

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", mouseMove);
      if (bubble && document.body.contains(bubble)) {
        document.body.removeChild(bubble);
      }
    };
  }, []);

  return (
    <div className="mas-proyectos-grid" ref={projectsGridRef}>
      {projects.slice(0, 6).map((project, index) => (
        <Link
          key={project.id}
          href={`/portfolio/${project.slug}`}
          className={`item item-${index + 1}`}
        data-speed={!isMobile ? (0.8 + (index % 5) * 0.02).toFixed(2) : 0}
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
