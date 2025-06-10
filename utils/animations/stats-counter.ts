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

  // Helper function to parse and format numbers
  const parseStatValue = (value: string) => {
    // Remove any non-numeric characters except decimal points for parsing
    const cleanValue = value.replace(/[^\d.,]/g, "");

    if (value.includes("K")) {
      // Handle K values like "2,2K" or "52K"
      const numValue = parseFloat(cleanValue.replace(",", "."));
      return {
        target: numValue,
        isK: true,
        hasDecimal: cleanValue.includes(",") || cleanValue.includes("."),
        prefix: value.includes("+") ? "+" : "",
        suffix: "K",
      };
    } else if (value.includes("%")) {
      // Handle percentage like "87%"
      return {
        target: parseInt(cleanValue),
        isPercent: true,
        prefix: "",
        suffix: "%",
      };
    } else if (value.includes("+")) {
      // Handle "+38"
      return {
        target: parseInt(cleanValue),
        isPlain: true,
        prefix: "+",
        suffix: "",
      };
    } else {
      // Handle plain numbers like "228"
      return {
        target: parseInt(cleanValue),
        isPlain: true,
        prefix: "",
        suffix: "",
      };
    }
  };

  // Animate all stat numbers at the same time
  const statItems = statsContainer.querySelectorAll(".stats-section__item");
  statItems.forEach((el) => {
    const valueEl = el.querySelector(".stats-section__number");
    const originalValue = valueEl?.textContent || "0";
    const parsedValue = parseStatValue(originalValue);

    // Clear the initial content
    if (valueEl) {
      valueEl.textContent = parsedValue.prefix + "0" + parsedValue.suffix;
    }

    // All stats start at the same time with 0.3s delay
    tl.to(
      { val: 0 },
      {
        val: parsedValue.target,
        duration: 2,
        ease: "power2.out",
        onUpdate: function () {
          if (valueEl) {
            const currentVal = this.targets()[0].val;
            let displayValue = "";

            if (parsedValue.isK) {
              // Format K values
              if (parsedValue.hasDecimal) {
                displayValue = currentVal.toFixed(1).replace(".", ",");
              } else {
                displayValue = Math.floor(currentVal).toString();
              }
            } else {
              // Format regular numbers
              displayValue = Math.floor(currentVal).toString();
            }

            valueEl.textContent =
              parsedValue.prefix + displayValue + parsedValue.suffix;
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
