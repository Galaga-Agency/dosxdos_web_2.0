import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Global flag to track initialization
let isInitialized = false;

// Initialize ScrollTrigger with proper configuration
export function initScrollTriggerConfig() {
  console.log("[scrolltrigger-config] initScrollTriggerConfig called, already initialized:", isInitialized);
  
  if (typeof window === "undefined") {
    console.log("[scrolltrigger-config] Aborted - not in browser");
    return;
  }
  
  // Register GSAP plugins
  console.log("[scrolltrigger-config] Registering GSAP plugins");
  gsap.registerPlugin(ScrollTrigger);
  
  // Configure ScrollTrigger with optimized settings
  if (!isInitialized) {
    console.log("[scrolltrigger-config] Configuring ScrollTrigger (first time)");
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });
    
    console.log("ScrollTrigger initialized");
    isInitialized = true;
  } else {
    console.log("[scrolltrigger-config] ScrollTrigger already initialized, skipping config");
  }
}

// Refresh ScrollTrigger with debouncing
let refreshTimeout: any = null;
export function refreshScrollTrigger() {
  console.log("[scrolltrigger-config] refreshScrollTrigger called");
  
  if (typeof window === "undefined") {
    console.log("[scrolltrigger-config] Aborted refresh - not in browser");
    return;
  }
  
  // Clear previous timer to debounce multiple calls
  if (refreshTimeout) {
    console.log("[scrolltrigger-config] Clearing previous refresh timeout");
    clearTimeout(refreshTimeout);
  }
  
  // Set new timer
  console.log("[scrolltrigger-config] Setting new refresh timeout");
  refreshTimeout = setTimeout(() => {
    console.log("[scrolltrigger-config] Executing delayed ScrollTrigger refresh");
    ScrollTrigger.refresh();
    console.log("ScrollTrigger refreshed");
    refreshTimeout = null;
  }, 100);
}

// Clean up all ScrollTriggers
export function cleanupScrollTriggers() {
  console.log("[scrolltrigger-config] cleanupScrollTriggers called");
  
  if (typeof window === "undefined") {
    console.log("[scrolltrigger-config] Aborted cleanup - not in browser");
    return;
  }
  
  console.log("Cleaning up all ScrollTriggers");
  
  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((st: { kill: () => any; }) => st.kill());
  
  // Clear any match media
  console.log("[scrolltrigger-config] Clearing match media");
  ScrollTrigger.clearMatchMedia();
  
  // Force refresh
  console.log("[scrolltrigger-config] Forcing refresh after cleanup");
  refreshScrollTrigger();
}