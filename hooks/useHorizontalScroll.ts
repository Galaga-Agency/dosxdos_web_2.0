import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollOptions {
  sectionSelector: string;
  scrub?: number;
  start?: string;
  snap?: boolean; // default: false
  onUpdate?: (self: ScrollTrigger) => void;
}

export const useHorizontalScroll = (
  containerRef: RefObject<HTMLElement>,
  sectionsRef: RefObject<HTMLElement>,
  options: HorizontalScrollOptions
) => {
  useEffect(() => {
    const container = containerRef.current;
    const sectionWrapper = sectionsRef.current;

    if (!container || !sectionWrapper) return;

    const sections = gsap.utils.toArray<HTMLElement>(
      options.sectionSelector,
      sectionWrapper
    );

    if (sections.length === 0) return;

    const scrollTriggerConfig: ScrollTrigger.Vars = {
      trigger: container,
      pin: true,
      scrub: options.scrub ?? 0.6,
      start: options.start ?? "top top",
      end: () => `+=${container.offsetWidth}`,
      onUpdate: options.onUpdate,
      id: "horizontal-scroll",
    };

    if (options.snap) {
      scrollTriggerConfig.snap = 1 / (sections.length - 1);
    }

    const tween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: scrollTriggerConfig,
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [containerRef, sectionsRef, options]);
};
