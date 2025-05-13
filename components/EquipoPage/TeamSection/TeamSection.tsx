"use client";

import React, { useEffect, useRef } from "react";
import { teamMembers } from "@/data/team";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import { initCardMouseParallax } from "@/utils/animations/components/card-hover-anim";
import { initFadeAnimations } from "@/utils/animations/pages/homepage-anim";
import "./TeamSection.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      // Initialize animation
      const timer = setTimeout(() => {
        // Initialize fade animations
        initFadeAnimations();

        // Card mouse parallax
        const parallaxTimer = setTimeout(() => {
          initCardMouseParallax();
        }, 500);

        // Force refresh to ensure ScrollTrigger works properly
        setTimeout(() => {
          if ((window as any).__smoother__) {
            console.log("Refreshing ScrollSmoother");
            (window as any).__smoother__.refresh();
          }
          ScrollTrigger.refresh();
        }, 100);

        return () => {
          clearTimeout(parallaxTimer);
        };
      }, 300);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section ref={sectionRef} className="team-section">
      <div className="team-section__container">
        <div className="team-section__header">
          <div className="team-section__label fade_bottom">
            <span>Nuestro equipo</span>
          </div>

          <h2 className="team-section__title">
            <div className="title-row fade_bottom">PROFESIONALES</div>
            <div className="title-row fade_bottom">APASIONADOS</div>
          </h2>
        </div>

        <p className="team-section__subtitle fade_bottom">
          Un equipo comprometido con la creatividad y la excelencia en cada
          proyecto, con experiencia en el diseño de{" "}
          <strong>espacios comerciales</strong> para marcas de lujo.
        </p>

        <div className="team-section__grid">
          {teamMembers.map((member: any, index) => (
            <div
              key={member.id}
              className="team-section__card-wrapper fade_bottom"
            >
              <HoverCard
                id={member.id}
                title={member.name}
                description={member.position}
                imageUrl={member.imageUrl}
                linkUrl={`/equipo/${member.id}`}
                showLink={false} // Hide the link for team members
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
