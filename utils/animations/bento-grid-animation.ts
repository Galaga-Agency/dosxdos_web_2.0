import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

export function bentoRevealForTouchDevices(): void {
  if (typeof window === "undefined") return;

  // Only run on touch devices / mobile
  if (window.innerWidth >= 768) return;

  const items = document.querySelectorAll(".portfolio-bento__item");
  if (items.length === 0) return;

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
          ease: "power2.out",
        });

        gsap.to(label, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out",
        });

        gsap.to(title, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.2,
          ease: "power2.out",
        });
      },
      onLeave: () => {
        // Slide out (back to left) when leaving viewport
        gsap.to(title, {
          x: -50,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });

        gsap.to(label, {
          x: -50,
          opacity: 0,
          duration: 0.3,
          delay: 0.05,
          ease: "power2.in",
        });

        gsap.to(hoverInfo, {
          opacity: 0,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.in",
        });
      },
      onEnterBack: () => {
        // Slide in from left to right when scrolling up
        gsap.to(hoverInfo, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(label, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out",
        });

        gsap.to(title, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.2,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        // Slide out (back to left) when scrolling up past element
        gsap.to(title, {
          x: -50,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });

        gsap.to(label, {
          x: -50,
          opacity: 0,
          duration: 0.3,
          delay: 0.05,
          ease: "power2.in",
        });

        gsap.to(hoverInfo, {
          opacity: 0,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.in",
        });
      },
    });
  });
}
