import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Always register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Absolute basic animation function
export const animateAboutUsSection = (elements: {
  title: HTMLElement | null;
  text: HTMLElement | null;
  image: HTMLElement | null;
}) => {
  const { title, text, image } = elements;

  // Absolute hardcore check and force animation
  if (!title || !text || !image) {
    console.error("FATAL: Missing animation elements", { title, text, image });
    return;
  }

  // Force initial state
  gsap.set([title, text, image], {
    opacity: 0,
    y: 50,
    scale: 0.9,
  });

  // Create timeline with absolute guaranteed trigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: title,
      start: "top 90%",
      end: "bottom 10%",
      toggleActions: "play none none reverse",
    },
  });

  // Brutal, guaranteed animation sequence
  tl.to(title, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: "power2.out",
  })
    .to(
      text,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .to(
      image,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.4"
    );

  // Continuous rotation - WILL SPIN NO MATTER WHAT
  gsap.to(".services-section__image", {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "linear",
  });
};
