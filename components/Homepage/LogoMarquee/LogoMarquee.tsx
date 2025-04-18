"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import "./LogoMarquee.scss";

const LogoMarquee: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Define the logos array
  const logos = [
    {
      id: "douglas",
      name: "Douglas",
      src: "/assets/img/logos-clientes/douglas.webp",
    },
    {
      id: "druni",
      name: "Druni",
      src: "/assets/img/logos-clientes/druni.webp",
    },
    {
      id: "esennia",
      name: "Esennia",
      src: "/assets/img/logos-clientes/esennia.webp",
    },
    {
      id: "fundgrube",
      name: "Fund Grube",
      src: "/assets/img/logos-clientes/fundgrube.webp",
    },
    {
      id: "primor",
      name: "Primor",
      src: "/assets/img/logos-clientes/primor.webp",
    },
    {
      id: "sabina",
      name: "Sabina",
      src: "/assets/img/logos-clientes/sabina.webp",
    },
    {
      id: "edelweiss",
      name: "Edelweiss",
      src: "/assets/img/logos-clientes/edelweiss.webp",
    },
    {
      id: "dalia",
      name: "Dalia",
      src: "/assets/img/logos-clientes/dalia.webp",
    },
  ];

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

  // Double the logos array for continuous scrolling
  const allLogos = [...logos, ...logos];

  return (
    <section className="logo-marquee">
      <div className="logo-marquee__container">
        <div className="logo-marquee__header">
          <h2 className="logo-marquee__header-title">
            Marcas que <span className="highlight-bg">confían en nosotros</span>
          </h2>
        </div>
        
        <div className="logo-marquee__wrapper">
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
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;