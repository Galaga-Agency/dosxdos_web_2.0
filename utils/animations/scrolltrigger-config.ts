import gsap from "gsap";
import { ScrollTrigger } from "@/plugins";

// Global flag to track initialization
let isInitialized = false;

// Initialize ScrollTrigger with proper configuration
export function initScrollTriggerConfig() {
  if (typeof window === "undefined") return;
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  
  // Configure ScrollTrigger with optimized settings
  if (!isInitialized) {
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });
    
    console.log("ScrollTrigger initialized");
    isInitialized = true;
  }
}

// Refresh ScrollTrigger with debouncing
let refreshTimeout: any = null;
export function refreshScrollTrigger() {
  if (typeof window === "undefined") return;
  
  // Clear previous timer to debounce multiple calls
  if (refreshTimeout) clearTimeout(refreshTimeout);
  
  // Set new timer
  refreshTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
    console.log("ScrollTrigger refreshed");
    refreshTimeout = null;
  }, 100);
}

// Clean up all ScrollTriggers
export function cleanupScrollTriggers() {
  if (typeof window === "undefined") return;
  
  console.log("Cleaning up all ScrollTriggers");
  
  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((st: { kill: () => any; }) => st.kill());
  
  // Clear any match media
  ScrollTrigger.clearMatchMedia();
  
  // Force refresh
  refreshScrollTrigger();
}