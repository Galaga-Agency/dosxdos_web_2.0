"use client";

import { useRouter } from "next/navigation";
import { ReactNode, MouseEvent } from "react";
import { gsap } from "gsap";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  ref?: any;
  rel?: string;
  onClick?: () => void;
  target?: string;
}

export default function TransitionLink({
  href,
  children,
  className,
  ref,
  rel,
  target,
  onClick,
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onClick) onClick();

    // Simple fade out without panels
    const content = document.querySelector("#smooth-content");
    if (!content) {
      router.push(href);
      return;
    }

    gsap.to(content, {
      opacity: 0.5,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        router.push(href);
      },
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      ref={ref}
      rel={rel}
      target={target}
    >
      {children}
    </a>
  );
}
