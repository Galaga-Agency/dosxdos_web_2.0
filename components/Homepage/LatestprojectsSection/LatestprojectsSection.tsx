"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "./LatestProjectsSection.scss";

// Sample projects data - replace with your actual data structure
const sampleProjects = [
  {
    id: 1,
    title: "Carolina Herrera",
    category: "Retail",
    image: "/assets/img/projects/carolina-herrera.jpg",
    slug: "carolina-herrera",
  },
  {
    id: 2,
    title: "Frimancha Canarias",
    category: "Comercial",
    image: "/assets/img/projects/frimancha.jpg",
    slug: "frimancha-canarias",
  },
  {
    id: 3,
    title: "Sabina",
    category: "Retail",
    image: "/assets/img/projects/sabina.jpg",
    slug: "sabina",
  },
];

const LatestProjectsSection: React.FC = () => {
  return (
    <section className="latest-projects-section">
      <div className="marquee-container">
        <div className="marquee-track">
          <h1 className="marquee-text">
            {Array.from({ length: 50 }).map((_, i) => (
              <span key={i}>OUR WORK&nbsp;</span>
            ))}
          </h1>
        </div>
      </div>

      {/* Projects header */}
      <div className="container">
        <div className="section-header">
          <div className="section-title-container">
            <h2 className="section-title">Últimos proyectos</h2>
            <div className="title-decoration"></div>
          </div>
          <Link href="/proyectos" className="view-all-link">
            Ver todos los proyectos
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Projects grid */}
        <div className="projects-grid">
          {sampleProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <Link
                href={`/proyectos/${project.slug}`}
                className="project-link"
              >
                <div className="project-image-container">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <ArrowRight size={32} className="project-arrow" />
                  </div>
                </div>
                <div className="project-info">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mobile-cta">
          <Link href="/proyectos" className="cta-button">
            Descubrir Proyectos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestProjectsSection;
