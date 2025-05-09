"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { clientLogos } from "@/data/clients";
import "./LogoMarquee.scss";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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

  // Initialize animation
  useEffect(() => {
    if (sectionRef.current) {
      const timer = setTimeout(() => {
        // Force refresh to ensure ScrollTrigger works properly
        setTimeout(() => {
          if ((window as any).__smoother__) {
            console.log("Refreshing ScrollSmoother");
            (window as any).__smoother__.refresh();
          }
          ScrollTrigger.refresh();
        }, 100);
      }, 300);

      return () => clearTimeout(timer);
    }
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
          <div className="logo-marquee__header fade_bottom">
            <h2 className="logo-marquee__header-title">
              <span className="shadow-text">Marcas que </span>
              <span className="highlight-bg">confían en nosotros</span>
            </h2>
          </div>
        )}

        <div className="logo-marquee__wrapper fade_bottom">
          <Marquee
            gradient={true}
            gradientColor={gradientColor}
            gradientWidth={100} // Increased width for a smoother fade
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
