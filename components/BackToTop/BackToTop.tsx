"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import "./BackToTop.scss";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollingRef = useRef(false);

  const handleScroll = useCallback(() => {
    // Prevent scroll handler interference during scrolling
    if (scrollingRef.current) return;

    // Get scroll position
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Update visibility based on scroll position
    setIsVisible(scrollY > 300);
  }, []);

  useEffect(() => {
    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    // Prevent multiple scroll attempts
    if (scrollingRef.current) return;

    scrollingRef.current = true;
    setIsVisible(false);

    // Execute scroll with additional reliability measures
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Reset scrolling state after scroll completes
    const resetScrollingState = () => {
      scrollingRef.current = false;
      window.removeEventListener("scroll", resetScrollingState);
    };

    // Wait a bit and then reset scrolling state
    setTimeout(resetScrollingState, 1000);
    window.addEventListener("scroll", resetScrollingState);
  }, []);

  return (
    <div className={`back-to-top-wrapper ${isVisible ? "visible" : ""}`}>
      <button
        className="back-to-top-btn"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg width="14" height="14" viewBox="0 0 12 7" fill="none">
          <path
            d="M11 6L6 1L1 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}