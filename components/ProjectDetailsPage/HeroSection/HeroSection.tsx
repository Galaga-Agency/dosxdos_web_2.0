"use client";

import React from "react";
import { Project } from "@/types/project-types";
import "./HeroSection.scss";

interface HeroSectionProps {
  project: Project;
}

const HeroSection: React.FC<HeroSectionProps> = ({ project }) => {
  const formattedYear =
    project.year?.toString() || new Date().getFullYear().toString();

  console.log("project.categories:", project.categories);

  return (
    <section
      className="portfolio-hero"
      style={{ backgroundImage: `url(${project.coverImage})` }}
    >
      <div className="portfolio-hero__wrapper">
        <div className="portfolio-hero__container container">
          <div className="portfolio-hero__row">
            <div className="portfolio-hero__col-title">
              <div className="portfolio-hero__title-box">
                <h1 className="portfolio-hero__title title char-animation">
                  {project.name}
                </h1>

                <div className="portfolio-hero__categories">
                  {project?.categories?.map((category, index) => (
                    <span
                      className="portfolio-hero__subtitle"
                      key={index}
                      style={{ opacity: 1 }}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="portfolio-hero__col-desc">
              <div className="portfolio-hero__description rollup-text">
                <p>{project.description}</p>
              </div>

              <div className="portfolio-hero__meta-wrapper">
                <div className="portfolio-hero__meta">
                  <span>CLIENTE</span>
                  <h5>{project.client}</h5>
                </div>

                {project.location && (
                  <div className="portfolio-hero__meta">
                    <span>UBICACIÓN</span>
                    <h5>{project.location}</h5>
                  </div>
                )}

                <div className="portfolio-hero__meta">
                  <span>AÑO</span>
                  <h5>{formattedYear}</h5>
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
