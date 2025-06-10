import { gsap } from "gsap";

export const animateHeroSlider = () => {
  if (typeof window === "undefined") return null;

  const section = document.querySelector(".hero-slider") as HTMLElement;
  const title = document.querySelector(".hero-slider__title") as HTMLElement;
  const cta = document.querySelector(".hero-slider__cta") as HTMLElement;

  if (!section) return null;

  const tl = gsap.timeline();

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
      0.3
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
        duration: 1.4,
        ease: "power2.out",
      },
      0.3
    );
  }

  return tl;
};
