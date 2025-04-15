import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./PhilosophySection.scss"

const PhilosophySection: React.FC = () => {
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
      className="about-us-page__philosophy-section section-animate"
    >
      <div className="about-us-page__philosophy-content">
        <h2 className="about-us-page__section-title">
          ¿Por qué <span>dos por dos</span>?
        </h2>
        <div className="about-us-page__philosophy-text">
          <p>
            Nuestra filosofía consiste en responder a cualquier tipo de proyecto, 
            independientemente de su presupuesto, característica y escala con la misma pasión y perseverancia. 
          </p>
          <p>
            Buscamos a su vez, acompañar al cliente en todo el proceso de creación y ejecución del proyecto, 
            y mano a mano crear espacios vivos, con personalidad y únicos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhilosophySection;