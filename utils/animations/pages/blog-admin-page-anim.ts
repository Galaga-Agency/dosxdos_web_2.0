"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import { refreshScrollTrigger } from "../scrolltrigger-config";
import { RefObject } from "react";

// Register GSAP plugins if in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Store all ScrollTrigger instances for cleanup
const scrollTriggerInstances: ScrollTrigger[] = [];

// Track ScrollTrigger instances for cleanup
function trackScrollTrigger(instance: ScrollTrigger): ScrollTrigger {
  scrollTriggerInstances.push(instance);
  return instance;
}

// Define interface for blog list animation elements
export interface BlogListAnimElements {
  headerRef?: RefObject<HTMLDivElement>;
  titleRef?: RefObject<HTMLHeadingElement>;
  actionsRef?: RefObject<HTMLDivElement>;
  postsContainerRef?: RefObject<HTMLDivElement>;
  emptyStateRef?: RefObject<HTMLDivElement>;
  paginationRef?: RefObject<HTMLDivElement>;
}

// Animation for header elements
export function animateHeader(elements: BlogListAnimElements): void {
  if (typeof window === "undefined") return;

  const { headerRef, titleRef, actionsRef } = elements;

  if (!headerRef?.current || !titleRef?.current || !actionsRef?.current) {
    return;
  }

  // Create timeline for header animations
  const tl = gsap.timeline();

  tl.fromTo(
    headerRef.current,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
  );

  tl.fromTo(
    titleRef.current,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
    "-=0.6"
  );

  tl.fromTo(
    actionsRef.current,
    { opacity: 0, x: 20 },
    { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
    "-=0.6"
  );
}

// Animation for posts or empty state
export function animateContent(
  elements: BlogListAnimElements,
  posts: any[],
  loading: boolean,
  currentPage: number,
  onAnimationComplete: () => void
): void {
  if (typeof window === "undefined" || loading) return;

  const { postsContainerRef, emptyStateRef, paginationRef } = elements;

  // Empty state animation
  if (posts.length === 0 && emptyStateRef?.current) {
    gsap.fromTo(
      emptyStateRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        onComplete: onAnimationComplete,
      }
    );
    return;
  }

  // Posts animation
  if (posts.length > 0 && postsContainerRef?.current) {
    const cards = postsContainerRef.current.querySelectorAll(".blog-post-card");

    if (cards.length > 0) {
      // Clear any existing animations
      gsap.set(cards, { clearProps: "all" });

      // Set initial state (hidden)
      gsap.set(cards, { opacity: 0, y: 30 });

      // Animate cards
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        onComplete: onAnimationComplete,
      });

      // Animate pagination if it exists
      if (paginationRef?.current) {
        gsap.fromTo(
          paginationRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.3,
            ease: "power3.out",
          }
        );
      }
    } else {
      // If no cards found, still complete the animation
      onAnimationComplete();
    }
  } else {
    // Default case if no animation targets
    onAnimationComplete();
  }
}

// Animation for deletion
export function animatePostDeletion(
  postElement: Element | null,
  onComplete: () => void
): void {
  if (typeof window === "undefined" || !postElement) {
    onComplete();
    return;
  }

  gsap.to(postElement, {
    opacity: 0,
    y: -20,
    duration: 0.5,
    ease: "power3.out",
    onComplete,
  });
}

// Initialize all blog list page animations
export function initBlogListAnimations(
  elements: BlogListAnimElements,
  posts: any[],
  loading: boolean,
  currentPage: number,
  onAnimationComplete: () => void
): void {
  if (typeof window === "undefined") return;

  // First make sure elements exist for every animation
  if (!elements.headerRef?.current || !elements.postsContainerRef?.current) {
    onAnimationComplete();
    return;
  }

  // Animate header elements
  animateHeader(elements);

  // Animate content (posts or empty state)
  animateContent(elements, posts, loading, currentPage, onAnimationComplete);

  // Refresh ScrollTrigger to ensure all is registered properly
  setTimeout(() => {
    refreshScrollTrigger();
  }, 100);
}

// Function to clean up all animations when navigating away
export function cleanupBlogListAnimations(): void {
  if (typeof window === "undefined") return;

  // Kill all tracked ScrollTriggers
  scrollTriggerInstances.forEach((trigger) => {
    trigger.kill();
  });
  scrollTriggerInstances.length = 0;

  // Kill all active GSAP animations
  gsap.killTweensOf(".blog-list-page, .blog-list-page *");

  // Clear match media queries
  ScrollTrigger.clearMatchMedia();

  // Refresh ScrollTrigger
  refreshScrollTrigger();
}
