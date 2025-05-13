"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project-types";
import { initHeroAnimations } from "@/utils/animations/pages/project-details-page-anim";
import "./HeroSection.scss";

interface HeroSectionProps {
  project: Project;
}

const HeroSection: React.FC<HeroSectionProps> = ({ project }) => {
  // Referencias para las animaciones
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLSpanElement>(null);
  const heroDescriptionRef = useRef<HTMLDivElement>(null);
  const heroMetaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inicializar animaciones cuando el componente se monta
    // Reducir el tiempo de espera para que las animaciones inicien más rápido
    const timer = setTimeout(() => {
      console.log("Inicializando animaciones de Hero Section");
      console.log("Referencias disponibles:", {
        heroSection: heroRef.current ? "✅" : "❌",
        heroImage: heroImageRef.current ? "✅" : "❌",
        heroTitle: heroTitleRef.current ? "✅" : "❌",
        heroSubtitle: heroSubtitleRef.current ? "✅" : "❌",
        heroDescription: heroDescriptionRef.current ? "✅" : "❌",
        heroMeta: heroMetaRef.current ? "✅" : "❌",
      });

      requestAnimationFrame(() => {
        initHeroAnimations({
          heroSection: heroRef.current,
          heroImage: heroImageRef.current,
          heroTitle: heroTitleRef.current,
          heroSubtitle: heroSubtitleRef.current,
          heroDescription: heroDescriptionRef.current,
          heroMeta: heroMetaRef.current,
        });
      });
    }, 100); // Reducir a 100ms

    return () => clearTimeout(timer);
  }, []);

  // Formatear fecha para mostrar
  const formattedDate = new Date(project.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  });

  // Obtener nombre de categoría
  const getCategoryName = (categorySlug: string) => {
    return categorySlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <section
      ref={heroRef}
      className="portfolio-hero"
      style={{ backgroundImage: `url(${project.image})` }}
    >
      <div ref={heroImageRef} className="portfolio-hero__wrapper">
        <div className="portfolio-hero__container">
          <div className="portfolio-hero__row">
            <div className="portfolio-hero__col-title">
              <div className="portfolio-hero__title-box">
                <h1
                  ref={heroTitleRef}
                  className="portfolio-hero__title char-animation"
                >
                  {project.title}
                </h1>
                <span
                  ref={heroSubtitleRef}
                  className="portfolio-hero__subtitle"
                >
                  {getCategoryName(project.category)}
                </span>
              </div>
            </div>

            <div className="portfolio-hero__col-desc">
              {/* Asegurar que la descripción tenga estructura correcta para SplitText */}
              <div
                ref={heroDescriptionRef}
                className="portfolio-hero__description"
              >
                <p>{project.description}</p>
                {project.longDescription && (
                  <p className="portfolio-hero__long-description">
                    {project.longDescription}
                  </p>
                )}
              </div>

              {/* Asegurar que los metadatos estén estructurados correctamente */}
              <div ref={heroMetaRef} className="portfolio-hero__meta-wrapper">
                <div className="portfolio-hero__meta">
                  <span>CLIENTE</span>
                  <h5>{project.client}</h5>
                </div>
                {project.services && (
                  <div className="portfolio-hero__meta">
                    <span>SERVICIOS</span>
                    <h5>{project.services.join(", ")}</h5>
                  </div>
                )}
                {project.location && (
                  <div className="portfolio-hero__meta">
                    <span>UBICACIÓN</span>
                    <h5>{project.location}</h5>
                  </div>
                )}
                <div className="portfolio-hero__meta">
                  <span>FECHA</span>
                  <h5>{formattedDate}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
