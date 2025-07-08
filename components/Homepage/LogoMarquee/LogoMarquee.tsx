"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { clients } from "@/data/clients";
import "./LogoMarquee.scss";

const LogoMarquee = ({
  showHeader = true,
  fullWidth = false,
  darkMode = false,
}) => {
  const sectionClasses = `logo-marquee ${
    fullWidth ? "logo-marquee--full-width" : ""
  } ${darkMode ? "logo-marquee--dark-mode" : ""}`;

  const containerClasses = `logo-marquee__container container ${
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
          <Marquee
            speed={50}
            gradient={false}
            pauseOnHover={true}
            direction="left"
          >
            {clients.map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="logo-marquee__item"
                style={{ width: "200px", height: "120px" }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={200}
                  height={130}
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
