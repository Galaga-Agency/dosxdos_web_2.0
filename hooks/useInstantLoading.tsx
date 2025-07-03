"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Global loading state that persists across all components
let isGlobalLoading = false;
let globalSetters: Set<(loading: boolean) => void> = new Set();
let currentPath = "";
let navigationStartTime = 0;
let pendingNavigation = false;

const updateGlobalLoading = (loading: boolean) => {
  isGlobalLoading = loading;
  globalSetters.forEach((setter) => setter(loading));
};

export const useInstantLoading = () => {
  const [isLoading, setIsLoading] = useState(isGlobalLoading);
  const pathname = usePathname();
  const router = useRouter();

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
    // If we have a pending navigation and the path actually changed
    if (pendingNavigation && currentPath !== pathname) {
      currentPath = pathname;
      pendingNavigation = false;

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
    } else if (pendingNavigation && currentPath === pathname) {
      // We clicked a link but didn't navigate (same page) - hide loading immediately
      pendingNavigation = false;
      updateGlobalLoading(false);
    }
  }, [pathname]);

  return isLoading;
};

// Helper function to normalize URL paths for comparison
const normalizePath = (url: string): string => {
  try {
    // Handle both relative and absolute URLs
    let path;
    if (url.startsWith("http")) {
      const urlObj = new URL(url);
      path = urlObj.pathname;
    } else if (url.startsWith("/")) {
      path = url;
    } else {
      // Relative path - resolve against current location
      const currentUrl = new URL(window.location.href);
      const resolvedUrl = new URL(url, currentUrl);
      path = resolvedUrl.pathname;
    }

    // Remove trailing slash except for root and normalize
    return path.replace(/\/$/, "") || "/";
  } catch {
    return url;
  }
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
        !link.hasAttribute("download") &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        // Get the destination path
        const destinationPath = normalizePath(link.href);
        const currentNormalizedPath = normalizePath(window.location.pathname);

        console.log("Click detected:", {
          destinationPath,
          currentNormalizedPath,
          willNavigate: destinationPath !== currentNormalizedPath,
        });

        // Only show loading if we're actually navigating to a different page
        if (destinationPath !== currentNormalizedPath) {
          // Record start time
          navigationStartTime = Date.now();
          pendingNavigation = true;

          // Show loading INSTANTLY
          updateGlobalLoading(true);
        } else {
          console.log("Same page click detected, not showing loading");
        }
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
