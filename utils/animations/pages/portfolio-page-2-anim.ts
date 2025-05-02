import { gsap, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "@/plugins";
import { refreshScrollTrigger } from "../scrolltrigger-config";
import $ from "jquery";
import { isTouchDevice } from "@/utils/device";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Portfolio page animation refs interface
export interface Portfolio2PageAnimationRefs {
  section?: HTMLElement | null;
  title?: HTMLElement | null;
  bentoGrid?: HTMLElement | null;
  ctaSection?: HTMLElement | null;
  ctaText?: HTMLElement | null;
  ctaButton?: HTMLElement | null;
}

export function initBentoRevealForTouchDevices(gridEl: HTMLElement | null): void {
  if (!gridEl) return;
  
  console.log("Initializing bento reveal for touch devices");
  const items = gridEl.querySelectorAll(".portfolio-bento__item");
  
  items.forEach((item) => {
    const hoverInfo = item.querySelector(".portfolio-bento__hover-info");
    const label = item.querySelector(".portfolio-bento__label");
    const title = item.querySelector(".portfolio-bento__title");
    
    if (!hoverInfo || !label || !title) return;
    
    // Set initial states - elements start hidden and to the left
    gsap.set(hoverInfo, { opacity: 0 });
    gsap.set(label, { x: -50, opacity: 0 });
    gsap.set(title, { x: -50, opacity: 0 });
    
    // Create the ScrollTrigger
    ScrollTrigger.create({
      trigger: item,
      start: "top 70%", // Start when top of item is 70% down the viewport
      end: "bottom 30%", // End when bottom of item is 30% up from bottom of viewport
      toggleActions: "play reverse play reverse", // This is crucial for entering/leaving behavior
      markers: false, // Set to true for debugging
      onEnter: () => {
        // Slide in from left to right
        gsap.to(hoverInfo, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(label, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out"
        });
        
        gsap.to(title, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.2,
          ease: "power2.out"
        });
      },
      onLeave: () => {
        // Slide out (back to left) when leaving viewport
        gsap.to(title, {
          x: -50,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
        
        gsap.to(label, {
          x: -50,
          opacity: 0,
          duration: 0.3,
          delay: 0.05,
          ease: "power2.in"
        });
        
        gsap.to(hoverInfo, {
          opacity: 0,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.in"
        });
      },
      onEnterBack: () => {
        // Slide in from left to right when scrolling up
        gsap.to(hoverInfo, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(label, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out"
        });
        
        gsap.to(title, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.2,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        // Slide out (back to left) when scrolling up past element
        gsap.to(title, {
          x: -50,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
        
        gsap.to(label, {
          x: -50,
          opacity: 0,
          duration: 0.3,
          delay: 0.05,
          ease: "power2.in"
        });
        
        gsap.to(hoverInfo, {
          opacity: 0,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.in"
        });
      }
    });
  });
  
  // Force refresh ScrollTrigger
  ScrollTrigger.refresh();
}

// Main animation function
export function initPortfolioPage2Animations(
  refs: Portfolio2PageAnimationRefs
): void {
  if (typeof window === "undefined") return;

  console.log("Animating Portfolio Page 2");

  // Make sure we have the minimum required elements
  if (!refs.section) {
    console.warn("Missing essential elements for portfolio page 2 animation");
    return;
  }

  // Title animation with SplitText if it has class char-animation
  if (refs.title && refs.title.classList.contains("char-animation")) {
    setTimeout(() => {
      const splitText = new SplitText(refs.title, {
        type: "chars, words",
      });

      if (refs.title) {
        gsap.set(refs.title, { visibility: "visible" });
      }

      gsap.from(splitText.chars, {
        duration: 1,
        x: 100,
        autoAlpha: 0,
        stagger: 0.05,
      });

      // Animate description with SplitText if it exists
      const descriptionEl = document.querySelector(
        ".portfolio-header__description"
      );

      if (descriptionEl) {
        const splitDesc = new SplitText(descriptionEl, { type: "lines" });
        gsap.set(descriptionEl, { perspective: 400 });

        const descTl = gsap.timeline({
          scrollTrigger: {
            trigger: descriptionEl,
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        });

        descTl.from(splitDesc.lines, {
          duration: 1,
          delay: 0.3,
          opacity: 0,
          rotationX: -80,
          force3D: true,
          transformOrigin: "top center -50",
          stagger: 0.1,
        });
      }

      // Animate highlight separately
      const highlight = refs.title?.querySelector(".highlight");
      if (highlight) {
        gsap.fromTo(
          highlight,
          { backgroundSize: "0% 100%" },
          {
            backgroundSize: "100% 100%",
            duration: 0.8,
            delay: 0.8,
            ease: "power2.out",
          }
        );
      }
    }, 200);
  }

  // Bento grid animation
  if (refs.bentoGrid) {
    const bentoItems = refs.bentoGrid.querySelectorAll(
      ".portfolio-bento__item"
    );

    // Set initial state for bento items
    gsap.set(bentoItems, {
      opacity: 0,
      y: 50,
    });

    // Create ScrollTrigger for the bento grid
    ScrollTrigger.create({
      trigger: refs.bentoGrid,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(bentoItems, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        });
      },
    });

    // Setup hover effects for bento items
    bentoItems.forEach((item) => {
      const image = item.querySelector(".portfolio-bento__image");
      const overlay = item.querySelector(".portfolio-bento__overlay");
      const content = item.querySelector(".portfolio-bento__content");

      if (!image || !overlay || !content) return;

      // Create hover animations
      item.addEventListener("mouseenter", () => {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.7,
          ease: "power2.out",
        });

        gsap.to(overlay, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(content, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
        });

        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(content, {
          y: 20,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });
  }

  // CTA section animation
  if (refs.ctaSection && refs.ctaText) {
    ScrollTrigger.create({
      trigger: refs.ctaSection,
      start: "top 70%",
      once: true,
      onEnter: () => {
        // Animate title with character animation if it has the char-animation class
        if (refs.ctaText && refs.ctaText.classList.contains("char-animation")) {
          setTimeout(() => {
            const splitText = new SplitText(refs.ctaText, {
              type: "chars, words",
            });

            if (refs.ctaText) {
              gsap.set(refs.ctaText, { visibility: "visible" });
            }

            gsap.from(splitText.chars, {
              duration: 1,
              x: 100,
              autoAlpha: 0,
              stagger: 0.05,
            });

            // Animate highlight separately
            const highlight = refs.ctaText
              ? refs.ctaText.querySelector(".highlight")
              : null;
            if (highlight) {
              gsap.fromTo(
                highlight,
                { backgroundSize: "0% 100%" },
                {
                  backgroundSize: "100% 100%",
                  duration: 0.8,
                  delay: 0.8,
                  ease: "power2.out",
                }
              );
            }
          }, 100);
        }

        // Animate buttons
        if (refs.ctaButton) {
          const buttons = refs.ctaButton.querySelectorAll(
            ".portfolio-cta__button"
          );
          gsap.set(buttons, { opacity: 0, y: 30 });

          gsap.to(buttons, {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.7,
            delay: 0.8, // After title animation
            ease: "power3.out",
          });
        }
      },
    });
  }

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// CLEANUP FUNCTION ///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export function cleanupPortfolio2Animations(): void {
  if (typeof window === "undefined") return;

  console.log("⚠️ Cleaning up all portfolio page 2 animations");

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
