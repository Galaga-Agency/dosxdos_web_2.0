"use client";

import React, { useEffect, useRef } from "react";
import { teamMembers } from "@/data/team";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import { initCardMouseParallax } from "@/utils/animations/components/card-hover-anim";
import { animateTeamSection } from "@/utils/animations/pages/equipo-page-anim";
import "./TeamSection.scss";

const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize animation
    const timer = setTimeout(() => {
      if (
        sectionRef.current &&
        titleRef.current &&
        subtitleRef.current &&
        gridRef.current
      ) {
        animateTeamSection({
          section: sectionRef.current,
          title: titleRef.current,
          subtitle: subtitleRef.current,
          grid: gridRef.current,
        });
      }
    }, 100);

    // Card mouse parallax
    const parallaxTimer = setTimeout(() => {
      initCardMouseParallax();
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(parallaxTimer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="team-section">
      <div className="container">
        <h2 ref={titleRef} className="title">
          Nuestro <span>Equipo</span>
        </h2>
        <p ref={subtitleRef} className="subtitle">
          Un equipo de profesionales apasionados, comprometidos con la
          creatividad y la excelencia en cada proyecto.
        </p>

        <div ref={gridRef} className="team-section__grid">
          {teamMembers.map((member: any) => (
            <HoverCard
              key={member.id}
              id={member.id}
              title={member.name}
              description={member.position}
              imageUrl={member.imageUrl}
              linkUrl={`/equipo/${member.id}`}
              showLink={false} // Hide the link for team members
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
