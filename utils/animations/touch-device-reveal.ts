import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

export function revealForTouchDevices(): void {
  if (typeof window === "undefined") return;

  // Only run on touch devices / mobile
  if (window.innerWidth >= 768) return;

  const items = document.querySelectorAll(".reveal-item");
  if (items.length === 0) return;

  items.forEach((item) => {
    const hoverInfo = item.querySelector(".reveal-content");
    const label = item.querySelector(".reveal-label");
    const title = item.querySelector(".reveal-title");

    if (!hoverInfo || !label || !title) return;

    // Set initial states - elements start hidden and to the left
    gsap.set(hoverInfo, { opacity: 0 });
    gsap.set(label, { x: -50, opacity: 0 });
    gsap.set(title, { x: -50, opacity: 0 });

    // Create the ScrollTrigger
    ScrollTrigger.create({
      trigger: item,
      start: "top 70%",
      end: "bottom 30%",
      toggleActions: "play reverse play reverse",
      markers: false,
      onEnter: () => {
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
