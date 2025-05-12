import { SplitText } from "@/plugins";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { refreshScrollTrigger } from "@/utils/animations/scrolltrigger-config";

// Define interface for animation elements
export interface BlogDetailAnimElements {
  heroSection?: HTMLElement | null;
  heroImage?: HTMLElement | null;
  heroTitle?: HTMLHeadingElement | null;
  heroCategory?: HTMLElement | null;
  heroDate?: HTMLElement | null;
  heroAuthor?: HTMLElement | null;
  backButton?: HTMLElement | null;
  content?: HTMLElement | null;
  relatedPosts?: HTMLElement | null;
  ctaSection?: HTMLElement | null;
}

// Register GSAP plugins if in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

function charAnimation(current?: any) {
  // If a specific element is passed, only animate that
  if (current) {
    const splitTextLine = current;

    gsap.set(splitTextLine, {
      visibility: "hidden",
      perspective: 300,
    });

    const itemSplitted = new SplitText(splitTextLine, {
      type: "chars, words",
    });

    gsap.set(splitTextLine, { visibility: "visible" });

    const tl = gsap.timeline();
    tl.from(itemSplitted.chars, {
      duration: 1,
      x: 100,
      autoAlpha: 0,
      stagger: 0.05,
    });

    return;
  }
}

