"use client";

import React, { useEffect, useRef } from "react";
import { SplitText } from "@/plugins";
import { charAnimation } from "@/utils/animations/title-anim";
import { teamMembers } from "@/data/team";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import { initCardMouseParallax } from "@/utils/animations/card-hover-anim";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TeamSection.scss";

const TeamSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // More stable ScrollTrigger configuration
    gsap.registerPlugin(ScrollTrigger);
    
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 0.1,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    });

    // Title animation
    if (titleRef.current) {
      const timer = setTimeout(() => {
        charAnimation(titleRef.current);
      }, 500);
      
      // Card parallax initialization
      const parallaxTimer = setTimeout(() => {
        initCardMouseParallax();
      }, 1000);
      
      // Optional: Add scroll stability animation
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "bottom 70%",
              toggleActions: "play none reverse none"
            }
          }
        );
      }
      
      return () => {
        clearTimeout(timer);
        clearTimeout(parallaxTimer);
        
        // Kill all ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  return (
    <section className="team-section">
      <div className="team-section__decorative-elements">
        <div className="team-section__decor-dots"></div>
        <div className="team-section__decor-line"></div>
        <div className="team-section__decor-circle"></div>
        <div className="team-section__decor-grid"></div>
      </div>
      
      <div className="container">
        <h2 ref={titleRef} className="title">
          Nuestro <span>Equipo</span>
        </h2>
        <p className="subtitle">
          Un equipo de profesionales apasionados, comprometidos con la
          creatividad y la excelencia en cada proyecto.
        </p>
        
        <div className="team-section__grid">
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