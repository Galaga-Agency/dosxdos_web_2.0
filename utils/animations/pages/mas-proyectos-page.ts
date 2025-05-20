import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import { SplitText } from "@/plugins";
import { refreshScrollTrigger } from "../scrolltrigger-config";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Define window interface for the animation frame property
declare global {
  interface Window {
    cursorAnimationFrame?: number;
  }
}

// MasProyectos page animation refs interface
export interface MasProyectosAnimationRefs {
  section?: HTMLElement | null;
  title?: HTMLElement | null;
  projectsGrid?: HTMLElement | null;
  ctaSection?: HTMLElement | null;
  ctaText?: HTMLElement | null;
  ctaButton?: HTMLElement | null;
}

// Main animation function
export function initMasProyectosAnimations(
  refs: MasProyectosAnimationRefs
): void {
  if (typeof window === "undefined") return;

  if (!refs.section) {
    console.warn("Missing essential elements for Mas Proyectos page animation");
    return;
  }

  // Title animation with SplitText if it has class char-animation
  if (refs.title && refs.title.classList.contains("char-animation")) {
    setTimeout(() => {
      if (refs.title) {
        try {
          const splitText = new SplitText(refs.title, {
            type: "chars, words",
          });

          if (refs.title) {
            gsap.set(refs.title, { visibility: "visible" });
          }

          // Ensure chars exists before animating
          if (splitText.chars && splitText.chars.length > 0) {
            gsap.from(splitText.chars, {
              duration: 1,
              x: 100,
              autoAlpha: 0,
              stagger: 0.05,
            });
          }
        } catch (error) {
          console.error("Error splitting title text:", error);
        }
      }

      // Animate description with SplitText if it exists
      const descriptionEl = document.querySelector(
        ".mas-proyectos-header__description"
      );

      if (descriptionEl) {
        try {
          const splitDesc = new SplitText(descriptionEl, { type: "lines" });
          gsap.set(descriptionEl, { visibility: "visible", perspective: 400 });

          // Ensure lines exists before animating
          if (splitDesc.lines && splitDesc.lines.length > 0) {
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
        } catch (error) {
          console.error("Error splitting description text:", error);
        }
      }
    }, 200);
  }

  // Grid items initial reveal animation
  if (refs.projectsGrid) {
    const gridItems = refs.projectsGrid.querySelectorAll(".item");

    if (gridItems.length > 0) {
      // Set initial opacity to 0
      gsap.set(gridItems, {
        opacity: 0,
      });

      // Reveal with stagger
      gsap.to(gridItems, {
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: refs.projectsGrid,
          start: "top 85%",
        },
      });
    } else {
      console.warn("No grid items found in projectsGrid");
    }
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
            try {
              const splitText = new SplitText(refs.ctaText as any, {
                type: "chars, words",
              });

              if (refs.ctaText) {
                gsap.set(refs.ctaText, { visibility: "visible" });
              }

              // Ensure chars exists before animating
              if (splitText.chars && splitText.chars.length > 0) {
                gsap.from(splitText.chars, {
                  duration: 1,
                  x: 100,
                  autoAlpha: 0,
                  stagger: 0.05,
                });
              }
            } catch (error) {
              console.error("Error splitting CTA text:", error);
            }
          }, 100);
        }

        // Animate buttons
        if (refs.ctaButton) {
          const buttons = refs.ctaButton.querySelectorAll(".button");

          if (buttons.length > 0) {
            gsap.set(buttons, { opacity: 0, y: 30 });

            gsap.to(buttons, {
              opacity: 1,
              y: 0,
              stagger: 0.2,
              duration: 0.7,
              delay: 0.8, // After title animation
              ease: "power3.out",
            });
          } else {
            console.warn("No buttons found in ctaButton");
          }
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

export function cleanupMasProyectosAnimations(): void {
  if (typeof window === "undefined") return;

  console.log("⚠️ Cleaning up all Mas Proyectos page animations");

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Remove cursor bubble if it exists
  const viewBubble = document.querySelector(".view-bubble");
  if (viewBubble && viewBubble.parentNode) {
    viewBubble.parentNode.removeChild(viewBubble);
  }

  // Clear any running animations
  if (window.cursorAnimationFrame) {
    cancelAnimationFrame(window.cursorAnimationFrame);
    delete window.cursorAnimationFrame;
  }

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
