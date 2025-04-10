"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { charAnimation } from "@/utils/animations/title-anim";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import { featuredProjects } from "@/data/projects";
import { projectCategories } from "@/data/projects";
import { getProjectsByCategory } from "@/utils/projects";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import "./PortfolioPage.scss";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const PortfolioPage: React.FC = () => {
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const [filter, setFilter] = useState<string>("all");
  const horizontalRef: any = useRef<HTMLDivElement>(null);
  const sectionsRef: any = useRef<HTMLDivElement>(null);
  const [filteredProjects, setFilteredProjects] = useState(featuredProjects);
  const [activeSection, setActiveSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Use your horizontal scroll hook
  useHorizontalScroll(horizontalRef, sectionsRef, {
    sectionSelector: ".portfolio-section",
    scrub: 1,
    start: "top top",
    pinSpacing: true,
    onUpdate: (self) => {
      // Track progress to highlight active section
      const totalSections =
        document.querySelectorAll(".portfolio-section").length;
      const newActiveSection = Math.round(self.progress * (totalSections - 1));
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    },
  });

  // Complex animation setup for each section
  useEffect(() => {
    // Ensure window is defined and components are ready
    if (
      typeof window === "undefined" ||
      !horizontalRef.current ||
      !sectionsRef.current ||
      !isReady
    )
      return;

    const mainScrollTrigger = ScrollTrigger.getAll().find((t) => {
      const triggerEl = t?.vars?.trigger;
      return (
        triggerEl instanceof Element &&
        horizontalRef.current instanceof Element &&
        triggerEl.isSameNode(horizontalRef.current)
      );
    });

    if (!mainScrollTrigger || typeof mainScrollTrigger.scroll !== "function") {
      console.warn(
        "❌ Skipping animation: mainScrollTrigger not ready",
        mainScrollTrigger
      );
      return;
    }

    // Create custom animation for each section
    const sections = document.querySelectorAll(".portfolio-section");
    sections.forEach((section, index) => {
      // Get all elements within the section that need animation
      const title = section.querySelector(".section-title");
      const content = section.querySelector(".section-content");
      const images = section.querySelectorAll(".section-image");
      const stats = section.querySelectorAll(".stat-item");
      const valueItems = section.querySelectorAll(".value-item");
      const details = section.querySelector(".project-details");
      const projectImage = section.querySelector(".project-image");
      const ctaElements = section.querySelectorAll(".cta-element");

      // Create a complex timeline for each section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          containerAnimation: mainScrollTrigger.animation,
          start: "left center",
          toggleActions: "play none none reverse",
          id: `section-${index}`,
        },
      });

      // Add animations to timeline based on section content
      if (title) {
        tl.fromTo(
          title,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          0
        );
      }

      if (content) {
        tl.fromTo(
          content,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          0.2
        );
      }

      if (images && images.length > 0) {
        tl.fromTo(
          images,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          0.3
        );
      }

      if (stats && stats.length > 0) {
        tl.fromTo(
          stats,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power1.out",
          },
          0.2
        );

        // Add counter animation for stat numbers
        stats.forEach((stat) => {
          const numElement: any = stat.querySelector(".stat-number");
          if (numElement) {
            const endValue = parseInt(
              numElement.textContent.replace(/\D/g, "")
            );
            tl.fromTo(
              numElement,
              { innerText: 0 },
              {
                innerText: endValue,
                duration: 1.5,
                ease: "power2.out",
                snap: { innerText: 1 },
                onUpdate: () => {
                  numElement.textContent =
                    "+" +
                    Math.floor(
                      gsap.getProperty(numElement, "innerText") as any
                    );
                },
              },
              0.4
            );
          }
        });
      }

      if (valueItems && valueItems.length > 0) {
        tl.fromTo(
          valueItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "power2.out",
          },
          0.3
        );
      }

      if (details) {
        tl.fromTo(
          details,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          0.2
        );
      }

      if (projectImage) {
        tl.fromTo(
          projectImage,
          { x: 40, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
          0.4
        );
      }

      if (ctaElements && ctaElements.length > 0) {
        tl.fromTo(
          ctaElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          0.3
        );
      }
    });

    // Add scroll indicator animation
    gsap.to(".scroll-indicator", {
      x: 10,
      opacity: 0.7,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Animate filter buttons
    gsap.fromTo(
      ".portfolio-filter-btn",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power1.out" }
    );

    // Cleanup
    return () => {
      // Only cleanup animations created in this effect
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id && trigger.vars.id.startsWith("section-")) {
          trigger.kill();
        }
      });
    };
  }, [activeSection, isReady, filteredProjects]);

  // Title animation with character splitting
  useEffect(() => {
    if (mainTitleRef.current) {
      charAnimation(mainTitleRef.current);
    }
  }, []);

  // Mark component as ready after initial mount
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Custom navigation between sections
  const navigateToSection = (index: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const sections = document.querySelectorAll(".portfolio-section");

    if (index >= 0 && index < sections.length) {
      const allTriggers = ScrollTrigger.getAll();
      const mainScrollTrigger = allTriggers.find(
        (t) => t.vars.trigger === horizontalRef.current
      );

      if (mainScrollTrigger) {
        // Calculate the scroll position for the target section
        const progress = index / (sections.length - 1);
        mainScrollTrigger.scroll(progress * mainScrollTrigger.end);

        // Update active section
        setActiveSection(index);

        // Reset animation flag after animation completes
        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      }
    }
  };

  // Filter projects based on category with complex logic
  useEffect(() => {
    // Apply filtering logic
    if (filter === "all") {
      setFilteredProjects(featuredProjects);
    } else {
      const filtered = getProjectsByCategory(filter).filter(
        (project: any) => project.featured
      );
      setFilteredProjects(filtered.length > 0 ? filtered : featuredProjects);
    }

    // Reset to first project section when filter changes
    if (horizontalRef.current && sectionsRef.current) {
      setTimeout(() => {
        navigateToSection(2); // Navigate to first project (after intro and stats)
      }, 100);
    }
  }, [filter]);

  // Handle filter change with debounce
  const handleFilterChange = (newFilter: string) => {
    if (filter === newFilter || isAnimating) return;

    setIsAnimating(true);
    gsap.to(".portfolio-filter-btn", {
      scale: 1,
      duration: 0.3,
      ease: "power1.out",
    });

    gsap.to(`.portfolio-filter-btn[data-filter="${newFilter}"]`, {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });

    setTimeout(() => {
      setFilter(newFilter);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="portfolio-page">
      {/* Fixed elements */}
      <div className="portfolio-social-sidebar">
        <div className="portfolio-social-wrapper">
          <span className="portfolio-social-label">Síguenos</span>
          <SocialIcons orientation="vertical" color="primary" />
        </div>
      </div>

      <div className="portfolio-filters">
        {projectCategories.slice(0, 5).map((category) => (
          <button
            key={category.id}
            data-filter={category.id}
            className={`portfolio-filter-btn ${
              filter === category.id ? "active" : ""
            }`}
            onClick={() => handleFilterChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Horizontal scrolling container */}
      <div className="portfolio-horizontal" ref={horizontalRef}>
        <div className="portfolio-sections" ref={sectionsRef}>
          {/* Intro section */}
          <section className="portfolio-section intro-section">
            <div className="section-container">
              <h1 ref={mainTitleRef} className="section-title main-title">
                Proyectos que hablan por si solos
              </h1>
              <div className="section-content">
                <p className="intro-text">
                  Nos encargamos de la{" "}
                  <strong>gestión integral de las firmas</strong>. Estudiamos
                  las necesidades específicas de cada proyecto y diseñamos
                  basándonos en las especificaciones de la firma.
                  Posteriormente, realizamos los planos técnicos, producción de
                  materiales e instalación en el punto de venta.
                </p>
                <div className="intro-images">
                  <div className="intro-image section-image">
                    <Image
                      src="/assets/img/blog/color-psychology.jpg"
                      alt="Portfolio showcase"
                      width={400}
                      height={320}
                      className="img-fluid"
                      priority
                    />
                  </div>
                  <div className="intro-image section-image">
                    <Image
                      src="/assets/img/blog/minimalist-spaces.jpg"
                      alt="Portfolio showcase"
                      width={400}
                      height={320}
                      className="img-fluid"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Overview section with stats */}
          <section className="portfolio-section overview-section">
            <div className="section-container">
              <div className="company-stats">
                <div className="stat-item">
                  <span className="stat-number">+21</span>
                  <span className="stat-label">Proyectos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">+17</span>
                  <span className="stat-label">Años en negocio</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">+86</span>
                  <span className="stat-label">Premios</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">+4</span>
                  <span className="stat-label">Oficinas</span>
                </div>
              </div>

              <div className="company-values">
                <div className="value-item">
                  <h3 className="value-title">
                    El concepto correcto para el cliente correcto
                  </h3>
                  <p>
                    Proyectos únicos y reconocibles tienen un concepto sólido
                    que los sustenta.
                  </p>
                </div>
                <div className="value-item">
                  <h3 className="value-title">La belleza atrae personas</h3>
                  <p>
                    El diseño y la estética son fundamentales para captar la
                    atención del público.
                  </p>
                </div>
                <div className="value-item">
                  <h3 className="value-title">Enfoque en el significado</h3>
                  <p>
                    Cada elemento tiene un propósito y cuenta una historia
                    dentro del proyecto.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured projects */}
          {filteredProjects.map((project) => (
            <section
              key={project.id}
              className="portfolio-section project-section"
            >
              <div className="section-container">
                <div className="project-content">
                  <div className="project-details">
                    <span className="project-category">
                      {projectCategories.find(
                        (cat) => cat.id === project.category
                      )?.name || project.category}
                    </span>
                    <h2 className="section-title">{project.title}</h2>
                    <div className="section-content">
                      <p>{project.description}</p>
                      <Link
                        href={`/proyectos/${project.slug}`}
                        className="view-project-btn"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                  <div className="project-image section-image">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="project-img"
                      priority
                    />
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* Final CTA section */}
          <section className="portfolio-section cta-section">
            <div className="section-container">
              <h2 className="section-title cta-element">
                Construyamos juntos el próximo gran proyecto
              </h2>
              <div className="section-content cta-content">
                <div className="keep-in-touch">
                  <div className="keep-in-touch-logo cta-element">
                    <span>Keep</span>
                    <span>In</span>
                    <span>Touch</span>
                  </div>
                  <Link href="/contacto" className="contact-btn cta-element">
                    Contáctanos
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Navigation dots */}
        <div className="section-navigation">
          {Array.from({ length: 2 + filteredProjects.length + 1 }).map(
            (_, index) => (
              <button
                key={index}
                className={`nav-dot ${activeSection === index ? "active" : ""}`}
                onClick={() => navigateToSection(index)}
                aria-label={`Navigate to section ${index + 1}`}
              />
            )
          )}
        </div>

        <div className="scroll-indicator">
          <span>Deslizar</span>
          <div className="scroll-arrow">→</div>
        </div>
      </div>

      {/* Mobile social section - only visible on mobile */}
      <div className="portfolio-mobile-social">
        <div className="portfolio-mobile-social-header">
          <h3 className="portfolio-mobile-social-title">Síguenos</h3>
          <div className="portfolio-mobile-social-divider"></div>
        </div>
        <SocialIcons orientation="horizontal" color="primary" />
      </div>
    </div>
  );
};

export default PortfolioPage;
