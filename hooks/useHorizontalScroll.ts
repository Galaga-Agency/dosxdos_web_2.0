import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Temporary debug: show markers
  ScrollTrigger.defaults({ markers: true });
}

interface HorizontalScrollOptions {
  sectionSelector: string;
  scrub?: number | boolean;
  start?: string;
  pinSpacing?: boolean;
  onUpdate?: (self: ScrollTrigger) => void;
}

export const useHorizontalScroll = (
  containerRef: RefObject<HTMLElement>,
  sectionsRef: RefObject<HTMLElement>,
  options: HorizontalScrollOptions
) => {
  useEffect(() => {
    if (!containerRef.current || !sectionsRef.current) return;

    const {
      sectionSelector,
      scrub = 1,
      start = "top top",
      pinSpacing = true,
      onUpdate,
    } = options;

    const sections = gsap.utils.toArray<HTMLElement>(sectionSelector);

    // Calculate total scroll width
    const totalScrollWidth =
      (sectionsRef.current.scrollWidth || 0) - window.innerWidth;

    // Create horizontal scroll animation
    const mainScrollTrigger = gsap.to(sectionsRef.current, {
      x: () => -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: scrub,
        start: start,
        end: () => totalScrollWidth,
        invalidateOnRefresh: true,
        pinSpacing: pinSpacing,
        onUpdate: onUpdate,
      },
    });

    // Cleanup function
    return () => {
      mainScrollTrigger.kill();
    };
  }, [containerRef, sectionsRef, options]);
};
