import { EditorBlock } from "./blog-post-types";

interface Window {
  __smoother__: any;
}

declare global {
  interface Window {
    __smoother__: any;
    cursorAnimationFrame?: number;
    ScrollTrigger: any;
    ScrollSmoother: any;
    gsap?: any;
    projectsObserver?: IntersectionObserver;
    clickTimes?: number[];
    pageTransitionComplete: any;
    __transitionTriggeredByMenu: any;
    __targetHref: any;
  }
}

export {};
