"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SocialSidebar from "@/components/PortfolioPage/PortfolioUI/SocialSidebar/SocialSidebar";
import ScrollIndicator from "@/components/PortfolioPage/PortfolioUI/ScrollIndicator/ScrollIndicator";
import IntroSection from "@/components/PortfolioPage/IntroSection/IntroSection";
import StatsSection from "@/components/PortfolioPage/StatsSection/StatsSection";
import ProjectSection from "@/components/PortfolioPage/ProjectSection/ProjectSection";
import CategorySection from "@/components/PortfolioPage/CategoriesSection/CategoriesSection";
import CTASection from "@/components/PortfolioPage/CTASection/CTASection";
import { featuredProjects } from "@/data/projects";
import { getProjectsByCategory } from "@/utils/projects";
import styles from "./PortfolioPage.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioPage() {
  const [filter, setFilter] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState(featuredProjects);
  const [activeSection, setActiveSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Kill any existing ScrollTriggers
  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  // Filter logic
  useEffect(() => {
    setFilteredProjects(
      filter === "all"
        ? featuredProjects
        : getProjectsByCategory(filter).filter((p) => p.featured)
    );
  }, [filter]);

  // Horizontal scroll (desktop/tablet)
  useEffect(() => {
    if (!horizontalRef.current || !sectionsRef.current || isMobile) return;

    const container = horizontalRef.current;
    const sections = gsap.utils.toArray<HTMLElement>(
      `.${styles.section}`,
      sectionsRef.current
    );

    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    const horizontalScrollTrigger = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        id: "horizontal-scroll",
        trigger: container,
        pin: true,
        scrub: 1, // smooth scroll
        start: "top top",
        end: () => `+=${container.offsetWidth}`,
        onUpdate: (self: any) => {
          const newActive = Math.round(self.progress * (sections.length - 1));
          if (newActive !== activeSection) setActiveSection(newActive);
        },
      },
    });

    scrollTriggerRef.current = horizontalScrollTrigger.scrollTrigger as any;

    return () => {
      horizontalScrollTrigger.kill();
      ScrollTrigger.getById("horizontal-scroll")?.kill();
    };
  }, [filteredProjects, isMobile]);

  // Vertical scroll (mobile)
  useEffect(() => {
    if (!isMobile) return;

    const sections = document.querySelectorAll(`.${styles.verticalSection}`);

    const triggers = Array.from(sections).map((section, index) =>
      ScrollTrigger.create({
        id: `vertical-section-${index}`,
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(index),
        onEnterBack: () => setActiveSection(index),
      })
    );

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [filteredProjects, isMobile]);

  const totalSections = 4 + filteredProjects.length;

  return (
    <div className={styles.portfolioPage}>
      <SocialSidebar />
      <SocialSidebar isMobile={true} />

      {/* Mobile layout */}
      <div className={styles.verticalContainer}>
        <div className={styles.verticalSection}>
          <IntroSection isActive={activeSection === 0} />
        </div>

        <div className={styles.verticalSection}>
          <StatsSection isActive={activeSection === 1} />
        </div>

        {filteredProjects.map((project, index) => (
          <div key={project.id} className={styles.verticalSection}>
            <ProjectSection
              project={project}
              isActive={activeSection === index + 2}
              projectIndex={index}
            />
          </div>
        ))}

        <div className={styles.verticalSection}>
          <CategorySection
            isActive={activeSection === filteredProjects.length + 2}
          />
        </div>

        <div className={styles.verticalSection}>
          <CTASection
            isActive={activeSection === filteredProjects.length + 3}
          />
        </div>
      </div>

      {/* Desktop/Tablet horizontal layout */}
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

          {filteredProjects.map((project, index) => (
            <section key={project.id} className={styles.section}>
              <ProjectSection
                project={project}
                isActive={activeSection === index + 2}
                projectIndex={index}
              />
            </section>
          ))}

          <section className={styles.section}>
            <CategorySection
              isActive={activeSection === filteredProjects.length + 2}
            />
          </section>

          <section className={styles.section}>
            <CTASection
              isActive={activeSection === filteredProjects.length + 3}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
