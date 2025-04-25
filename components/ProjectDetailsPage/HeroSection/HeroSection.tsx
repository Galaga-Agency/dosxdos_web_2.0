"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project-types";
import { initHeroAnimations } from "@/utils/animations/project-details-page-anim";
import "./HeroSection.scss";

interface HeroSectionProps {
  project: Project;
}

const HeroSection: React.FC<HeroSectionProps> = ({ project }) => {
  // Reference objects for animations
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLSpanElement>(null);
  const heroDescriptionRef = useRef<HTMLDivElement>(null);
  const heroMetaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize animations when component mounts
    const timer = setTimeout(() => {
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
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Format date for display
  const formattedDate = new Date(project.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  });

  // Get project category name
  const getCategoryName = (categorySlug: string) => {
    // Convert slug to display format (e.g., "espacios-promocionales" to "Espacios Promocionales")
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
      {/* <div className="portfolio-hero__website-link">
        <a href="#" className="portfolio-hero__link">
          Ver Proyecto
          <span>→</span>
        </a>
      </div> */}

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
                  className="portfolio-hero__subtitle tp_title_anim"
                >
                  {getCategoryName(project.category)}
                </span>
              </div>
            </div>

            <div className="portfolio-hero__col-desc">
              <div
                ref={heroDescriptionRef}
                className="portfolio-hero__description tp_title_anim"
              >
                <p>{project.description}</p>
                {project.longDescription && (
                  <p className="portfolio-hero__long-description">
                    {project.longDescription}
                  </p>
                )}
              </div>

              <div ref={heroMetaRef} className="portfolio-hero__meta-wrapper">
                <div className="portfolio-hero__meta tp_fade_bottom">
                  <span>CLIENTE</span>
                  <h5>{project.client}</h5>
                </div>
                {project.services && (
                  <div className="portfolio-hero__meta tp_fade_bottom">
                    <span>SERVICIOS</span>
                    <h5>{project.services.join(", ")}</h5>
                  </div>
                )}
                {project.location && (
                  <div className="portfolio-hero__meta tp_fade_bottom">
                    <span>UBICACIÓN</span>
                    <h5>{project.location}</h5>
                  </div>
                )}
                <div className="portfolio-hero__meta tp_fade_bottom">
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
