import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./LocationSection.scss"

const LocationSection: React.FC = () => {
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

      // Animate location cards with stagger
      const cards = sectionRef.current.querySelectorAll(".about-us-page__location-card");
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cards,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="about-us-page__location-section section-animate"
    >
      <h2 className="about-us-page__section-title">
        Dónde <span>Encontrarnos</span>
      </h2>
      <div className="about-us-page__location-grid">
        <div className="about-us-page__location-card">
          <h3>Las Palmas</h3>
          <p>Calle Principal 123<br />Las Palmas de Gran Canaria<br />35001, España</p>
          <Link href="/contacto" className="about-us-page__contact-btn">
            Contactar
          </Link>
        </div>
        <div className="about-us-page__location-card">
          <h3>Madrid</h3>
          <p>Calle Serrano 45<br />Madrid<br />28001, España</p>
          <Link href="/contacto" className="about-us-page__contact-btn">
            Contactar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;