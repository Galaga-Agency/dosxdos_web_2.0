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

  // Dummy tween to establish time 0
  tl.to({}, { duration: 0 });

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
      0.5 // start at 0.5s
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
      0.5 // also start at 0.5s
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
