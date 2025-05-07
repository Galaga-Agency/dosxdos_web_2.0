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
import "./CTASection.scss";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CTASection: React.FC = () => {
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
    <section ref={sectionRef} className="cta-section">
      <div className="cta-section__container">
        {/* Header section */}
        <div className="cta-section__header">
          <div className="cta-section__label fade_bottom">
            <span>Acción Social</span>
          </div>

          <h2 className="cta-section__title fade_bottom">
            CONSTRUYENDO
            <br />
            UN MEJOR FUTURO
          </h2>
        </div>

        {/* Content area with two columns */}
        <div className="cta-section__content">
          {/* Left column with image with parallax effect */}
          <div ref={imageContainerRef} className="cta-section__visual-column">
            <div ref={imageInnerRef} className="cta-section__animated-logo">
              <Image
                src="/assets/img/about-us-page/mil-caminos-illustration.jpg"
                alt="Mil Caminos Logo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Right column with content */}
          <div className="cta-section__content-column">
            <div className="cta-section__text fade_left">
              <p>
                Transformando comunidades a través de iniciativas sociales que
                generan un impacto real y duradero. Creamos oportunidades para
                el desarrollo sostenible y la inclusión social.
              </p>
            </div>

            <div className="cta-section__cta fade_bottom">
              <PrimaryButton href="/sobre-nosotros/accion-social" size="medium">
                Descubre Nuestra Labor
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
