import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initScrollTriggerConfig() {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });

  // Prevent scroll-linked animations during rapid scrolling
  ScrollTrigger.normalizeScroll({
    allowNestedScroll: true,
    lockAxis: false,
    type: "touch,wheel,pointer",
  });
}

export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  ScrollTrigger.clearMatchMedia();
  ScrollTrigger.refresh();
}
