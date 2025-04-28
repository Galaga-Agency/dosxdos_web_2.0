import { SplitText } from "@/plugins";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: any[] = [];

// Helper to safely add ScrollTrigger instances to our cleanup array
const trackScrollTrigger = (instance: globalThis.ScrollTrigger) => {
  scrollTriggerInstances.push(instance);
  return instance;
};

// Function to clean up all animations when navigating away
export function cleanupBlogDetailAnimations() {
  // Kill all tracked ScrollTrigger instances
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  // Clear the array
  scrollTriggerInstances.length = 0;

  // Kill all animations related to blog-detail
  gsap.killTweensOf(".blog-detail");
  gsap.killTweensOf(".blog-detail *");

  // Refresh ScrollTrigger to ensure all instances are properly removed
  ScrollTrigger.refresh(true);
}

// Function to split text into characters for animation
export function splitTextIntoChars(element: HTMLElement) {
  if (!element) return;

  // Original behavior for multiple elements
  let char_come = gsap.utils.toArray(".char-animation");
  char_come.forEach((splitTextLine: any) => {
    gsap.set(splitTextLine, {
      visibility: "hidden",
      perspective: 300,
    });

    const itemSplitted = new SplitText(splitTextLine, {
      type: "chars, words",
    });

    gsap.set(splitTextLine, { visibility: "visible" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: splitTextLine,
        start: "top 90%",
        end: "bottom 60%",
        scrub: false,
        markers: false,
        toggleActions: "play none none none",
      },
    });

    tl.from(itemSplitted.chars, {
      duration: 1,
      x: 100,
      autoAlpha: 0,
      stagger: 0.05,
    });
  });
}

/**
 * Sets up proper parallax effect for hero section
 */
function setupHeroParallax(sectionEl: HTMLElement, targetEl: gsap.TweenTarget) {
  if (!sectionEl || !targetEl) return;

  // Set initial position
  gsap.set(targetEl, { y: 0 });

  // Create ScrollTrigger for parallax effect
  const instance = ScrollTrigger.create({
    trigger: sectionEl,
    start: "top top",
    end: "bottom top",
    scrub: 1.5,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      gsap.to(targetEl, {
        y: `-${self.progress * 20}%`,
        ease: "none",
        overwrite: "auto",
      });
    },
  });

  // Track this ScrollTrigger instance for cleanup
  trackScrollTrigger(instance);

  return instance;
}

