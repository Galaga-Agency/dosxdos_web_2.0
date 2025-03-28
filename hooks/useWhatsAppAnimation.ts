import { useEffect, RefObject } from "react";
import gsap from "gsap";

interface UseWhatsAppAnimationProps {
  buttonRef: RefObject<HTMLButtonElement>;
  tooltipRef: RefObject<HTMLSpanElement>;
  visible: boolean;
}

const useWhatsAppAnimation = ({
  buttonRef,
  tooltipRef,
  visible,
}: UseWhatsAppAnimationProps) => {
  // Entrance and exit animations
  useEffect(() => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      scale: visible ? 1 : 0.8,
      opacity: visible ? 1 : 0,
      yPercent: visible ? 0 : 20,
      duration: 0.5,
      ease: visible ? "back.out(1.7)" : "power3.in",
      delay: visible ? 0.2 : 0,
    });
  }, [buttonRef, visible]);

  // Setup hover animations
  useEffect(() => {
    if (!buttonRef.current) return;

    const hoverTl = gsap.timeline({ paused: true });

    hoverTl.to(buttonRef.current, {
      scale: 1.05,
      yPercent: -10,
      boxShadow: "0 10px 20px #dc262650",
      duration: 0.3,
      ease: "power2.out",
    });

    if (tooltipRef.current) {
      gsap.set(tooltipRef.current, {
        yPercent: 20,
        scale: 0.9,
        opacity: 0,
        visibility: "hidden",
      });

      hoverTl.to(
        tooltipRef.current,
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          visibility: "visible",
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        0
      );
    }

    const button = buttonRef.current;
    const handleMouseEnter = () => hoverTl.play();
    const handleMouseLeave = () => hoverTl.reverse();

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(button);
      if (tooltipRef.current) {
        gsap.killTweensOf(tooltipRef.current);
      }
    };
  }, [buttonRef, tooltipRef]);

  // Click animation function
  const playClickAnimation = () => {
    if (!buttonRef.current) return;

    gsap
      .timeline()
      .to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.in",
      })
      .to(buttonRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.7)",
      });
  };

  return { playClickAnimation };
};

export default useWhatsAppAnimation;
