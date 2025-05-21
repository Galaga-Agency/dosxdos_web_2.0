"use client";

import { gsap } from "gsap";

export function accionSocialHeroAnim() {
  const heroArea = document.querySelector(".accion-social-hero");
  const bgContainer = document.querySelector(
    ".accion-social-hero__bg-container"
  );
  const titleRef1 = document.querySelector(".accion-social-hero__title.text-1");
  const titleRef2 = document.querySelector(".accion-social-hero__title.text-2");
  const labelRef = document.querySelector(".accion-social-hero__label");
  const descriptionRef = document.querySelector(
    ".accion-social-hero__description"
  );
  const ctaRef = document.querySelector(".accion-social-hero__cta");

  if (heroArea) {
    // Create timeline with default settings
    const masterTimeline = gsap.timeline({
      defaults: {
        duration: 1.7,
        ease: "power2.out",
      },
    });

    // Set initial states
    gsap.set(bgContainer, { scale: 1.3 });
    gsap.set(titleRef1, { x: 300, opacity: 0 });
    gsap.set(titleRef2, { x: -300, opacity: 0 });
    gsap.set(labelRef, { x: -300, opacity: 0 });
    gsap.set(descriptionRef, { x: -500, opacity: 0 });

    if (ctaRef) {
      gsap.set(ctaRef, { y: 30, opacity: 0 });
    }

    // Animate elements
    masterTimeline.to(bgContainer, { scale: 0.9 }, 0);
    masterTimeline.to(titleRef1, { x: 0, opacity: 1 }, 0);
    masterTimeline.to(titleRef2, { x: 0, opacity: 1 }, 0);
    masterTimeline.to(labelRef, { x: 0, opacity: 1 }, 0);
    masterTimeline.to(descriptionRef, { x: 0, opacity: 1 }, 0);

    if (ctaRef) {
      masterTimeline.to(ctaRef, { y: 0, opacity: 1 }, 0);
    }
  }
}

export default { accionSocialHeroAnim };