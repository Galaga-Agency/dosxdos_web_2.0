"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { animateAboutUsSection } from "@/utils/animations/homepage-anim";
import "./AboutUsSection.scss";

const AboutUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enhanced animation implementation
    const forceAnimation = () => {
      if (
        titleRef.current &&
        textRef.current
      ) {
        animateAboutUsSection({
          section: sectionRef.current,
          label: labelRef.current,
          title: titleRef.current,
          text: textRef.current,
          cta: ctaRef.current,
          decor: decorRef.current,
          image: imageRef.current
        } as any);
      }
    };

    // Trigger animation on mount
    forceAnimation();

    // Handle any late-loading scenarios
    const loadTimer = setTimeout(forceAnimation, 500);

    // Cleanup
    return () => {
      clearTimeout(loadTimer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="aboutus-section">
      <div className="aboutus-section__decorative-elements" ref={decorRef}>
        <div className="aboutus-section__decor-dots"></div>
        <div className="aboutus-section__decor-line-1"></div>
        <div className="aboutus-section__decor-line-2"></div>
        <div className="aboutus-section__decor-circle"></div>
        <div className="aboutus-section__decor-grid"></div>
      </div>
      
      <div className="aboutus-section__container">
        <div className="aboutus-section__content-wrapper">
          <div ref={labelRef} className="aboutus-section__label">
            <span>QUIÉNES SOMOS</span>
          </div>

          <h2 ref={titleRef} className="aboutus-section__title">
            <span className="word">Diseñamos</span>{" "}
            <span className="word">historias</span>{" "}
            <span className="word">visuales</span>
            <br />
            <span className="word">a</span>{" "}
            <span className="word">través</span>{" "}
            <span className="word">de</span>{" "}
            <span className="highlight">espacios únicos</span>
          </h2>

          <div ref={textRef} className="aboutus-section__text">
            <p>
              Llevamos más de <strong>30 años</strong> dedicados al diseño de
              espacios comerciales. Gracias a nuestro equipo de arquitectos,
              interioristas y diseñadores gráficos, hacemos posible crear en
              cada proyecto un <strong>espacio con esencia propia</strong>.
            </p>
            <div ref={ctaRef} className="aboutus-section__cta">
              <PrimaryButton href="/servicios" size="medium">
                Sobre Nosotros
              </PrimaryButton>
            </div>
          </div>
        </div>
        
        <div className="aboutus-section__image-column">
          <div className="aboutus-section__image-frame" ref={imageRef}>
            <div className="aboutus-section__image-frame-inner">
              <Image 
                src="/assets/img/blog/default-blog-image.jpg" 
                alt="Espacio diseñado por dosxdos" 
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="aboutus-section__image"
                priority
              />
              <div className="aboutus-section__image-overlay"></div>
              <div className="aboutus-section__image-corner tl"></div>
              <div className="aboutus-section__image-corner tr"></div>
              <div className="aboutus-section__image-corner bl"></div>
              <div className="aboutus-section__image-corner br"></div>
            </div>
          </div>
          <div className="aboutus-section__stats">
            <div className="aboutus-section__stat-item">
              <span className="aboutus-section__stat-number">30+</span>
              <span className="aboutus-section__stat-label">Años de experiencia</span>
            </div>
            <div className="aboutus-section__stat-item">
              <span className="aboutus-section__stat-number">250+</span>
              <span className="aboutus-section__stat-label">Proyectos completados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;