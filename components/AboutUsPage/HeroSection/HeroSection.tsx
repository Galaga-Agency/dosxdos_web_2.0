import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useParallax } from "@/utils/animations/parallax-image";
import { charAnimation } from "@/utils/animations/title-anim";
import { gsap } from "gsap";
import "./HeroSection.scss"

const HeroSection: React.FC = () => {
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const heroImageContainerRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);

  // Parallax effect for the hero image
  useParallax(
    heroImageContainerRef as React.RefObject<HTMLElement>,
    heroImageRef as React.RefObject<HTMLElement>,
    {
      intensity: 0.25,
      scrubAmount: 1.2,
      delay: 500,
    }
  );

  useEffect(() => {
    // Character animation for the main title
    if (mainTitleRef.current) {
      gsap.set(mainTitleRef.current, { visibility: "hidden" });
      const timer = setTimeout(() => {
        charAnimation(mainTitleRef.current!);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="hero-section">
      <div
        ref={heroImageContainerRef}
        className="hero-image-container"
      >
        <div ref={heroImageRef} className="hero-image-wrapper">
          <Image
            src="/assets/img/about-us-page/Evento_Aniversario_dospordos-182.jpg"
            alt="Dos por Dos"
            fill
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center",
              willChange: "transform",
            }}
          />
        </div>

        <div className="hero-content">
          <div className="hero-overlay"></div>
          <h1
            ref={mainTitleRef}
            className="hero-title char-animation"
          >
            Sobre <span>Nosotros</span>
          </h1>
          <div className="hero-subtitle">
            <p>Nos apasiona lo que hacemos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;