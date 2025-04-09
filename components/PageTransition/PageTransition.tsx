"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";
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

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathRef.current && !isTransitioning) {
      runTransition(children);
      prevPathRef.current = pathname;
    }
  }, [pathname, children, isTransitioning]);

  const runTransition = (newChildren: React.ReactNode) => {
    if (!containerRef.current) return;

    setIsTransitioning(true);
    setContentVisible(false);
    containerRef.current.innerHTML = "";

    const primary = document.createElement("div");
    const secondary = document.createElement("div");
    const glass = document.createElement("div");

    primary.className = "page-transition__panel primary";
    secondary.className = "page-transition__panel secondary";
    glass.className = "page-transition__panel glass";

    containerRef.current.appendChild(primary);
    containerRef.current.appendChild(secondary);
    containerRef.current.appendChild(glass);

    const tl = gsap.timeline({
      onComplete: () => {
        containerRef.current!.innerHTML = "";
        setIsTransitioning(false);
      },
    });

    // Initial state
    gsap.set(primary, { x: "-100%", width: "25vw", left: "0" });
    gsap.set(secondary, { width: "0vw", left: "25vw" });
    gsap.set(glass, { width: "0vw", left: "95vw" });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.9 });

    // PRIMARY SLIDE IN (from left, stops at 0)
    tl.to(primary, {
      x: "0%",
      duration: 0.5,
      ease: "power3.out",
    });

    // LOGO FADE + SCALE IN
    if (logoRef.current) {
      tl.to(
        logoRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "<+0.1"
      );
    }

    // SECONDARY STRETCHES from 0 to 70vw (starts from 25vw)
    tl.to(
      secondary,
      {
        width: "10vw",
        duration: 0.6,
        ease: "power3.inOut",
      },
      "<+0.1"
    );

    // GLASS STRETCHES from 0 to 50vw (starts from 95vw)
    tl.to(
      glass,
      {
        width: "50vw",
        duration: 0.5,
        ease: "power3.inOut",
      },
      "<+0.1"
    );

    // SWAP PAGE CONTENT
    tl.call(
      () => {
        setDisplayChildren(newChildren);
        setContentVisible(true);
      },
      null,
      "<+0.2"
    );

    // EXIT ANIMATION: glass → secondary → primary
    tl.to(
      glass,
      {
        width: "0vw",
        duration: 0.3,
        ease: "power2.in",
      },
      "+=0.5"
    );

    tl.to(
      secondary,
      {
        width: "0vw",
        duration: 0.4,
        ease: "power2.in",
      },
      "<+0.1"
    );

    if (logoRef.current) {
      tl.to(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          ease: "power2.in",
        },
        "<"
      );
    }

    // PRIMARY SLIDES OUT TO RIGHT
    tl.to(
      primary,
      {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      },
      "<+0.2"
    );
  };

  return (
    <div className="page-transition">
      <div className="page-transition__panels" ref={containerRef}></div>

      <div className="page-transition__logo" ref={logoRef}>
        <Image
          src="/assets/img/logo/logo_fondo_rojo.png"
          alt="Dos x Dos Logo"
          width={140}
          height={70}
          priority
        />
      </div>

      <div
        className="page-transition__content"
        style={{ opacity: contentVisible ? 1 : 0 }}
      >
        {displayChildren}
      </div>
    </div>
  );
}
