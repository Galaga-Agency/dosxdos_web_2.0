import { gsap } from "gsap";

export function gallerySliderAnimation() {
  if (typeof window === "undefined") return;

  // Moving image slider
  let mediaQuery = gsap.matchMedia();

  // Only apply horizontal scrolling animation on tablets and above
  mediaQuery.add("(min-width: 768px)", () => {
    const wrappers = document.querySelectorAll(".wrapper-gallery");

    wrappers.forEach((wrapper, index) => {
      const el = wrapper as HTMLElement;
      if (!el) return;

      const distance = el.scrollWidth - el.offsetWidth;
      if (distance <= 0) return;

      const isTop = index % 2 === 0;

      gsap.fromTo(
        el,
        { x: isTop ? 0 : -distance },
        {
          x: isTop ? -distance : 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  });

  // Gallery items reveal animation
  const galleryItems = document.querySelectorAll(
    ".project-objective-section__gallery-item"
  );

  if (galleryItems.length > 0) {
    // Create a staggered animation for all gallery items
    gsap.fromTo(
      galleryItems,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryItems[0].closest(
            ".project-objective-section__gallery"
          ),
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
  }
}
