"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Global loading state that persists across all components
let isGlobalLoading = false;
let globalSetters: Set<(loading: boolean) => void> = new Set();
let currentPath = "";
let navigationStartTime = 0;

const updateGlobalLoading = (loading: boolean) => {
  isGlobalLoading = loading;
  globalSetters.forEach((setter) => setter(loading));
};

export const useInstantLoading = () => {
  const [isLoading, setIsLoading] = useState(isGlobalLoading);
  const pathname = usePathname();

  useEffect(() => {
    // Register this setter
    globalSetters.add(setIsLoading);

    // Initialize current path
    if (!currentPath) {
      currentPath = pathname;
    }

    return () => {
      globalSetters.delete(setIsLoading);
    };
  }, []);

  useEffect(() => {
    // Check if this is actually a new page
    if (currentPath !== pathname && isGlobalLoading) {
      currentPath = pathname;

      // Wait for page to be fully rendered before hiding loading
      const hideLoading = () => {
        // Ensure minimum loading time to prevent flicker
        const elapsed = Date.now() - navigationStartTime;
        const minDelay = elapsed < 100 ? 100 - elapsed : 0;

        setTimeout(() => {
          updateGlobalLoading(false);
        }, minDelay);
      };

      // Use multiple checks to ensure page is fully rendered
      if (document.readyState === "complete") {
        hideLoading();
      } else {
        const onLoad = () => {
          hideLoading();
          window.removeEventListener("load", onLoad);
        };
        window.addEventListener("load", onLoad);

        // Fallback timeout
        setTimeout(hideLoading, 200);
      }
    }
  }, [pathname]);

  return isLoading;
};

// Initialize global click listener immediately
if (typeof window !== "undefined") {
  let isListenerAdded = false;

  const addGlobalListener = () => {
    if (isListenerAdded) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (
        link &&
        link.href &&
        !link.href.includes("#") &&
        !link.target &&
        !link.hasAttribute("download")
      ) {
        // Record start time
        navigationStartTime = Date.now();

        // Show loading INSTANTLY
        updateGlobalLoading(true);
      }
    };

    document.addEventListener("click", handleClick, {
      capture: true,
      passive: true,
    });
    isListenerAdded = true;
  };

  // Add listener immediately or when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addGlobalListener);
  } else {
    addGlobalListener();
  }
}
