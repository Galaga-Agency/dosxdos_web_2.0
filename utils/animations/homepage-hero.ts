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

  console.log("Animating Hero Slider");

  const tl = gsap.timeline();

  // Prepare section
  gsap.set(section, {
    visibility: "visible",
    opacity: 1,
  });

  // Animate title element
  if (title) {
    gsap.set(title, {
      opacity: 0,
      y: -30,
    });

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

  // Animate CTA element
  if (cta) {
    gsap.set(cta, {
      opacity: 0,
      y: 30,
    });

    tl.to(
      cta,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      0.7
    );
  }

  // Play animation immediately for hero section
  tl.play();

  return tl;
};

function initHeroSlider() {
  const section = document.querySelector(".hero-slider") as HTMLElement;
  const title = document.querySelector(".hero-slider__title") as HTMLElement;
  const cta = document.querySelector(".hero-slider__cta") as HTMLElement;

  if (section) {
    animateHeroSlider({
      section,
      title,
      cta,
    });
  }
}

export { initHeroSlider };
