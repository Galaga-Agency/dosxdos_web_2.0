// utils/animations/page-transition-anim.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const templatePageAnimation = (
  overlayRef: React.RefObject<HTMLDivElement>,
  logoRef: React.RefObject<HTMLDivElement>
) => {
  const overlay = overlayRef.current;
  const logo = logoRef.current;
  if (!overlay || !logo) return;

  // CHECK IF OVERLAY IS ALREADY VISIBLE - DON'T RETRIGGER
  if (overlay.style.opacity === "1" && overlay.style.display === "block") {
    // Animation already running, just complete it normally
    setTimeout(() => {
      gsap.to(logo, {
        scale: 0.5,
        opacity: 0,
        duration: 0.25,
        ease: "power3.in",
      });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        delay: 0.1,
        onComplete: () => {
          overlay.style.display = "none";
          ScrollTrigger.refresh(true);
          if (window.ScrollSmoother) {
            const smoother = window.ScrollSmoother.get();
            if (smoother) {
              smoother.refresh();
            }
          }
        },
      });
    }, 800);
    return () => {}; // Return empty cleanup
  }

  // Kill all ScrollTriggers to prevent conflicts
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Reset scroll position immediately
  if (window.ScrollSmoother) {
    const smoother = window.ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, false);
    }
  }

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // Set initial state of overlay
  gsap.set(overlay, {
    opacity: 1,
    display: "block",
  });

  // Set initial state of logo - small and transparent
  gsap.set(logo, {
    scale: 0.5,
    opacity: 0,
  });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    onStart: () => {
      if (window.ScrollSmoother) {
        const smoother = window.ScrollSmoother.get();
        if (smoother) {
          smoother.scrollTo(0, false);
        }
      }
    },
  });

  // Animate logo: fade in and scale up from small to full size
  tl.to(logo, {
    scale: 1,
    opacity: 1,
    duration: 0.6,
    ease: "power2.out",
  })
    // Hold the logo at full size - NO HEARTBEAT
    .to({}, { duration: 0.4 })
    // Then quickly scale down and fade out
    .to(logo, {
      scale: 0.5,
      opacity: 0,
      duration: 0.25,
      ease: "power3.in",
    })
    // Fade out overlay
    .to(
      overlay,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
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
      },
      "-=0.15"
    ); // Slight overlap

  // Cleanup function
  return () => {
    tl.kill();
  };
};
