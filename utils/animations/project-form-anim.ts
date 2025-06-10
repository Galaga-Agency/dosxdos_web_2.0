"use client";

import { gsap } from "gsap";

export function projectFormAnimation() {
  const header = document.querySelector(".new-project-page__header");
  const form = document.querySelector(".new-project-page__form");

  if (!header || !form) return;

  // Create entrance timeline
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  // Set initial states
  gsap.set([header, form], {
    opacity: 0,
    y: 30,
  });

  // Animate elements in
  tl.to(header, {
    opacity: 1,
    y: 0,
    duration: 0.6,
  }).to(
    form,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
    },
    "-=0.3"
  );
}

export function projectFormSubmitAnimation() {
  const form = document.querySelector(".new-project-page__form");

  if (!form) return Promise.resolve();

  return gsap.to(form, {
    opacity: 0.7,
    scale: 0.98,
    duration: 0.3,
    ease: "power2.out",
  });
}

export function projectFormResetAnimation() {
  const form = document.querySelector(".new-project-page__form");

  if (!form) return Promise.resolve();

  return gsap.to(form, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: "power2.out",
  });
}

export default {
  projectFormAnimation,
  projectFormSubmitAnimation,
  projectFormResetAnimation,
};
