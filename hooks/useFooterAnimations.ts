import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type FooterAnimationRefs = {
  footerRef: RefObject<HTMLDivElement | null>;
  brandRef: RefObject<HTMLDivElement | null>;
  contactRef: RefObject<HTMLDivElement | null>;
  navRef: RefObject<HTMLDivElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  bottomRef: RefObject<HTMLDivElement | null>;
};

export const useFooterAnimations = ({
  footerRef,
  brandRef,
  contactRef,
  navRef,
  ctaRef,
  bottomRef,
}: FooterAnimationRefs) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Media query for mobile/desktop
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    // Function to handle setup based on screen size
    const setupAnimations = (isMobile: boolean) => {
      // Clean up existing ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Create main timeline for entrance animations
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: isMobile ? "top bottom-=50" : "top bottom-=100",
          toggleActions: "play none none reset",
        },
      });

      // Set durations based on device
      const duration = isMobile ? 0.5 : 0.7;
      const yOffset = isMobile ? 20 : 30;

      // Main elements entrance animations
      timeline
        .from(brandRef.current, {
          y: yOffset,
          opacity: 0,
          duration,
          ease: "power2.out",
        })
        .from(
          contactRef.current?.querySelectorAll("a") || [],
          {
            y: yOffset / 2,
            opacity: 0,
            stagger: 0.1,
            duration: duration - 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          navRef.current?.querySelectorAll(".footer__nav-column") || [],
          {
            y: yOffset,
            opacity: 0,
            stagger: 0.1,
            duration,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          ctaRef.current,
          {
            y: yOffset,
            opacity: 0,
            duration,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .from(
          bottomRef.current,
          {
            y: yOffset / 2,
            opacity: 0,
            duration,
            ease: "power2.out",
          },
          "-=0.1"
        );

      // Subtle CTA button animation
      if (ctaRef.current) {
        const ctaButton = ctaRef.current.querySelector(".footer__cta-button");
        if (ctaButton) {
          gsap.to(ctaButton, {
            y: -3,
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1,
          });
        }
      }
    };

    // Initial setup
    setupAnimations(mobileQuery.matches);

    // Update on resize
    const handleResize = (e: MediaQueryListEvent) => {
      setupAnimations(e.matches);
    };

    mobileQuery.addEventListener("change", handleResize);

    // Setup link hover effects
    const setupLinkEffects = () => {
      const navLinks = document.querySelectorAll(".footer__nav a");
      const legalLinks = document.querySelectorAll(".footer__legal-links a");

      const setupHoverEffect = (link: Element) => {
        const arrow = link.querySelector(".link-arrow");

        const handleEnter = () => {
          if (arrow) {
            gsap.to(arrow, {
              opacity: 1,
              x: 0,
              duration: 0.2,
              ease: "power1.out",
            });
          }

          gsap.to(link, {
            x: 5,
            duration: 0.2,
            ease: "power1.out",
          });
        };

        const handleLeave = () => {
          if (arrow) {
            gsap.to(arrow, {
              opacity: 0,
              x: -10,
              duration: 0.2,
              ease: "power1.in",
            });
          }

          gsap.to(link, {
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
      };

      // Apply hover effects to all navigation links
      navLinks.forEach(setupHoverEffect);

      // Apply simpler hover effect to legal links (just color change handled in CSS)

      return [...navLinks, ...legalLinks];
    };

    const links = setupLinkEffects();

    // Ensure ScrollTrigger refreshes on layout changes
    ScrollTrigger.refresh();

    return () => {
      // Clean up
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf("*");

      // Remove event listeners
      links.forEach((link) => {
        if ((link as any)._enterHandler) {
          link.removeEventListener("mouseenter", (link as any)._enterHandler);
        }
        if ((link as any)._leaveHandler) {
          link.removeEventListener("mouseleave", (link as any)._leaveHandler);
        }
      });

      mobileQuery.removeEventListener("change", handleResize);
    };
  }, [footerRef, brandRef, contactRef, navRef, ctaRef, bottomRef]);
};
