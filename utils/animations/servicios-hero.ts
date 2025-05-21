
import { gsap } from "gsap";

export function animateServiciosHero() {
  if (typeof window === "undefined") return;

  const section = document.querySelector(".servicios-hero");
  const title = document.querySelector(".servicios-hero__title");
  const subtitle = document.querySelector(".servicios-hero__subtitle");
  const button = document.querySelector(".servicios-hero__button");

  if (!section || !title) return;

  // Make elements visible
  const elements = [title, subtitle, button].filter(Boolean);

  // Horizontal scroll animation for tablets and above
  if (window.innerWidth >= 1025) {
    gsap.set(title, { x: "30%" });

    // Create the scroll animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 30%",
        end: "bottom 20%",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    // Add the scroll animation with easing
    tl.to(title, {
      x: "-60%",
      ease: "power2.inOut",
      duration: 1,
    });
  }
}
