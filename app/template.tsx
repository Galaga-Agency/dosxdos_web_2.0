"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Set initial state of overlay
    gsap.set(overlay, {
      opacity: 1,
      scale: 1,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.to(overlay, {
      scale: 1.05,
      duration: 0.8,
    }).to(overlay, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        overlay.style.display = "none";
      },
    });
  }, []);

  return (
    <>
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#fff",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <Image
          src="/assets/img/logo/logo_full_gris.svg"
          alt="Logo"
          width={580}
          height={580}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </>
  );
}
