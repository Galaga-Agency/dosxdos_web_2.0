"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import "./StorySection.scss";

const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Decorative floating animations
    gsap.to(".story-decor", {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    });

    // Scroll-triggered animations
    if (titleRef.current && textRef.current && servicesRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          servicesRef.current.children,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }
  }, []);

  const services = [
    {
      title: "Escaparatismo",
      description: "Diseño de escaparates que capturan la esencia de tu marca.",
    },
    {
      title: "Espacios Promocionales",
      description: "Creamos ambientes que impulsan la experiencia del cliente.",
    },
    {
      title: "Producción Digital",
      description: "Soluciones digitales que complementan tu espacio físico.",
    },
    {
      title: "Perfumería",
      description: "Diseños que realzan la experiencia sensorial.",
    },
    {
      title: "Shop in Shop",
      description: "Conceptos de marca que se integran perfectamente.",
    },
    {
      title: "Interiorismo Comercial",
      description: "Transformamos espacios con diseño y funcionalidad.",
    },
  ];

  return (
    <section className="story-section" ref={sectionRef}>
      {/* Decorative elements */}
      <div className="story-decor story-decor-dot1"></div>
      <div className="story-decor story-decor-dot2"></div>
      <div className="story-decor story-decor-dot3"></div>
      <div className="story-decor story-decor-line1"></div>
      <div className="story-decor story-decor-line2"></div>

      <div className="container">
        <div className="story-content">
          <div className="story-text-wrapper">
            <h2 ref={titleRef} className="title">
              Nuestra <span>Historia</span>
            </h2>

            <div ref={textRef} className="story-text">
              <div className="story-intro">
                <p>
                  Somos un equipo de más de 45 profesionales apasionados por
                  transformar espacios comerciales. Nuestra historia es un viaje
                  de innovación, creatividad y compromiso.
                </p>
              </div>

              <div className="philosophy glass-card">
                <h3>¿Por qué Dos Por Dos?</h3>
                <p>
                  Cada proyecto es único. Nos comprometemos a entregar
                  soluciones personalizadas con la misma pasión,
                  independientemente de su escala o presupuesto.
                </p>
              </div>

              <div className="cta-wrapper">
                <PrimaryButton href="/portfolio" size="medium">
                  Ver Nuestro Trabajo
                </PrimaryButton>
              </div>
            </div>
          </div>

          <div className="services-container" ref={servicesRef}>
            <h3>Nuestros Servicios</h3>
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card glass-card">
                  <div className="service-content">
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                    <span className="service-arrow">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
