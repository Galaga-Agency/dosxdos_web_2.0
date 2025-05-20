"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  initFadeAnimations,
  initImageParallax,
} from "@/utils/animations/pages/homepage-anim";
import "./CTASection.scss";
import useDeviceDetect from "@/hooks/useDeviceDetect";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    if (sectionRef.current) {
      setTimeout(() => {
        // Initialize fade animations
        initFadeAnimations();

        // Initialize parallax effect separately
        if (imageContainerRef.current && imageInnerRef.current && !isMobile) {
          initImageParallax(imageContainerRef.current, imageInnerRef.current);
        }
      }, 300);
    }
  }, []);

  return (
    <section ref={sectionRef} className="cta-section">
      <div className="cta-section__container">
        {/* Header section */}
        <div className="cta-section__header">
          <div className="cta-section__label fade_bottom">
            <span>Acción Social</span>
          </div>

          <h2 className="cta-section__title">
            <div className="title-row fade_bottom">DISEÑO CON CONCIENCIA.</div>
            <div className="title-row fade_bottom">COMPROMISO CON IMPACTO</div>
          </h2>
        </div>

        {/* Two column layout */}
        <div className="cta-section__content">
          {/* Left column with text and button */}
          <div className="cta-section__text-column">
            <div className="cta-section__text">
              <p>
                Entendemos la acción social como una parte esencial de nuestro
                compromiso con la sociedad. A través de proyectos que promueven
                la inclusión, la sostenibilidad y el desarrollo, trabajamos para
                generar un impacto duradero. Porque crear valor también es crear
                oportunidades.
              </p>
            </div>

            {/* Button properly placed below text */}
            <div className="cta-section__cta">
              <HoverCircleButton
                href="/sobre-nosotros/accion-social"
                label="Nuestro Compromiso Social"
              />
            </div>
          </div>

          {/* Right column with image */}
          <div ref={imageContainerRef} className="cta-section__image-column">
            <div ref={imageInnerRef} className="cta-section__image-wrapper">
              <Image
                src="/assets/img/about-us-page/accion-social-cta.webp"
                alt="Acción Social"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="cta-section__image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
