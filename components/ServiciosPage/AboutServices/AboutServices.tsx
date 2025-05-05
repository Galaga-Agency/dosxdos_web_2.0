"use client";

import React, { useRef, useEffect } from "react";
import { initFadeAnimations, cleanupServiciosAnimations } from "@/utils/animations/pages/servicios-page-anim";
import "./AboutServices.scss";

const AboutServices: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("AboutServices mounted");
    
    // Larger delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      console.log("Initializing animations");
      // Initialize fade animations
      initFadeAnimations();
    }, 300);
    
    return () => {
      console.log("AboutServices unmounting");
      // Clear the timeout on unmount
      clearTimeout(timer);
      // Clean up animations
      cleanupServiciosAnimations();
    };
  }, []);

  return (
    <section className="about-services" ref={sectionRef}>
      <div className="about-services__container">
        <div className="about-services__header">
          <div className="about-services__subtitle fade_left">
            140+ projects closed
          </div>
          <h2 className="about-services__title">
            <div className="title-row fade_bottom">
              AS A DIGITAL DESIGNER, I FOCUS ON
            </div>
            <div className="title-row fade_bottom">
              PRODUCING TOP NOTCH AND IMPACTFUL DIGITAL
            </div>
            <div className="title-row fade_bottom">EXPERIENCES.</div>
          </h2>
        </div>

        <div className="about-services__content">
          <div className="about-services__categories">
            <div className="about-services__category fade_bottom">
              Diseño de interiores
            </div>
            <div className="about-services__category fade_bottom">
              Producción
            </div>
            <div className="about-services__category fade_bottom">
              Instalación
            </div>
            <div className="about-services__category fade_bottom">
              logística
            </div>
            <div className="about-services__category fade_bottom">
              Comunicación
            </div>
            <div className="about-services__category fade_bottom">
              Consultoría
            </div>
          </div>

          <div className="about-services__description">
            <p className="about-services__text fade_bottom">
              Together, we construct tailored marketing campaigns that engage
              and resonate with customers on a deeper level. Adaptiv's approach
              amplifies brand awareness and loyalty and paves the way for
              sustainable business growth and success.
            </p>
            <p className="about-services__text fade_bottom">
              We believe that understanding and solving clients issues is the
              key to success. Now It's your time to overcome challenges, face
              fresh perspective and realize full potential.
            </p>
            <p className="about-services__text fade_bottom">
              Based on strong expertise and a battle-tested business.!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
