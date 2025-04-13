"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SocialSidebar from "@/components/PortfolioPage/PortfolioUI/SocialSidebar/SocialSidebar";
import Filters from "@/components/PortfolioPage/PortfolioUI/Filters/Filters";
import Navigation from "@/components/PortfolioPage/PortfolioUI/Navigation/Navigation";
import ScrollIndicator from "@/components/PortfolioPage/PortfolioUI/ScrollIndicator/ScrollIndicator";
import IntroSection from "@/components/PortfolioPage/IntroSection/IntroSection";
import StatsSection from "@/components/PortfolioPage/StatsSection/StatsSection";
import ProjectSection from "@/components/PortfolioPage/ProjectSection/ProjectSection";
import CTASection from "@/components/PortfolioPage/CTASection/CTASection";
import { featuredProjects, projectCategories } from "@/data/projects";
import { getProjectsByCategory } from "@/utils/projects";
import styles from "./PortfolioPage.module.scss";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function PortfolioPage() {
  const [filter, setFilter] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState(featuredProjects);
  const [activeSection, setActiveSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  // Check for mobile/desktop on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is md breakpoint
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Clear any existing ScrollTriggers
  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  // Update filtered projects when filter changes
  useEffect(() => {
    setFilteredProjects(
      filter === "all"
        ? featuredProjects
        : getProjectsByCategory(filter).filter((p) => p.featured)
    );
  }, [filter]);

  // Setup horizontal scrolling (tablet/desktop only)
  useEffect(() => {
    if (!horizontalRef.current || !sectionsRef.current || isMobile) return;

    const container = horizontalRef.current;
    const sections = gsap.utils.toArray<HTMLElement>(
      `.${styles.section}`,
      sectionsRef.current
    );

    const horizontalScrollTrigger = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        id: "horizontal-scroll",
        trigger: container,
        pin: true,
        scrub: 0.6,
        snap: 1 / (sections.length - 1),
        start: "top top",
        end: `+=${container.offsetWidth}`,
        onUpdate: (self) => {
          const newActive = Math.round(self.progress * (sections.length - 1));
          if (newActive !== activeSection) setActiveSection(newActive);
        },
      },
    });

    return () => {
      horizontalScrollTrigger.kill();
      ScrollTrigger.getById("horizontal-scroll")?.kill();
    };
  }, [filteredProjects, isMobile]);

  // Setup vertical scrolling section detection (mobile only)
  useEffect(() => {
    if (!isMobile) return;

    const sections = document.querySelectorAll(`.${styles.verticalSection}`);

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        id: `vertical-section-${index}`,
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(index),
        onEnterBack: () => setActiveSection(index),
      });
    });

    return () => {
      sections.forEach((_, index) => {
        ScrollTrigger.getById(`vertical-section-${index}`)?.kill();
      });
    };
  }, [filteredProjects, isMobile]);

  const handleFilterChange = (newFilter: string) => {
    if (filter === newFilter || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setFilter(newFilter);
      setIsAnimating(false);
    }, 300);
  };

  const totalSections = 2 + filteredProjects.length + 1;

  return (
    <div className={styles.portfolioPage}>
      <SocialSidebar />
      <SocialSidebar isMobile={true} />
      {/* <Filters
        categories={projectCategories}
        currentFilter={filter}
        onFilterChange={handleFilterChange}
        isAnimating={isAnimating}
      />
      <Navigation
        totalSections={totalSections}
        activeSection={activeSection}
        onNavigate={() => {}}
      /> */}
      <ScrollIndicator />

      {/* Mobile Vertical Layout */}
      <div className={styles.verticalContainer}>
        <div className={styles.verticalSection}>
          <IntroSection isActive={activeSection === 0} />
        </div>

        <div className={styles.verticalSection}>
          <StatsSection isActive={activeSection === 1} />
        </div>

        {filteredProjects.map((project, index) => (
          <div key={project.id} className={styles.verticalSection}>
            <ProjectSection project={project} />
          </div>
        ))}

        <div className={styles.verticalSection}>
          <CTASection />
        </div>
      </div>

      {/* Tablet/Desktop Horizontal Layout */}
      <div
        className={styles.horizontalContainer}
        ref={horizontalRef}
        style={{ width: `${totalSections * 100}vw` }}
      >
        <div className={styles.sectionsContainer} ref={sectionsRef}>
          <section className={styles.section}>
            <IntroSection isActive={activeSection === 0} />
          </section>
          <section className={styles.section}>
            <StatsSection isActive={activeSection === 1} />
          </section>
          {filteredProjects.map((project) => (
            <section key={project.id} className={styles.section}>
              <ProjectSection project={project} />
            </section>
          ))}
          <section className={styles.section}>
            <CTASection />
          </section>
        </div>
      </div>
    </div>
  );
}