"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "./PageWrapper.scss";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({
  children,
  className = "",
}: PageWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const content = contentRef.current;
    if (!content) return;

    // Set initial state - invisible
    gsap.set(content, {
      opacity: 0,
      y: 20,
    });

    // Animate in
    gsap.to(content, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
    });

    // Fallback: ensure content is visible after animation
    const fallbackTimer = setTimeout(() => {
      if (content) {
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
      }
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <div id="smooth-wrapper">
      <div
        id="smooth-content"
        className={`page-wrapper ${className}`}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
}