// Animation interface for blog detail page elements
export const initBlogDetailAnimations = ({
  heroSection,
  heroImage,
  heroTitle,
  heroCategory,
  heroDate,
  heroAuthor,
  backButton,
  content,
  relatedPosts,
  ctaSection,
}: {
  heroSection?: HTMLElement;
  heroImage?: HTMLElement;
  heroTitle?: HTMLElement;
  heroCategory?: HTMLElement;
  heroDate?: HTMLElement;
  heroAuthor?: HTMLElement;
  backButton?: HTMLElement;
  content?: HTMLElement;
  relatedPosts?: HTMLElement;
  ctaSection?: HTMLElement;
}) => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Force a context refresh to ensure proper registration
  ScrollTrigger.getAll().forEach((t) => t.refresh());

  // Ensure previous animations are cleaned up
  cleanupBlogDetailAnimations();

  // Setup hero parallax ONLY for the image
  if (heroSection && heroImage) {
    setupHeroParallax(heroSection, heroImage);
  }

  // Split text for char-by-char animation if needed
  if (heroTitle) {
    splitTextIntoChars(heroTitle);
  }

  // Create a timeline for the hero section animations
  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 0.5, // Reduced from 1.5 to make animations start sooner
    onStart: () => console.log("Hero timeline started"),
  });

  // Back button animation
  if (backButton) {
    tl.fromTo(
      backButton,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      0
    );
  }

  // Category animation
  if (heroCategory) {
    tl.fromTo(
      heroCategory,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.6
    );
  }

  // Date animation
  if (heroDate) {
    tl.fromTo(
      heroDate,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.7
    );
  }

  // Author animation
  if (heroAuthor) {
    tl.fromTo(
      heroAuthor,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      1.3
    );
  }

  // Corners animation
  const corners = heroSection?.querySelectorAll(".blog-detail__hero-corner");
  if (corners?.length) {
    tl.fromTo(
      corners,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1 },
      1
    );
  }

  // Content animations with ScrollTrigger
  if (content) {
    const contentElements = content.querySelectorAll(
      "p, h2, h3, ul, ol, blockquote"
    );

    // Create scroll-triggered animations for content
    const contentTrigger = ScrollTrigger.create({
      trigger: content,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          contentElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: "power2.out",
          }
        );
      },
      once: true,
    });

    // Track for cleanup
    trackScrollTrigger(contentTrigger);
  }

  // Related posts section animation
  if (relatedPosts) {
    const relatedTitle = relatedPosts.querySelector(
      ".blog-detail__related-title"
    );
    const relatedItems = relatedPosts.querySelectorAll(
      ".blog-detail__related-item"
    );

    const relatedTrigger = ScrollTrigger.create({
      trigger: relatedPosts,
      start: "top 80%",
      onEnter: () => {
        if (relatedTitle) {
          gsap.fromTo(
            relatedTitle,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            }
          );
        }

        if (relatedItems.length) {
          gsap.fromTo(
            relatedItems,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
            }
          );
        }
      },
      once: true,
    });

    // Track for cleanup
    trackScrollTrigger(relatedTrigger);
  }

  // CTA section animation
  if (ctaSection) {
    const ctaTitle = ctaSection.querySelector(".blog-detail__cta-title");
    const ctaText = ctaSection.querySelector(".blog-detail__cta-text");
    const ctaButton = ctaSection.querySelector(".blog-detail__cta-button");

    const ctaTrigger = ScrollTrigger.create({
      trigger: ctaSection,
      start: "top 75%",
      onEnter: () => {
        const ctaTl = gsap.timeline({ defaults: { ease: "power2.out" } });

        if (ctaTitle) {
          ctaTl.fromTo(
            ctaTitle,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            0
          );
        }

        if (ctaText) {
          ctaTl.fromTo(
            ctaText,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            0.2
          );
        }

        if (ctaButton) {
          ctaTl.fromTo(
            ctaButton,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            0.4
          );
        }

        // Highlight animation
        const highlight = ctaSection.querySelector(".highlight");
        if (highlight) {
          ctaTl.fromTo(
            highlight,
            { backgroundSize: "0% 100%" },
            { backgroundSize: "100% 100%", duration: 1, ease: "power2.inOut" },
            0.6
          );
        }
      },
      once: true,
    });

    // Track for cleanup
    trackScrollTrigger(ctaTrigger);
  }

  // Refresh ScrollTrigger to ensure all is registered correctly
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);

  return tl;
};

// Setup hover effects
export const setupHoverEffects = () => {
  // Back button hover effect
  const backButton = document.querySelector(".blog-detail__back-button");
  if (backButton) {
    const arrow = backButton.querySelector(".arrow");
    if (arrow) {
      backButton.addEventListener("mouseenter", () => {
        gsap.to(arrow, { x: -5, duration: 0.3, ease: "power2.out" });
      });

      backButton.addEventListener("mouseleave", () => {
        gsap.to(arrow, { x: 0, duration: 0.3, ease: "power2.out" });
      });
    }
  }

  // Related posts hover effects
  const relatedItems = document.querySelectorAll(".blog-detail__related-item");
  relatedItems.forEach((item) => {
    const image = item.querySelector(".blog-detail__related-image");
    if (image) {
      item.addEventListener("mouseenter", () => {
        gsap.to(image, { scale: 1.05, duration: 0.4, ease: "power2.out" });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(image, { scale: 1, duration: 0.4, ease: "power2.out" });
      });
    }
  });

  // CTA button hover effect
  const ctaButton = document.querySelector(".blog-detail__cta-button");
  if (ctaButton) {
    const icon = ctaButton.querySelector(".button-icon");
    if (icon) {
      ctaButton.addEventListener("mouseenter", () => {
        gsap.to(icon, { x: 5, duration: 0.3, ease: "power2.out" });
      });

      ctaButton.addEventListener("mouseleave", () => {
        gsap.to(icon, { x: 0, duration: 0.3, ease: "power2.out" });
      });
    }
  }
};
