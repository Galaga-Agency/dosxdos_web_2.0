"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

gsap.registerPlugin(ScrollTrigger);

export function footerAnimation() {
  const footer = document.querySelector(".footer");

  if (!footer) return;

  // Get all footer sections
  const brand = footer.querySelector(".footer__brand");
  const contactLinks = footer.querySelectorAll(".footer__contact a");
  const navColumns = footer.querySelectorAll(".footer__nav-column");
  const cta = footer.querySelector(".footer__cta");
  const bottom = footer.querySelector(".footer__bottom");

  // Create main timeline with scroll trigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      start: "top bottom-=100",
      once: true,
    },
    defaults: {
      duration: 0.6,
      ease: "power2.out",
    },
  });

  // Set initial states
  gsap.set([brand, contactLinks, navColumns, cta, bottom], {
    y: 40,
    opacity: 0,
  });

  // Animate elements in sequence
  tl.to(brand, { y: 0, opacity: 1 })
    .to(contactLinks, { y: 0, opacity: 1, stagger: 0.1 }, "-=0.3")
    .to(navColumns, { y: 0, opacity: 1, stagger: 0.1 }, "-=0.3")
    .to(cta, { y: 0, opacity: 1 }, "-=0.2")
    .to(bottom, { y: 0, opacity: 1 }, "-=0.2");

  // Setup simple hover effects for nav links
  const navLinks = footer.querySelectorAll(".footer__nav a");
  navLinks.forEach((link) => {
    const arrow = link.querySelector(".link-arrow");

    if (arrow) {
      gsap.set(arrow, { opacity: 0, x: -10 });
    }

    link.addEventListener("mouseenter", () => {
      gsap.to(link, { x: 5, duration: 0.3 });
      if (arrow) {
        gsap.to(arrow, { opacity: 1, x: 0, duration: 0.3 });
      }
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(link, { x: 0, duration: 0.3 });
      if (arrow) {
        gsap.to(arrow, { opacity: 0, x: -10, duration: 0.3 });
      }
    });
  });

  // Simple hover effects for legal links
  const legalLinks = footer.querySelectorAll(".footer__legal-links a");
  legalLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, { opacity: 0.7, x: 3, duration: 0.3 });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(link, { opacity: 1, x: 0, duration: 0.3 });
    });
  });
}

export default { footerAnimation };
