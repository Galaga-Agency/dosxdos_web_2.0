import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./ResponsibilitySection.scss"

const ResponsibilitySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      // Animate section
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

      // Animate foundation cards with stagger
      const cards = sectionRef.current.querySelectorAll(".about-us-page__foundation-card");
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cards,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="about-us-page__responsibility-section section-animate"
    >
      <h2 className="about-us-page__section-title">
        Socialmente <span>Responsables</span>
      </h2>
      <div className="about-us-page__responsibility-intro">
        <p>
          Siendo conscientes de la suerte que tenemos, estamos sensibilizados con las necesidades 
          de nuestro entorno y con las de las zonas menos favorecidos, por ello aportamos cada año 
          nuestro granito de arena. Esto nos lleva a desarrollar iniciativas sociales y 
          medioambientales para reducir nuestro impacto en el medio.
        </p>
        <p className="about-us-page__responsibility-highlight">
          Compartimos contigo algunos de los proyectos con los que anualmente colaboramos:
        </p>
      </div>
      
      <div className="about-us-page__foundations-grid">
        <div className="about-us-page__foundation-card">
          <div className="about-us-page__foundation-logo">
            <Image 
              src="/assets/logos/fundacion-vicente-ferrer.png" 
              alt="Fundación Vicente Ferrer" 
              width={200} 
              height={100} 
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <h3><strong>Fundación</strong> Vicente Ferrer</h3>
          <p>
            Cada año colaboramos con la Fundación Vicente Ferrer, comprometidos con el desarrollo 
            y mejora de las condiciones de vida de las comunidades más desfavorecidas de Andhra Pradesh.
          </p>
        </div>
        
        <div className="about-us-page__foundation-card">
          <div className="about-us-page__foundation-logo">
            <Image 
              src="/assets/logos/fundacion-yrichen.png" 
              alt="Fundación Canaria Yrichen" 
              width={200} 
              height={100} 
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <h3><strong>Fundación</strong> Canaria Yrichen</h3>
          <p>
            Colaboramos con la Fundación Canaria YRICHEN, que tiene como finalidad la atención 
            e inserción a personas en exclusión social especialmente derivadas de drogodependencias.
          </p>
        </div>
        
        <div className="about-us-page__foundation-card">
          <div className="about-us-page__foundation-logo">
            <Image 
              src="/assets/logos/medicos-del-mundo.png" 
              alt="Médicos del Mundo" 
              width={200} 
              height={100} 
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <h3>Médicos del Mundo</h3>
          <p>
            Colaboramos anualmente con Médicos del Mundo. Asociación que trabaja para hacer 
            efectivo el derecho a la salud para todas las personas, especialmente para las 
            poblaciones vulnerables.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResponsibilitySection;