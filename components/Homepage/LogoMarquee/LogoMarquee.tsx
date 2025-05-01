"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { clientLogos } from "@/data/clients";
import "./LogoMarquee.scss";
import { animateLogoMarquee } from "@/utils/animations/homepage-anim";

interface LogoMarqueeProps {
  showHeader?: boolean;
  fullWidth?: boolean;
}

const LogoMarquee: React.FC<LogoMarqueeProps> = ({
  showHeader = true,
  fullWidth = false,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  const sectionClasses = `logo-marquee ${
    fullWidth ? "logo-marquee--full-width" : ""
  }`;
  const containerClasses = `logo-marquee__container ${
    showHeader ? "has-header" : ""
  }`;

  // Initialize animation
  useEffect(() => {
    if (sectionRef.current) {
      // Delay animation slightly to allow DOM to fully render
      const timer = setTimeout(() => {
        animateLogoMarquee({
          section: sectionRef.current,
          header: headerRef.current,
          marquee: marqueeRef.current,
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

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

        <div ref={marqueeRef} className="logo-marquee__wrapper">
          <Marquee
            gradient={true}
            gradientColor="rgb(255, 255, 255)"
            gradientWidth={50}
            speed={40}
            pauseOnHover={true}
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