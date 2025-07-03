"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

let ScrollSmoother: any;
let smootherInstance: any = null;

try {
  ScrollSmoother = require("@/plugins").ScrollSmoother;
  gsap.registerPlugin(ScrollSmoother);
} catch (e) {
  console.error("ScrollSmoother failed to load");
}

const createScrollSmoother = () => {
  if (!ScrollSmoother) return;

  const smoothWrapper = document.getElementById("smooth-wrapper");
  const smoothContent = document.getElementById("smooth-content");

  if (smoothWrapper && smoothContent) {
    // Kill existing instance
    if (smootherInstance) {
      smootherInstance.kill();
    }

    smootherInstance = ScrollSmoother.create({
      wrapper: smoothWrapper,
      content: smoothContent,
      smooth: 2,
      effects: true,
      smoothTouch: 0.1,
    });

    return smootherInstance;
  }
};

export default function useScrollSmooth() {
  useGSAP(() => {
    createScrollSmoother();
  });
}

// Export function to recreate ScrollSmoother
export { createScrollSmoother };
