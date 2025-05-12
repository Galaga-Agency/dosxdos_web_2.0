"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { charAnimation } from "../title-anim";
import { refreshScrollTrigger } from "../scrolltrigger-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Store blog page ScrollTrigger instances for selective cleanup
let blogScrollTriggerInstances: any[] = [];

// Track ScrollTrigger instances for cleanup
function trackScrollTrigger(instance: globalThis.ScrollTrigger) {
  blogScrollTriggerInstances.push(instance);
  return instance;
}

export interface BlogPageAnimElements {
  section?: HTMLElement | null;
  imageContainer?: HTMLElement | null;
  image?: HTMLElement | null;
  title?: HTMLHeadingElement | null;
  featuredDate?: HTMLElement | null;
  featuredCategory?: HTMLElement | null;
  postsSection?: HTMLElement | null;
  postsGrid?: HTMLElement | null;
  desktopSocialCta?: HTMLElement | null;
}

export const animateBlogPage = ({
  section,
  imageContainer,
  image,
  title,
  featuredDate,
  featuredCategory,
  postsSection,
  postsGrid,
  desktopSocialCta,
}: BlogPageAnimElements) => {
  if (typeof window === "undefined") return null;

  // Create timeline for better control
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Featured image section animations
  if (imageContainer) {
    gsap.set(imageContainer, { y: 50, opacity: 0 });
    tl.to(imageContainer, { y: 0, opacity: 1, duration: 1 }, 0);
  }

  // Animate featured date badge
  if (featuredDate) {
    gsap.set(featuredDate, { x: -50, opacity: 0 });
    tl.to(featuredDate, { x: 0, opacity: 1, duration: 0.8 }, 0.5);
  }

  document.querySelectorAll(".blog-page__featured-excerpt").forEach((item) => {
    (item as HTMLElement).style.opacity = "1";
  });

  // Animate featured category
  if (featuredCategory) {
    gsap.set(featuredCategory, { x: 50, opacity: 0 });
    tl.to(featuredCategory, { x: 0, opacity: 1, duration: 0.8 }, 0.6);
  }

  // Title animation using charAnimation
  if (title) {
    gsap.set(title, { visibility: "hidden" });
    tl.add(() => {
      charAnimation(title);
    }, 0.7);
  }

  // Make sure blog posts are always visible
  document.querySelectorAll(".blog-page__post-item").forEach((item) => {
    (item as HTMLElement).style.opacity = "1";
  });

  // Animate posts section
  if (postsSection) {
    const postsTitle = postsSection.querySelector(".posts-title");
    if (postsTitle) {
      gsap.set(postsTitle, { y: 30, opacity: 0 });
      tl.to(postsTitle, { y: 0, opacity: 1, duration: 0.8 }, 1.2);
    }
  }

  // Desktop social CTA highlight animation
  if (desktopSocialCta) {
    const highlightElements = desktopSocialCta.querySelectorAll(".highlight");

    if (highlightElements.length > 0) {
      // First, ensure the elements have the right initial state
      gsap.set(highlightElements, { backgroundSize: "0% 100%" });

      // Create ScrollTrigger for this section
      trackScrollTrigger(
        ScrollTrigger.create({
          trigger: desktopSocialCta,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(highlightElements, {
              backgroundSize: "100% 100%",
              duration: 0.8,
              ease: "power2.out",
            });
          },
        })
      );
    }
  }

  // Return the timeline in case further modifications are needed
  return tl;
};

// Setup hover effects for the blog page
export const setupBlogHoverEffects = () => {
  // Featured title hover effects
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
          x: 5,
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

  // Blog item hover effects
  const blogItems = document.querySelectorAll(".blog-page__post-item");

  blogItems.forEach((item) => {
    const image = item.querySelector(".blog-item__image-container img");

    if (image) {
      item.addEventListener("mouseenter", () => {
        gsap.to(image, {
          scale: 1.05,
          duration: 0.6,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    }
  });
};

// Initialize all blog page animations
export const initBlogPageAnimations = (refs: BlogPageAnimElements) => {
  if (typeof window === "undefined") return;

  console.log("Initializing Blog Page Animations");

  // CRITICAL: Make sure featured excerpt is visible first thing
  document.querySelectorAll(".blog-page__featured-excerpt").forEach((item) => {
    (item as HTMLElement).style.opacity = "1";
  });

  // Make sure blog items are visible right away
  document.querySelectorAll(".blog-page__post-item").forEach((item) => {
    (item as HTMLElement).style.opacity = "1";
  });

  // Run the main animations
  const timeline = animateBlogPage(refs);

  // Setup hover effects after initial animations
  if (timeline) {
    timeline.call(
      () => {
        setupBlogHoverEffects();
      },
      [],
      1.8
    );
  }

  // Refresh ScrollTrigger to ensure all is registered properly
  setTimeout(() => {
    refreshScrollTrigger();
  }, 300);
};

// Function to clean up all animations when navigating away
export function cleanupBlogPageAnimations() {
  if (typeof window === "undefined") return;

  console.log(
    "⚠️ Cleaning up blog page animations:",
    blogScrollTriggerInstances.length,
    "instances"
  );

  // Kill ONLY the blog page specific ScrollTriggers
  blogScrollTriggerInstances.forEach((trigger) => {
    if (trigger && typeof trigger.kill === "function") {
      trigger.kill();
    }
  });

  // Clear the instances array
  blogScrollTriggerInstances = [];

  // Refresh ScrollTrigger without clearing match media
  refreshScrollTrigger();
}
