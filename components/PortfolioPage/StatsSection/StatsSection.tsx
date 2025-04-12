"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./StatsSection.scss";

// Register GSAP plugin if not already registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate stat numbers with counter effect
    const statItems = sectionRef.current.querySelectorAll('.stat-item');
    
    statItems.forEach((item, index) => {
      const numberElement = item.querySelector('.stat-number');
      const targetNumber = parseInt(numberElement?.textContent?.replace(/\D/g, '') || '0');
      
      gsap.set(numberElement, { innerHTML: '0' });
      
      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        onEnter: () => {
          gsap.to(numberElement, {
            innerHTML: `+${targetNumber}`,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            delay: index * 0.2
          });
          
          gsap.from(item, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: index * 0.2
          });
        },
        once: true
      });
    });

    // Animate value items
    const valueItems = sectionRef.current.querySelectorAll('.value-item');
    
    valueItems.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        onEnter: () => {
          gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.3 + (index * 0.2)
          });
        },
        once: true
      });
    });

    // Create perspective effect on hover for value items
    const createPerspectiveEffect = (element: Element) => {
      element.addEventListener('mousemove', (e: any) => {
        const rect = (element as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        
        const rotateX = (0.5 - yPercent) * 8;
        const rotateY = (xPercent - 0.5) * 8;
        
        gsap.to(element, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          ease: "power1.out",
          duration: 0.4
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          ease: "power3.out",
          duration: 0.7
        });
      });
    };
    
    valueItems.forEach(item => {
      createPerspectiveEffect(item);
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="portfolio-section stats-section" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Nuestro impacto en números</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Llevamos casi dos décadas creando proyectos destacados con clientes de todo el mundo
          </p>
        </div>

        <div className="stats-wrapper" ref={statsRef}>
          <div className="company-stats">
            <div className="stat-item">
              <span className="stat-number">21</span>
              <span className="stat-label">Proyectos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">17</span>
              <span className="stat-label">Años en negocio</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">86</span>
              <span className="stat-label">Premios</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Oficinas</span>
            </div>
          </div>
        </div>

        <div className="values-wrapper" ref={valuesRef}>
          <div className="section-subheader">
            <h3>Nuestros valores fundamentales</h3>
          </div>
          
          <div className="company-values">
            <div className="value-item">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
              </div>
              <h3 className="value-title">
                El concepto correcto para el cliente correcto
              </h3>
              <p>
                Proyectos únicos y reconocibles tienen un concepto sólido que los
                sustenta. Nuestros diseños nacen de necesidades reales.
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className="value-title">La belleza atrae personas</h3>
              <p>
                El diseño y la estética son fundamentales para captar la atención
                del público y crear experiencias memorables que perduran.
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h3 className="value-title">Enfoque en el significado</h3>
              <p>
                Cada elemento tiene un propósito y cuenta una historia dentro del
                proyecto. Nada es arbitrario, todo comunica un mensaje coherente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;