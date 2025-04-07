import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface AnimationRefs {
  headerRef: React.RefObject<HTMLDivElement | null>;
  formRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook for managing page entry animations using GSAP
 */
export function useAnimations(): AnimationRefs {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Page entry animations
  useEffect(() => {
    const tl = gsap.timeline();

    if (headerRef.current && formRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      tl.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );
    }

    // Cleanup animation on unmount
    return () => {
      tl.kill();
    };
  }, []);

  return { headerRef, formRef };
}

/**
 * Handle animating form submission state
 */
export function animateFormSubmission(
  formElement: HTMLElement | null,
  isSubmitting: boolean
): Promise<void> {
  if (!formElement) return Promise.resolve();

  return new Promise((resolve) => {
    if (isSubmitting) {
      // Submit animation
      gsap.to(formElement, {
        opacity: 0.7,
        scale: 0.98,
        duration: 0.3,
        ease: "power2.out",
        onComplete: resolve
      });
    } else {
      // Reset animation
      gsap.to(formElement, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        onComplete: resolve
      });
    }
  });
}

/**
 * Hook for managing block animation in the editor
 */
export function useBlockAnimations() {
  const blockRefs = useRef<Record<string, HTMLElement | null>>({});

  const registerBlockRef = (id: string, element: HTMLElement | null) => {
    if (element && !element.dataset.animated) {
      gsap.fromTo(
        element,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
      element.dataset.animated = "true";
    }
    blockRefs.current[id] = element;
  };

  return { registerBlockRef };
}