"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { clientLogos } from "@/data/clients";
import "./LogoMarquee.scss";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";

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
  useEffect(() => {
    // Save all current ScrollTrigger instances
    const allTriggers = ScrollTrigger.getAll();

    // Disable all of them
    allTriggers.forEach((trigger) => {
      trigger.disable();
    });

    // Return cleanup function to re-enable all triggers when component unmounts
    return () => {
      allTriggers.forEach((trigger) => {
        trigger.enable();
      });
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
          <Marquee
            gradient={true}
            gradientColor={gradientColor}
            gradientWidth={80}
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
                  style={{ objectFit: "contain" }}
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
