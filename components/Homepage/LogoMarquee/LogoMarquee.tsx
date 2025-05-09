"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { clientLogos } from "@/data/clients";
import "./LogoMarquee.scss";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { animateLogoMarquee } from "@/utils/animations/pages/homepage-anim";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LogoMarqueeProps {
  showHeader?: boolean;
  fullWidth?: boolean;
  darkMode?: boolean;
}

const LogoMarquee: React.FC<LogoMarqueeProps> = ({
  showHeader = true,
  fullWidth = false,
  darkMode = false,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeWrapperRef = useRef<HTMLDivElement>(null);

  // Initialize animation
  useEffect(() => {
    if (!sectionRef.current) return;

    // Use more focused animation specifically for marquee
    // instead of general initFadeAnimations()
    const animInstance = animateLogoMarquee({
      section: sectionRef.current,
      header: headerRef.current || undefined,
      marquee: marqueeWrapperRef.current || undefined,
    });

    // More conservative refreshing approach
    const refreshTimer = setTimeout(() => {
      if ((window as any).__smoother__) {
        (window as any).__smoother__.refresh();
      }
      ScrollTrigger.refresh();
    }, 300);

    // Cleanup function
    return () => {
      clearTimeout(refreshTimer);
      if (animInstance) {
        animInstance.kill();
      }
    };
  }, []);

  const sectionClasses = `logo-marquee ${
    fullWidth ? "logo-marquee--full-width" : ""
  } ${darkMode ? "logo-marquee--dark-mode" : ""}`;

  const containerClasses = `logo-marquee__container ${
    showHeader ? "has-header" : ""
  }`;

  // Set gradient color based on dark mode
  const gradientColor = darkMode ? "#281528" : "rgb(255, 255, 255)";

  return (
    <section ref={sectionRef} className={sectionClasses}>
      <div className={containerClasses}>
        {showHeader && (
          <div ref={headerRef} className="logo-marquee__header">
            <h2 className="logo-marquee__header-title">
              <span className="shadow-text">Marcas que </span>
              <span className="highlight-bg">confían en nosotros</span>
            </h2>
          </div>
        )}

        <div ref={marqueeWrapperRef} className="logo-marquee__wrapper">
          <Marquee
            gradient={true}
            gradientColor={gradientColor}
            gradientWidth={100}
            speed={40}
            pauseOnHover={true}
            direction="right"
          >
            {clientLogos.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="logo-marquee__item">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={150}
                  height={80}
                  className="logo-marquee__logo"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
