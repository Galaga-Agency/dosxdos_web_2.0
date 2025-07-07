"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Global state
let isGlobalLoading = false;
let globalSetters: Set<(loading: boolean) => void> = new Set();
let currentPath = "";
let navigationStartTime = 0;
let clickListener: ((e: MouseEvent) => void) | null = null;

const updateGlobalLoading = (loading: boolean) => {
  if (isGlobalLoading === loading) return;
  isGlobalLoading = loading;
  globalSetters.forEach((setter) => setter(loading));
};

export const useInstantLoading = () => {
  const [isLoading, setIsLoading] = useState(isGlobalLoading);
  const pathname = usePathname();

  useEffect(() => {
    globalSetters.add(setIsLoading);
    
    if (!currentPath) {
      currentPath = pathname;
    }

    return () => {
      globalSetters.delete(setIsLoading);
    };
  }, []);

  useEffect(() => {
    // Hide loading when path changes
    if (currentPath !== pathname && isGlobalLoading) {
      currentPath = pathname;
      updateGlobalLoading(false);
    }
  }, [pathname]);

  return isLoading;
};

// Simplified path normalization
const normalizePath = (url: string): string => {
  try {
    const urlObj = new URL(url, window.location.href);
    return urlObj.pathname.replace(/\/$/, "") || "/";
  } catch {
    return url;
  }
};

// Single global click listener - only add once
if (typeof window !== "undefined") {
  const addGlobalListener = () => {
    // Remove existing listener if any
    if (clickListener) {
      document.removeEventListener("click", clickListener, { capture: true });
    }

    clickListener = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (
        !link ||
        !link.href ||
        link.href.includes("#") ||
        link.target ||
        link.hasAttribute("download") ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.defaultPrevented
      ) {
        return;
      }

      const destinationPath = normalizePath(link.href);
      const currentNormalizedPath = normalizePath(window.location.pathname);

      // Only show loading for different pages
      if (destinationPath !== currentNormalizedPath) {
        navigationStartTime = Date.now();
        updateGlobalLoading(true);
      }
    };

    document.addEventListener("click", clickListener, {
      capture: true,
      passive: true,
    });
  };

  // Add listener when ready - only once
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addGlobalListener, { once: true });
  } else {
    addGlobalListener();
  }
}