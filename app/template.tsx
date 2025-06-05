"use client";

import { useRef, ReactNode, useEffect } from "react";
import { gsap } from "gsap";

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;

    if (content) {
      // Simple fade in only
      gsap.fromTo(
        content,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return <div ref={contentRef}>{children}</div>;
}
