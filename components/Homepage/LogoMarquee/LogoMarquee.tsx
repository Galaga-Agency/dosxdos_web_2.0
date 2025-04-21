"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { clientLogos } from "@/data/clients";
import "./LogoMarquee.scss";

interface LogoMarqueeProps {
  showHeader?: boolean;
  fullWidth?: boolean;
}

const LogoMarquee: React.FC<LogoMarqueeProps> = ({
  showHeader = true,
  fullWidth = false
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackRef.current) {
      const totalWidth = trackRef.current.offsetWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth / 2,
        duration: 30,
        repeat: -1,
        ease: "none",
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % (totalWidth / 2)),
        },
      });
    }
  }, []);

  const allLogos = [...clientLogos, ...clientLogos];
  const sectionClasses = `logo-marquee ${fullWidth ? 'logo-marquee--full-width' : ''}`;
  const containerClasses = `logo-marquee__container ${showHeader ? 'has-header' : ''}`;

  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>
        {showHeader && (
          <div className="logo-marquee__header">
            <h2 className="logo-marquee__header-title">
              <span className="shadow-text">Marcas que </span>
              <span className="highlight-bg">confían en nosotros</span>
            </h2>
          </div>
        )}

        <div className="logo-marquee__wrapper">
          <div className="logo-marquee__gradient-left" />
          <div className="logo-marquee__track" ref={trackRef}>
            {allLogos.map((logo, index) => (
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
          </div>
          <div className="logo-marquee__gradient-right" />
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
