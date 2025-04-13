import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import gsap from "gsap";
import "./CTASection.scss";

interface CTASectionProps {
  isActive?: boolean;
}

const CTASection: React.FC<CTASectionProps> = ({ isActive = false }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    if (isActive || (typeof window !== 'undefined' && window.innerWidth < 768)) {
      const elements = {
        title: sectionRef.current.querySelector('.section-title'),
        logo: sectionRef.current.querySelector('.keep-in-touch-logo'),
        button: sectionRef.current.querySelector('.contact-btn')
      };

      // Set initial states
      gsap.set([elements.title, elements.logo, elements.button], { opacity: 0, y: 30 });
      
      // Animate elements
      const tl = gsap.timeline();
      tl.to(elements.title, { opacity: 1, y: 0, duration: 0.4 })
        .to(elements.logo, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
        .to(elements.button, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
    }
  }, [isActive]);

  return (
    <section className="portfolio-section cta-section" ref={sectionRef} data-section-index="4">
      <div className="section-container">
        <h2 className="section-title cta-element">
          Construyamos juntos el próximo gran proyecto
        </h2>
        
        <div className="section-content cta-content">
          <div className="keep-in-touch">
            <div className="keep-in-touch-logo cta-element">
              <span>Keep</span>
              <span>In</span>
              <span>Touch</span>
            </div>
            
            <Link href="/contacto" className="contact-btn cta-element">
              Contáctanos
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;