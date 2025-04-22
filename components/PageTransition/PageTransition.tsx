"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { createPageTransitionAnimation } from "@/utils/animations/page-transition-anim";
import "./PageTransition.scss";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  const containerRef: any = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathRef.current && !isTransitioning) {
      runTransition(children);
      prevPathRef.current = pathname;
    }
  }, [pathname, children, isTransitioning]);

  const runTransition = (newChildren: React.ReactNode) => {
    if (!containerRef.current || !contentRef.current) return;

    setIsTransitioning(true);
    setContentVisible(false);

    createPageTransitionAnimation(
      containerRef,
      newChildren,
      setDisplayChildren,
      setContentVisible,
      () => setIsTransitioning(false)
    );
  };

  return (
    <div className="page-transition">
      <div className="page-transition__panels" ref={containerRef}></div>
      <div
        className="page-transition__content"
        ref={contentRef}
        style={{
          opacity: contentVisible ? 1 : 0,
          visibility: contentVisible ? "visible" : "hidden",
          transition: "opacity 0.3s ease",
        }}
      >
        {displayChildren}
      </div>
    </div>
  );
}
