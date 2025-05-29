"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import { isMobile } from "../device";

export function floatingImagesAnimation() {
  if (typeof window === "undefined") return;

  // Skip everything on mobile
  if (isMobile()) {
    console.log("Skipping floating images animation on mobile");
    return;
  }

  console.log("Setting up floating images animation on desktop");

  // Full image parallax
const fullImage = document.querySelector(
  ".floating-project-images__full-image"
);
const imageContainer = document.querySelector(
  ".floating-project-images__image-container"
);


  if (fullImage && imageContainer) {
    console.log("Setting up full image parallax");

    // Set up the ScrollTrigger for the full image
    ScrollTrigger.create({
      trigger: fullImage,
      start: "top bottom",
      end: "bottom top",
      scrub: 3,
      onUpdate: (self: any) => {
        // Move the container at 0.9 speed
        gsap.to(fullImage, {
          y: `-${self.progress * 10}%`,
          ease: "none",
          overwrite: "auto",
        });

        // Move the image itself at 1.1 speed (slightly faster)
        gsap.to(imageContainer, {
          y: `-${self.progress * 15}%`,
          ease: "none",
          overwrite: "auto",
        });
      },
    });
  }

  // Floating images parallax
const floatingImage1 = document.querySelector(
  ".floating-project-images__floating-image--1"
);
const floatingImage2 = document.querySelector(
  ".floating-project-images__floating-image--2"
);


  if (floatingImage1) {
    // Float the first image upward as you scroll
    ScrollTrigger.create({
      trigger: floatingImage1,
      start: "top bottom",
      end: "bottom top",
      scrub: 3,
      onUpdate: (self: any) => {
        gsap.to(floatingImage1, {
          y: `-${self.progress * 155}px`, // Move up faster
          ease: "none",
          overwrite: "auto",
        });
      },
    });

    // Add a gentle continuous floating effect
    gsap.to(floatingImage1, {
      y: "-=10",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }

  if (floatingImage2) {
    // Float the second image upward at a different rate
    ScrollTrigger.create({
      trigger: floatingImage2,
      start: "top bottom",
      end: "bottom top",
      scrub: 3,
      onUpdate: (self: any) => {
        gsap.to(floatingImage2, {
          y: `-${self.progress * 80}px`, // Move up slower
          ease: "none",
          overwrite: "auto",
        });
      },
    });

    // Add a gentle continuous floating effect, slightly out of sync
    gsap.to(floatingImage2, {
      y: "-=10",
      duration: 2.3, // Slightly different duration
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 0.3, // Start slightly later
    });
  }
}
