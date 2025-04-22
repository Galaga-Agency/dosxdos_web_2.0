import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface HeroAnimationRefs {
  heroArea: React.RefObject<HTMLElement>;
  bgRef: React.RefObject<HTMLDivElement>;
  titleRef1: React.RefObject<HTMLHeadingElement>;
  titleRef2: React.RefObject<HTMLHeadingElement>;
  contentRef: React.RefObject<HTMLDivElement>;
}

export function initHeroAnimations(refs: HeroAnimationRefs): void {
  const { heroArea, bgRef, titleRef1, titleRef2, contentRef } = refs;
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  if (
    !heroArea.current ||
    !bgRef.current ||
    !titleRef1.current ||
    !titleRef2.current ||
    !contentRef.current
  ) {
    return;
  }

  // Set initial states to fix visibility issues
  gsap.set([titleRef1.current, titleRef2.current, contentRef.current], {
    opacity: 0,
    y: 50,
  });

  // Background animation
  gsap.from(bgRef.current, {
    scale: 1.2,
    duration: 1.8,
    ease: "power2.out",
    immediateRender: false,
  });

  // Title animations - use timeline for better sequencing
  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  // Fix: Remove scrollTrigger from title animations since hero is above fold
  tl.to(titleRef1.current, {
    y: 0,
    opacity: 1,
    duration: 1.7,
  })
    .to(
      titleRef2.current,
      {
        y: 0,
        opacity: 1,
        duration: 1.7,
      },
      "-=1.5"
    ) // Overlap animations
    .to(
      contentRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 2,
      },
      "-=1.4"
    );

  // Fix: Add refresh after animations complete
  tl.eventCallback("onComplete", () => {
    ScrollTrigger.refresh();
  });
}
