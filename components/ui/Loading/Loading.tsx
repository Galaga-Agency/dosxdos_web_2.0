"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import "./Loading.scss";

export default function Loading() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;

    if (!overlay || !logo) return;

    // Set initial states
    gsap.set(overlay, {
      opacity: 1,
      display: "flex",
    });

    gsap.set(logo, {
      scale: 0.8,
      opacity: 0.9,
    });

    // Gentle logo pulse animation
    const logoTl = gsap.timeline({ repeat: -1, yoyo: true });
    logoTl.to(logo, {
      scale: 0.85,
      duration: 1.5,
      ease: "power2.inOut",
    });

    return () => {
      logoTl.kill();
    };
  }, []);

  return (
    <div ref={overlayRef} className="loading">
      <div className="loading__container">
        <div className="loading__bars-container">
          <div className="loading__bars">
            <div className="loading__bar"></div>
            <div className="loading__bar"></div>
            <div className="loading__bar"></div>
            <div className="loading__bar"></div>
            <div className="loading__bar"></div>
          </div>
        </div>
        <div ref={logoRef} className="loading__logo">
          <Image
            src="/assets/img/logo/logo-full-berenjena.svg"
            alt="Cargando..."
            width={180}
            height={150}
            priority
          />
        </div>
      </div>
    </div>
  );
}
