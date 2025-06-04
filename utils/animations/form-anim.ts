import { gsap } from "gsap";

export const animateFormGroups = (refs: (HTMLDivElement | null)[]) => {
  const validRefs = refs.filter((ref) => ref !== null);
  if (validRefs.length === 0) return;

  gsap.fromTo(
    validRefs,
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.5,
    }
  );
};

export const animateSuccess = (element: HTMLElement) => {
  gsap
    .timeline()
    .to(element, { y: -5, duration: 0.2, ease: "power2.out" })
    .to(element, { y: 0, duration: 0.3, ease: "bounce.out" });
};

export const animateError = (element: HTMLElement) => {
  gsap
    .timeline()
    .to(element, { x: -5, duration: 0.1, ease: "power2.inOut" })
    .to(element, {
      x: 5,
      duration: 0.1,
      ease: "power2.inOut",
      repeat: 2,
      yoyo: true,
    })
    .to(element, { x: 0, duration: 0.1, ease: "power2.out" });
};
