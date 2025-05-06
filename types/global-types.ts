import { EditorBlock } from "./blog-post-types";

interface Window {
  __smoother__: any;
}

declare global {
  interface Window {
    __smoother__: any;
    cursorAnimationFrame?: number;
    ScrollTrigger: any;
    gsap?: any;
    projectsObserver?: IntersectionObserver;
  }
}

export {};
