"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import { refreshScrollTrigger } from "./scrolltrigger-config";

// Initialize counter animation for stats section
export function initStatsCounter() {
  if (typeof window === "undefined") return;

  // Find the stats section and container
  const statsSection = document.querySelector(".stats-section") as HTMLElement;
  const statsContainer = document.querySelector(
    ".stats-section__grid"
  ) as HTMLElement;

  if (!statsSection || !statsContainer) return;

  const tl = gsap.timeline();

  // Set initial visibility
  gsap.set(statsSection, { visibility: "visible", opacity: 1 });

  // Animate stats container
  gsap.set(statsContainer, { opacity: 0, y: 30 });

  tl.to(
    statsContainer,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.4)",
    },
    0.3 // Unified delay of 0.3
  );

  // Animate all stat numbers at the same time
  const statItems = statsContainer.querySelectorAll(".stats-section__item");
  statItems.forEach((el) => {
    const valueEl = el.querySelector(".stats-section__number");
    const target = parseInt(valueEl?.getAttribute("data-value") || "0", 10);
    const suffix = valueEl?.getAttribute("data-suffix") || "";

    // All stats start at the same time with 0.3s delay
    tl.to(
      { val: 0 },
      {
        val: target,
        duration: 2,
        ease: "power2.out",
        onUpdate: function () {
          if (valueEl) {
            valueEl.textContent = Math.floor(this.targets()[0].val) + suffix;
          }
        },
      },
      0.3 // Same delay for all items
    );

    const separator = el.querySelector(".stats-section__separator");
    if (separator) {
      tl.fromTo(
        separator,
        { width: "0%" },
        { width: "100%", duration: 1.2, ease: "power2.inOut" },
        0.3 // Same delay for all items
      );
    }
  });

  // Create ScrollTrigger
  ScrollTrigger.create({
    trigger: statsSection,
    animation: tl,
    start: "top 80%",
    once: true,
  });

  // Force refresh ScrollTrigger
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);

  return tl;
}

export default {
  initStatsCounter,
};
