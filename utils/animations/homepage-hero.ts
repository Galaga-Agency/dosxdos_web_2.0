import { gsap } from "gsap";

// Define the section animation element interface
interface SectionAnimationElements {
  section: HTMLElement;
  title?: HTMLElement;
  cta?: HTMLElement;
}

export const animateHeroSlider = ({
  section,
  title,
  cta,
}: SectionAnimationElements) => {
  if (typeof window === "undefined" || !section) return null;

  const tl = gsap.timeline();

  const container = section.querySelector(".hero-slider__container");

  // Animate container fade-in
  if (container) {
    gsap.set(container, { opacity: 0 });

    tl.to(
      container,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      0
    ); // Start immediately
  }

  // Title
  if (title) {
    gsap.set(title, { opacity: 0, y: -30 });

    tl.to(
      title,
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power2.out",
      },
      0.5
    );
  }

  // CTA
  if (cta) {
    gsap.set(cta, { opacity: 0, y: 30 });

    tl.to(
      cta,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      0.6
    );
  }

  return tl;
};
