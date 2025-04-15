import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./CTASection.scss"

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div ref={sectionRef} className="about-us-page__cta-section section-animate">
      <div className="about-us-page__cta-content">
        <h2>¿Listo para comenzar tu próximo proyecto?</h2>
        <p>Contáctanos hoy y descubre cómo podemos ayudarte a crear espacios con personalidad única.</p>
        <Link href="/contacto" className="about-us-page__cta-button">
          Contáctanos
        </Link>
      </div>
    </div>
  );
};

export default CTASection;