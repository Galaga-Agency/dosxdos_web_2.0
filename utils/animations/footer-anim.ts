"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Footer animation configuration
type FooterElements = {
  footer: HTMLElement | null;
  brand: HTMLElement | null;
  contact: HTMLElement | null;
  nav: HTMLElement | null;
  cta: HTMLElement | null;
  bottom: HTMLElement | null;
  bgShape?: HTMLElement | null;
};

export const initFooterAnimations = (elements: FooterElements) => {
  if (typeof window === "undefined") return;

  const { footer, brand, contact, nav, cta, bottom, bgShape } = elements;
  if (!footer || !brand || !contact || !nav || !cta || !bottom) return;

  // Flag to track if animations have been triggered
  const animationTriggered = (footer as any)._footerAnimationTriggered;
  if (animationTriggered) return;

  // Mark that animations have been triggered
  (footer as any)._footerAnimationTriggered = true;

  // Clean up existing ScrollTrigger instances
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Media query for responsive design
  const mobileQuery = window.matchMedia("(max-width: 768px)");
  setupAnimations(mobileQuery.matches);

  // Resize handler
  const handleResize = (e: MediaQueryListEvent) => {
    setupAnimations(e.matches);
  };

  mobileQuery.addEventListener("change", handleResize);
  setupLinkEffects();

  // Add scroll-driven animation for background shapes
  if (bgShape) {
    setupScrollBasedShapeMovement(bgShape, footer);
  }

  // Refresh ScrollTrigger
  ScrollTrigger.refresh();

  // Return a cleanup function
  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.killTweensOf("*");
    mobileQuery.removeEventListener("change", handleResize);
    cleanupLinkEffects();
  };

  // Setup animations based on screen size
  function setupAnimations(isMobile: boolean) {
    // Clean up existing ScrollTrigger instances first
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Configuration variables
    const duration = isMobile ? 0.4 : 0.5; // Faster animations
    const stagger = isMobile ? 0.05 : 0.07;
    const yOffset = isMobile ? 25 : 40;
    const ease = "power3.out";

    // Create main entrance timeline
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: isMobile ? "top bottom-=50" : "top bottom-=150",
        toggleActions: "play none none none", // Prevent re-triggering
      },
    });

    // Enhanced entrance animations
    timeline
      // Brand animation
      .from(brand, {
        y: yOffset,
        opacity: 0,
        scale: 0.95,
        duration,
        ease,
      })
      // Contact links
      .from(
        contact?.querySelectorAll("a") || [],
        {
          y: yOffset / 2,
          opacity: 0,
          stagger: stagger,
          duration: duration - 0.1,
          ease,
          x: -10,
        },
        "-=0.2"
      )
      // Nav columns
      .from(
        nav?.querySelectorAll(".footer__nav-column") || [],
        {
          y: yOffset,
          opacity: 0,
          stagger: stagger,
          duration,
          ease,
          x: 10,
        },
        "-=0.3"
      )
      // CTA section
      .from(
        cta,
        {
          y: yOffset * 1.5,
          opacity: 0,
          duration: duration + 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )
      // Bottom section
      .from(
        bottom,
        {
          y: yOffset / 2,
          opacity: 0,
          duration,
          ease,
        },
        "-=0.2"
      );

    // CTA button animation
    const ctaButton = cta?.querySelector(".footer__cta-button");
    if (ctaButton) {
      gsap.to(ctaButton, {
        y: -5,
        scale: 1.03,
        duration: 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });
    }
  }

  // Set up scroll-based movement for background shapes
  function setupScrollBasedShapeMovement(
    bgShape: HTMLElement,
    footer: HTMLElement
  ) {
    // Main shape - moves up as user scrolls down
    gsap.to(bgShape, {
      y: -150, // Move upward by 150px when scrolled to bottom
      ease: "none",
      scrollTrigger: {
        trigger: footer,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5, // Smooth movement based on scroll position
      },
    });

    // Check if pseudo-elements are present via computed styles
    const computedStyle = getComputedStyle(bgShape);
    const hasPseudoElements = computedStyle.content !== "none";

    // If we can't directly animate pseudo-elements with GSAP,
    // we'll use CSS variables that get updated based on scroll
    if (hasPseudoElements) {
      gsap.to(bgShape, {
        "--before-y": "-120px", // Move before element up 120px
        "--after-y": "-220px", // Move after element up 180px
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }
  }

  // Setup link hover effects with more pronounced animations
  function setupLinkEffects() {
    const navLinks = document.querySelectorAll(".footer__nav a");
    const legalLinks = document.querySelectorAll(".footer__legal-links a");

    navLinks.forEach((link) => {
      const arrow = link.querySelector(".link-arrow");

      // Store original positions
      if (arrow) {
        gsap.set(arrow, { opacity: 0, x: -10 });
      }

      const handleEnter = () => {
        if (arrow) {
          gsap.to(arrow, {
            opacity: 1,
            x: 2, // Move further for more emphasis
            duration: 0.2,
            ease: "power2.out",
          });
        }

        gsap.to(link, {
          x: 7, // More movement
          color: "#ff3b30", // Add color change for more impact
          fontWeight: "600", // Add weight change for more impact
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        if (arrow) {
          gsap.to(arrow, {
            opacity: 0,
            x: -10,
            duration: 0.2,
            ease: "power2.in",
          });
        }

        gsap.to(link, {
          x: 0,
          color: "",
          fontWeight: "",
          duration: 0.2,
          ease: "power2.in",
        });
      };

      link.addEventListener("mouseenter", handleEnter);
      link.addEventListener("mouseleave", handleLeave);

      // Store handlers for cleanup
      (link as any)._enterHandler = handleEnter;
      (link as any)._leaveHandler = handleLeave;
    });

    // Simple hover effect for legal links
    legalLinks.forEach((link) => {
      const handleEnter = () => {
        gsap.to(link, {
          opacity: 0.7,
          x: 3,
          duration: 0.2,
          ease: "power1.out",
        });
      };

      const handleLeave = () => {
        gsap.to(link, {
          opacity: 1,
          x: 0,
          duration: 0.2,
          ease: "power1.in",
        });
      };

      link.addEventListener("mouseenter", handleEnter);
      link.addEventListener("mouseleave", handleLeave);

      // Store handlers for cleanup
      (link as any)._enterHandler = handleEnter;
      (link as any)._leaveHandler = handleLeave;
    });

    return [...navLinks, ...legalLinks];
  }

  // Clean up link effects
  function cleanupLinkEffects() {
    const allLinks = [
      ...document.querySelectorAll(".footer__nav a"),
      ...document.querySelectorAll(".footer__legal-links a"),
    ];

    allLinks.forEach((link) => {
      if ((link as any)._enterHandler) {
        link.removeEventListener("mouseenter", (link as any)._enterHandler);
      }
      if ((link as any)._leaveHandler) {
        link.removeEventListener("mouseleave", (link as any)._leaveHandler);
      }
    });
  }
};
