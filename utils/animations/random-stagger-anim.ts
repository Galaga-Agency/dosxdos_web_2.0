import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a random stagger animation for category items
 * Items will pop in one by one in random order
 */
export const randomStaggerAnimation = () => {
  const items = document.querySelectorAll(".about-services__category");

  if (items.length === 0) return;

  // Create array of indices and shuffle them for random order
  const indices = Array.from({ length: items.length }, (_, i) => i);

  // Fisher-Yates shuffle algorithm
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Set initial state - REALLY hidden
  gsap.set(items, {
    opacity: 0,
    scale: 0.3,
    y: 50,
  });

  // Animate each item in random order
  items.forEach((item, originalIndex) => {
    const randomIndex = indices.indexOf(originalIndex);
    const randomDelay = randomIndex * 0.1;

    gsap.to(item, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      delay: randomDelay,
      ease: "power1.out",
      scrollTrigger: {
        trigger: item.closest(".about-services") || item,
        start: "top 80%",
        toggleActions: "play none none reverse",
        once: true,
      },
    });
  });
};