// Main animation function for blog detail page
export const animateBlogDetail = ({
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
}: BlogDetailAnimElements) => {
  if (typeof window === "undefined") return null;

  console.log("Animating Blog Detail Page");

  // Create timeline for better control
  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 0.3,
  });

  // Back button animation
  if (backButton) {
    tl.to(backButton, { opacity: 1, x: 0, duration: 0.8 }, 0);
  }

  // Hero parallax setup
  if (heroSection && heroImage) {
    // Setup parallax effect
    ScrollTrigger.create({
      trigger: heroSection,
      start: "top top",
      end: "bottom top",
      scrub: 3,
      onUpdate: (self) => {
        gsap.to(heroImage, {
          y: `-${self.progress * 50}%`,
          ease: "none",
          overwrite: "auto",
        });
      },
    });
  }

  // Title animation using SplitText
  if (heroTitle) {
    gsap.set(heroTitle, { visibility: "hidden" });
    tl.add(() => {
      charAnimation(heroTitle);
    }, 0.7);
  }

  // Category animation
  if (heroCategory) {
    tl.to(heroCategory, { opacity: 1, y: 0, duration: 0.8 }, 0.6);
  }

  // Date animation
  if (heroDate) {
    tl.to(heroDate, { opacity: 1, y: 0, duration: 0.8 }, 0.7);
  }

  // Author animation
  if (heroAuthor) {
    tl.to(heroAuthor, { opacity: 1, y: 0, duration: 0.8 }, 0.8);
  }

  // Content animations with ScrollTrigger
  if (content) {
    // Excerpt animation
    const excerpt = content.querySelector(".blog-detail__excerpt");
    if (excerpt) {
      ScrollTrigger.create({
        trigger: excerpt,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(excerpt, { opacity: 1, y: 0, duration: 0.8 });
        },
      });
    }

    // Content body elements animation
    const contentElements = content.querySelectorAll(
      ".blog-detail__body p, .blog-detail__body h1, .blog-detail__body h2, .blog-detail__body h3, .blog-detail__body ul, .blog-detail__body ol, .blog-detail__body blockquote"
    );

    if (contentElements.length) {
      ScrollTrigger.create({
        trigger: content.querySelector(".blog-detail__body"),
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            contentElements,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: "power2.out",
            }
          );
        },
      });
    }

    // Tags animation
    const tags = content.querySelector(".blog-detail__tags");
    if (tags) {
      ScrollTrigger.create({
        trigger: tags,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(tags, { opacity: 1, y: 0, duration: 0.8 });
        },
      });
    }
  }

  // Share section animation
  const shareSection = document.querySelector(".blog-detail__share-section");
  if (shareSection) {
    ScrollTrigger.create({
      trigger: shareSection,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(shareSection, { opacity: 1, y: 0, duration: 0.8 });
      },
    });
  }

  // Related posts section animation
  if (relatedPosts) {
    const relatedTitle = relatedPosts.querySelector(
      ".blog-detail__related-title"
    );
    const relatedItems = relatedPosts.querySelectorAll(
      ".blog-detail__related-item"
    );

    ScrollTrigger.create({
      trigger: relatedPosts,
      start: "top 85%",
      once: true,
      onEnter: () => {
        // First animate the title
        if (relatedTitle) {
          gsap.to(relatedTitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              // After title animation is complete, start the staggered posts animation
              if (relatedItems.length) {
                gsap.fromTo(
                  relatedItems,
                  {
                    opacity: 0,
                    y: 40,
                    scale: 0.95,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.2, // Increased stagger duration for more visible effect
                    ease: "back.out(1.2)", // Using back.out for a slight overshoot effect
                    clearProps: "transform", // Clear transform props but keep opacity
                    onComplete: () => {
                      // Make sure they stay visible
                      gsap.set(relatedItems, { opacity: 1 });
                    },
                  }
                );
              }
            },
          });
        } else {
          // If there's no title, just animate the items directly
          if (relatedItems.length) {
            gsap.fromTo(
              relatedItems,
              {
                opacity: 0,
                y: 40,
                scale: 0.95,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.2)",
                clearProps: "transform",
                onComplete: () => {
                  gsap.set(relatedItems, { opacity: 1 });
                },
              }
            );
          }
        }
      },
    });
  }

  // CTA section animation
  if (ctaSection) {
    const ctaTitle = ctaSection.querySelector(".blog-detail__cta-title");
    const ctaText = ctaSection.querySelector(".blog-detail__cta-text");
    const ctaButton = ctaSection.querySelector(".blog-detail__cta-button");

    ScrollTrigger.create({
      trigger: ctaSection,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const ctaTl = gsap.timeline({ defaults: { ease: "power2.out" } });

        if (ctaTitle) {
          ctaTl.to(ctaTitle, { opacity: 1, y: 0, duration: 0.6 }, 0);
        }

        if (ctaText) {
          ctaTl.to(ctaText, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
        }

        if (ctaButton) {
          ctaTl.to(ctaButton, { opacity: 1, y: 0, duration: 0.6 }, 0.3);
        }
      },
    });
  }

  // Mobile social section animation
  const mobileSocial = document.querySelector(
    ".blog-detail__mobile-social-section"
  );
  if (mobileSocial) {
    ScrollTrigger.create({
      trigger: mobileSocial,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(mobileSocial, { opacity: 1, y: 0, duration: 0.8 });
      },
    });
  }

  // Return the timeline for possible further modifications
  return tl;
};

// Setup hover effects for the blog page
export const setupBlogDetailHoverEffects = () => {
  if (typeof window === "undefined") return;

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

// Initialize all blog detail page animations
export const initBlogDetailAnimations = (refs: BlogDetailAnimElements) => {
  if (typeof window === "undefined") return;

  const timeline = animateBlogDetail(refs);

  // Setup hover effects after initial animations
  if (timeline) {
    timeline.eventCallback("onComplete", () => {
      setupBlogDetailHoverEffects();
    });
  } else {
    // If timeline creation fails, still set up hover effects
    setTimeout(setupBlogDetailHoverEffects, 1000);
  }

  // Refresh ScrollTrigger to ensure all is registered properly
  setTimeout(() => {
    refreshScrollTrigger();
  }, 300);
};

// Function to clean up all animations when navigating away
export function cleanupBlogDetailAnimations() {
  if (typeof window === "undefined") return;

  console.log("⚠️ Cleaning up all blog detail page animations");

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });

  // Kill all active GSAP animations
  gsap.killTweensOf(".blog-detail, .blog-detail *");

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
