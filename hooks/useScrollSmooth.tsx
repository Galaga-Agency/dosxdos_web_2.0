"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

let ScrollSmoother: { create: (options: any) => void };
try {
  ScrollSmoother = require("@/plugins").ScrollSmoother;
  gsap.registerPlugin(ScrollSmoother);
} catch (e) {
  console.error("ScrollSmoother failed to load");
}

export default function useScrollSmooth() {
  useGSAP(() => {
    if (!ScrollSmoother) return;

    const smoothWrapper = document.getElementById("smooth-wrapper");
    const smoothContent = document.getElementById("smooth-content");

    if (smoothWrapper && smoothContent) {
      ScrollSmoother.create({
        wrapper: smoothWrapper,
        content: smoothContent,
        smooth: 2,
        effects: true,
        smoothTouch: 0.1,
      });
    }
  });
}
