// hooks/useSmoothScrollDisabler.ts
import { useEffect, RefObject, useRef } from "react";

/**
 * Custom hook to disable smooth scrolling when the referenced element is visible
 * @param elementRef - React ref to the element that should disable smooth scrolling when visible
 * @param options - IntersectionObserver options
 */
export function useSmoothScrollDisabler(
  elementRef: RefObject<HTMLElement>,
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  // Keep track of whether the smoother was initially active
  const wasActiveRef = useRef<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined" || !elementRef.current) return;

    const smoother = (window as any).__smoother__;
    if (!smoother) return;

    // Store original state ONCE at the beginning
    wasActiveRef.current = !smoother.paused();
    console.log(
      "Initial smoother state:",
      wasActiveRef.current ? "active" : "paused"
    );

    // Create the observer to detect when element enters/exits viewport
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // When element is visible, disable smooth scrolling
        console.log("Disabling smooth scroll for element");
        smoother.paused(true);
      } else {
        // When element exits viewport, restore to ORIGINAL state
        console.log(
          "Restoring smooth scroll to original state:",
          wasActiveRef.current ? "active" : "paused"
        );
        smoother.paused(!wasActiveRef.current);
      }
    }, options);

    // Start observing the element
    observer.observe(elementRef.current);

    // Cleanup on unmount
    return () => {
      observer.disconnect();
      // Ensure we restore the smoother to its original state
      if (smoother) {
        console.log(
          "Cleanup: restoring smooth scroll to:",
          wasActiveRef.current ? "active" : "paused"
        );
        smoother.paused(!wasActiveRef.current);
      }
    };
  }, [elementRef, options]);
}

export default useSmoothScrollDisabler;
