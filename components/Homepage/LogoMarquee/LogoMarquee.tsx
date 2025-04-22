"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { clientLogos } from "@/data/clients";
import "./LogoMarquee.scss";

interface LogoMarqueeProps {
  showHeader?: boolean;
  fullWidth?: boolean;
}

const LogoMarquee: React.FC<LogoMarqueeProps> = ({
  showHeader = true,
  fullWidth = false,
}) => {
  const sectionClasses = `logo-marquee ${
    fullWidth ? "logo-marquee--full-width" : ""
  }`;
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
