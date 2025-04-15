import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useParallax } from "@/utils/animations/parallax-image";
import "./TeamSection.scss"

const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const teamImageContainerRef = useRef<HTMLDivElement | null>(null);
  const teamImageRef = useRef<HTMLDivElement | null>(null);

  // Parallax effect for the team image
  useParallax(
    teamImageContainerRef as React.RefObject<HTMLElement>,
    teamImageRef as React.RefObject<HTMLElement>,
    {
      intensity: 0.2,
      scrubAmount: 1,
      delay: 300,
    }
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate stats with stagger
      const stats = sectionRef.current.querySelectorAll(".about-us-page__stat");
      gsap.fromTo(
        stats,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: stats,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="about-us-page__team-section section-animate"
    >
      <div className="about-us-page__team-content">
        <div className="about-us-page__team-text">
          <h2 className="about-us-page__section-title">
            Nuestro <span>Equipo</span>
          </h2>
          <p>
            Detrás de cada proyecto hay un equipo apasionado y talentoso. 
            Somos profesionales comprometidos con la excelencia y la innovación.
          </p>
          <p>
            Una mezcla de diferentes perspectivas, habilidades y experiencias, 
            unidos por la pasión de crear soluciones únicas que superen las expectativas.
          </p>
        </div>
        <div
          ref={teamImageContainerRef}
          className="about-us-page__team-image-container"
        >
          <div ref={teamImageRef} className="about-us-page__team-image-wrapper">
            <Image
              src="/assets/img/team.jpg"
              alt="Equipo Dos por Dos"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                willChange: "transform",
              }}
            />
          </div>
        </div>
      </div>
      <div className="about-us-page__team-stats">
        <div className="about-us-page__stat">
          <h3>30+</h3>
          <p>Años de experiencia</p>
        </div>
        <div className="about-us-page__stat">
          <h3>45+</h3>
          <p>Profesionales</p>
        </div>
        <div className="about-us-page__stat">
          <h3>500+</h3>
          <p>Proyectos completados</p>
        </div>
        <div className="about-us-page__stat">
          <h3>3+</h3>
          <p>Fundaciones apoyadas</p>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;