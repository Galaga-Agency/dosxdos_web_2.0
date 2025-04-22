"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { initHeroAnimations } from "@/utils/animations/accion-social-page-anim";
import "./HeroSection.scss";

const HeroSection: React.FC = () => {
  const heroAreaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef1 = useRef<HTMLHeadingElement>(null);
  const titleRef2 = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fix: Add delay and requestAnimationFrame for proper initialization
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        initHeroAnimations({
          heroArea: heroAreaRef,
          bgRef,
          titleRef1,
          titleRef2,
          contentRef,
        });
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="accion-social-hero" ref={heroAreaRef}>
      <div className="accion-social-hero__bg tp-hero-bg-single" ref={bgRef}>
        <Image
          src="/assets/img/blog/default-blog-image.jpg"
          alt="Acción Social"
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
          priority
        />
      </div>

      {/* Add decorative elements */}
      <div className="accion-social-hero__decorative-elements">
        <div className="accion-social-hero__decor-dots"></div>
        <div className="accion-social-hero__decor-line"></div>
        <div className="accion-social-hero__decor-circle"></div>
        <div className="accion-social-hero__decor-grid"></div>
      </div>

      <div className="accion-social-hero__content-wrapper">
        <div className="accion-social-hero__title-box">
          <h2 className="accion-social-hero__title text-1" ref={titleRef1}>
            Compromiso
          </h2>
          <h2 className="accion-social-hero__title text-2" ref={titleRef2}>
            <span>Social</span>
          </h2>
        </div>
        <div className="accion-social-hero__content" ref={contentRef}>
          <p>
            Transformando comunidades a través de iniciativas sociales que
            generan un impacto real y duradero.
          </p>
          <button className="accion-social-hero__btn">Ver proyectos</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
