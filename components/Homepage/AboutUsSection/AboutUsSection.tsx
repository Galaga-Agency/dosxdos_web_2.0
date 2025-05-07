"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  initFadeAnimations,
  initImageParallax,
} from "@/utils/animations/pages/homepage-anim";
import "./AboutUsSection.scss";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      setTimeout(() => {
        // Initialize fade animations
        initFadeAnimations();

        // Initialize parallax effect separately
        if (imageContainerRef.current && imageInnerRef.current) {
          initImageParallax(imageContainerRef.current, imageInnerRef.current);
        }
      }, 300);
    }
  }, []);

  return (
    <section ref={sectionRef} className="aboutus-section">
      <div className="aboutus-section__container">
        {/* Header section */}
        <div className="aboutus-section__header">
          <div className="aboutus-section__label fade_bottom">
            <span>Quienes Somos</span>
          </div>

          <h2 className="aboutus-section__title fade_bottom">
            CREAMOS ESPACIOS
            <br />
            QUE INSPIRAN
          </h2>
        </div>

        {/* Content area with two columns */}
        <div className="aboutus-section__content">
          {/* Left column with image with parallax effect */}
          <div
            ref={imageContainerRef}
            className="aboutus-section__visual-column"
          >
            <div ref={imageInnerRef} className="aboutus-section__animated-logo">
              <Image
                src="/assets/img/blog/corporate-branding.jpg"
                alt="Diseño de interiores"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Right column with content */}
          <div className="aboutus-section__content-column">
            <div className="aboutus-section__text fade_left">
              <p>
                Más de <strong>35 años de experiencia</strong> en el sector del
                diseño de interiores en espacios comerciales. Especialistas en
                el servicio integral a firmas de lujo de la cosmética y
                perfumería.
              </p>
              <p>
                Con un gran equipo de más de 45 profesionales, formado por
                arquitectos, interioristas, diseñadores y expertos en producción
                e instalación, te acompañamos durante todo el proceso.
              </p>
            </div>

            <div className="aboutus-section__cta fade_bottom">
              <PrimaryButton href="/sobre-nosotros/equipo" size="medium">
                Conócenos
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
