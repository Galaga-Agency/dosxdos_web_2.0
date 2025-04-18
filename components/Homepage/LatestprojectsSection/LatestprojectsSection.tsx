"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  panelTwoAnimation,
  clearScrollTriggers,
} from "@/utils/animations/panel-animation";
import "./LatestProjectsSection.scss"

const projectData = [
  {
    id: 1,
    title: "Kasino Recreativo",
    description: "Diseño de interiores y ambientación para salón de juegos con iluminación atmosférica y elementos decorativos personalizados.",
    category: "Interiorismo Comercial",
    location: "Madrid, España",
    image: "/assets/img/portfolio/interiorismo-comercial/interiorismo-comercial-2.jpg",
    link: "/portfolio/kasino-recreativo",
  },
  {
    id: 2,
    title: "Café Modernista",
    description: "Renovación completa de espacio gastronómico con enfoque en materiales sostenibles y diseño contemporáneo que respeta la arquitectura original.",
    category: "Hostelería",
    location: "Barcelona, España",
    image: "/assets/img/portfolio/shop-in-shop/shop-in-shop-3.jpg",
    link: "/portfolio/cafe-modernista",
  },
  {
    id: 3,
    title: "Boutique Eleganza",
    description: "Conceptualización y ejecución de tienda de moda exclusiva con áreas diferenciadas y sistema de iluminación que realza cada colección.",
    category: "Retail",
    location: "Valencia, España",
    image: "/assets/img/blog/visual-storytelling.jpg",
    link: "/portfolio/boutique-eleganza",
  },
];

const LatestProjectsSection: React.FC = () => {
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    // Only initialize once
    if (!initialized.current) {
      // Clean up any existing ScrollTrigger instances first
      clearScrollTriggers();

      // Short timeout to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        panelTwoAnimation();
        initialized.current = true;
      }, 100);

      return () => {
        clearTimeout(timer);
        clearScrollTriggers();
      };
    }

    // Cleanup when component unmounts
    return () => {
      clearScrollTriggers();
    };
  }, []);

  return (
    <section className="latest-projects">
      {/* Header section with title and subtitle */}
      <div className="latest-projects__header-container">
        <div className="latest-projects__header">
          <h2 className="latest-projects__title">
            NUESTRO <span className="highlight">TRABAJO</span>
          </h2>
          <p className="latest-projects__subtitle">
            Una selección de nuestros proyectos más recientes
          </p>
        </div>
      </div>

      {/* Projects panel area */}
      <div className="project-panel-area">
        {projectData.map((project) => (
          <div key={project.id} className="project-panel">
            <div className="project-panel__image">
              <Image
                src={project.image}
                alt={project.title}
                width={1920}
                height={1080}
                className="project-panel__image-file"
                priority={project.id === 1}
              />
              <div className="project-panel__overlay"></div>
            </div>

            <div className="project-panel__content">
              <h3 className="project-panel__title">{project.title}</h3>
              <Link href={project.link} className="project-panel__link">
                Ver Proyecto
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestProjectsSection;