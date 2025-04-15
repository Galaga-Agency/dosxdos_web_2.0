import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./StorySection.scss"

const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    }
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="about-us-page__story-section section-animate"
    >
      <div className="about-us-page__story-content">
        <h2 className="about-us-page__section-title">
          Nuestra <span>Historia</span>
        </h2>
        <div className="about-us-page__story-text">
          <p className="about-us-page__story-question">
            ¿Te apetece conocer nuestra historia?
          </p>
          <p>
            Actualmente, somos un gran equipo formado por más de <strong>45 profesionales</strong>, 
            pero todo empezó hace más de <strong>treinta años</strong>...
          </p>
        </div>
      </div>
    </div>
  );
};

export default StorySection;