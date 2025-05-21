import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

export function featuredImageAnimation() {
  if (typeof window === "undefined") return;

  // Featured image container
  const imageContainer = document.querySelector(
    ".featured-image-container"
  );

  // Featured image parallax
  if (imageContainer) {
    const imageWrapper = document.querySelector(
      ".featured-image-wrapper"
    );

    if (imageWrapper) {
      // Initial fade in
      gsap.fromTo(
        imageContainer,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }

  // Animate featured title hover effect
  const featuredLinks = document.querySelectorAll(
    ".blog-page__featured-content-link"
  );
  featuredLinks.forEach((link) => {
    const readMoreArrow = link.querySelector(
      ".blog-page__featured-read-more .arrow"
    );

    if (readMoreArrow) {
      // Create hover animations for the arrow
      link.addEventListener("mouseenter", () => {
        gsap.to(readMoreArrow, {
          x: 10,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(readMoreArrow, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }
  });
}
