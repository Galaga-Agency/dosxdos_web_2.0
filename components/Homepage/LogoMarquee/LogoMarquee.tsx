"use client";

import React from "react";
import Image from "next/image";
import { clientLogos } from "@/data/clients";
import "./LogoMarquee.scss";

const LogoMarquee = ({
  showHeader = true,
  fullWidth = false,
  darkMode = false,
}) => {
  // Duplicate the logos array to create the continuous effect
  const allLogos = [
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
  ];

  const sectionClasses = `logo-marquee ${
    fullWidth ? "logo-marquee--full-width" : ""
  } ${darkMode ? "logo-marquee--dark-mode" : ""}`;

  const containerClasses = `logo-marquee__container ${
    showHeader ? "has-header" : ""
  }`;

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
          <div className="logo-marquee__track">
            {allLogos.map((logo, index) => (
              <div key={`logo-${index}`} className="logo-marquee__item">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
