import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const templatePageAnimation = (
  overlayRef: React.RefObject<HTMLDivElement>,
  logoRef: React.RefObject<HTMLDivElement>,
  contentRef?: React.RefObject<HTMLDivElement>
) => {
  const overlay = overlayRef.current;
  const logo = logoRef.current;
  const content = contentRef?.current;

  if (!overlay || !logo) return;

  // Double check - if menu triggered it, do nothing
  if (window.__transitionTriggeredByMenu) {
    console.log("Menu triggered navigation - skipping transition");
    return () => {};
  }

  console.log("Running page transition animation...");

  // Kill existing ScrollTriggers to prevent conflicts
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Ensure scroll is at top
  const resetScroll = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (window.ScrollSmoother) {
      const smoother = window.ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(0, false);
      }
    }
  };

  resetScroll();

  // Set initial states
  gsap.set(overlay, {
    opacity: 1,
    display: "block",
  });

  gsap.set(logo, {
    scale: 0.4,
    opacity: 0,
  });

  // Hide content initially
  if (content) {
    gsap.set(content, {
      opacity: 0,
    });
  }

  // Create main timeline
  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    onStart: () => {
      resetScroll();
    },
  });

  // Animate logo entrance
  tl.to(logo, {
    scale: 0.8,
    opacity: 1,
    duration: 0.5,
    ease: "back.out(1.2)",
  })
    // Hold for a moment
    .to({}, { duration: 0.3 })
    // Scale down and fade out logo
    .to(logo, {
      scale: 0.4,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
    })
    // Fade out overlay and fade in content simultaneously
    .to(
      overlay,
      {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          overlay.style.display = "none";

          // Refresh ScrollTrigger after transition
          setTimeout(() => {
            ScrollTrigger.refresh(true);

            // Reinitialize ScrollSmoother if needed
            if (window.ScrollSmoother) {
              const smoother = window.ScrollSmoother.get();
              if (smoother) {
                smoother.refresh();
              }
            }
          }, 50);
        },
      },
      "-=0.2"
    );

  // Fade in content
  if (content) {
    tl.to(
      content,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }

  // Cleanup function
  return () => {
    tl.kill();
  };
};
