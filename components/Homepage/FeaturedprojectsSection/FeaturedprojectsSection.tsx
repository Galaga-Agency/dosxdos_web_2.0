"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { refreshScrollTrigger } from "@/utils/animations/scrolltrigger-config";
import "./FeaturedprojectsSection.scss";
import { projects } from "@/data/projects";
import {
  clearScrollTriggers,
  panelAnimation,
} from "@/utils/animations/components/panel-animation";

const FeaturedprojectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  console.log("[FeaturedProjects] Component initializing, isFirstRender:", isFirstRender.current);
  
  const featuredProjects = projects.filter(
    (project) => project.display.homepage === true
  );
  console.log("[FeaturedProjects] Filtered featured projects:", featuredProjects.length);

  useEffect(() => {
    console.log("[FeaturedProjects] useEffect running, isFirstRender:", isFirstRender.current);
    
    // We need a flag to track if the component is mounted
    let isMounted = true;

    // Don't freeze body scroll immediately - wait for cleanup first
    console.log("[FeaturedProjects] Clearing ScrollTriggers");
    
    // Check existing ScrollTriggers
    if (typeof window !== "undefined" && window.ScrollTrigger) {
      const existingTriggers = window.ScrollTrigger.getAll();
      console.log(`[FeaturedProjects] Existing ScrollTriggers before clearing: ${existingTriggers.length}`);
    }
    
    clearScrollTriggers();
    
    // Check ScrollTriggers after clearing
    if (typeof window !== "undefined" && window.ScrollTrigger) {
      const remainingTriggers = window.ScrollTrigger.getAll();
      console.log(`[FeaturedProjects] Remaining ScrollTriggers after clearing: ${remainingTriggers.length}`);
    }

    // Add a longer delay on first render, shorter on subsequent renders
    const initialDelay = isFirstRender.current ? 800 : 300;
    console.log(`[FeaturedProjects] Using initial delay: ${initialDelay}ms`);
    isFirstRender.current = false;

    // Add a small delay to ensure DOM is ready
    console.log("[FeaturedProjects] Setting up timer for panel animation");
    const timer = setTimeout(() => {
      if (!isMounted) {
        console.log("[FeaturedProjects] Component unmounted before timer completed");
        return;
      }

      console.log("[FeaturedProjects] Initializing panel animation");
      // Check smoother state before panel animation
      if (typeof window !== "undefined" && (window as any).__smoother__) {
        console.log("[FeaturedProjects] Smoother state before panel animation:", {
          exists: true,
          paused: (window as any).__smoother__.paused()
        });
      } else {
        console.log("[FeaturedProjects] No smoother found before panel animation");
      }
      
      // Initialize the panel animation only after first render is complete
      panelAnimation();
      
      // Force a refresh of ScrollTrigger after panel animation is set up
      // This is the fix for the Panel 3 detection issue
      setTimeout(() => {
        if (typeof window !== "undefined" && window.ScrollTrigger) {
          console.log("[FeaturedProjects] Forcing ScrollTrigger refresh after panel animation");
          window.ScrollTrigger.refresh();
        }
      }, 1000);
      
      // Check ScrollTriggers after panel animation
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        const panelTriggers = window.ScrollTrigger.getAll();
        console.log(`[FeaturedProjects] ScrollTriggers after panel animation: ${panelTriggers.length}`);
        
        // Log details of each trigger
        panelTriggers.forEach((trigger: { vars: { id: any; trigger: { classList: { toString: () => any; }; }; }; }, i: number) => {
          console.log(`[FeaturedProjects] Trigger ${i+1}:`, {
            id: trigger.vars?.id || "unnamed",
            trigger: trigger.vars?.trigger?.classList?.toString() || "no trigger element"
          });
        });
      }

      // Force refresh ScrollTrigger with a small delay
      setTimeout(() => {
        if (!isMounted) {
          console.log("[FeaturedProjects] Component unmounted before first refresh");
          return;
        }
        
        console.log("[FeaturedProjects] First ScrollTrigger refresh");
        refreshScrollTrigger();
        
        // Force another refresh after a longer delay to catch any stragglers
        setTimeout(() => {
          if (!isMounted) {
            console.log("[FeaturedProjects] Component unmounted before second refresh");
            return;
          }
          
          console.log("[FeaturedProjects] Second ScrollTrigger refresh");
          refreshScrollTrigger();
          
          // Reset SmoothScroller if needed
          if ((window as any).__smoother__) {
            console.log("[FeaturedProjects] Refreshing smoother, current paused state:", (window as any).__smoother__.paused());
            (window as any).__smoother__.refresh();
          } else {
            console.log("[FeaturedProjects] No smoother found for refresh");
          }
          
          // Add scroll position check
          const checkScroll = () => {
            const panelArea = document.querySelector('.project-panel-area');
            if (!panelArea) return;
            
            const rect = panelArea.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            console.log("[FeaturedProjects] Panel area visibility:", {
              isVisible,
              top: rect.top,
              bottom: rect.bottom,
              windowHeight: window.innerHeight,
              smootherExists: !!(window as any).__smoother__,
              smootherPaused: (window as any).__smoother__ ? (window as any).__smoother__.paused() : 'N/A'
            });
          };
          
          // Run check once
          checkScroll();
          
          // Add event listener for scroll
          window.addEventListener('scroll', checkScroll, { passive: true });
          
          // Clean up
          setTimeout(() => {
            if (isMounted) {
              window.removeEventListener('scroll', checkScroll);
            }
          }, 10000); // Remove after 10 seconds to avoid excessive logs
        }, 500);
      }, 300);
    }, initialDelay);

    return () => {
      // Mark component as unmounted
      console.log("[FeaturedProjects] Component unmounting");
      isMounted = false;

      // Clear timers and animations
      clearTimeout(timer);
      console.log("[FeaturedProjects] Clearing ScrollTriggers on unmount");
      clearScrollTriggers();

      // If the ScrollTrigger smoother exists, update it
      if ((window as any).__smoother__) {
        console.log("[FeaturedProjects] Unpausing smoother on unmount");
        (window as any).__smoother__.paused(false);
      } else {
        console.log("[FeaturedProjects] No smoother found on unmount");
      }
    };
  }, []);

  // Generate repeated text elements for marquee
  const repeatedText = Array.from({ length: 20 }).map((_, i) => (
    <span key={i}>Nuestros Trabajos&nbsp;&nbsp;</span>
  ));

  console.log("[FeaturedProjects] Rendering component");
  return (
    <section 
      ref={sectionRef} 
      className="latest-projects"
      onMouseEnter={() => console.log("[FeaturedProjects] Mouse entered section")}
      onMouseLeave={() => console.log("[FeaturedProjects] Mouse left section")}
    >
      {/* Marquee container - Pure CSS implementation */}
      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-text">{repeatedText}</div>
        </div>
      </div>

      {/* Project panels */}
      <div 
        className="project-panel-area"
        onMouseEnter={() => console.log("[FeaturedProjects] Mouse entered panel area")}
      >
        {featuredProjects.map((project, index) => (
          <div 
            key={project.id} 
            className="project-panel"
            onMouseEnter={() => console.log(`[FeaturedProjects] Mouse entered panel ${index + 1}`)}
          >
            <div className="project-panel__image">
              <Image
                src={project.image}
                alt={project.title}
                width={1920}
                height={1080}
                className="project-panel__image-file"
                priority={project.id === "01"}
                unoptimized={true}
                onLoad={() => console.log(`[FeaturedProjects] Image loaded for panel ${index + 1}`)}
              />
              <div className="project-panel__overlay"></div>
            </div>

            <div className="project-panel__content">
              <h3 className="project-panel__title">{project.title}</h3>
              <Link
                href={`/portfolio/${project.slug}`}
                className="project-panel__link"
              >
                Explorar proyecto
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedprojectsSection;