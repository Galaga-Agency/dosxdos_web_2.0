"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Kill all ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Reset scroll position immediately
    // Check if ScrollSmoother exists and reset it
    if (window.ScrollSmoother) {
      const smoother = window.ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(0, false); // false = no animation
      }
    }

    // Also reset regular scroll as fallback
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Set initial state of overlay
    gsap.set(overlay, {
      opacity: 1,
      scale: 1,
      display: "block",
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onStart: () => {
        // Ensure we're at the top when animation starts
        if (window.ScrollSmoother) {
          const smoother = window.ScrollSmoother.get();
          if (smoother) {
            smoother.scrollTo(0, false);
          }
        }
      },
    });

    tl.to(overlay, {
      scale: 1.05,
      duration: 0.8,
    }).to(overlay, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        overlay.style.display = "none";

        // Refresh ScrollTrigger after transition
        ScrollTrigger.refresh(true);

        // If you need to reinitialize ScrollSmoother after transition
        if (window.ScrollSmoother) {
          const smoother = window.ScrollSmoother.get();
          if (smoother) {
            smoother.refresh();
          }
        }
      },
    });

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, [pathname]); // Re-run effect when pathname changes

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
          zIndex: 99,
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
