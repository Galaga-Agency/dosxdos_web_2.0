// plugins/index.ts

// Import GSAP
import { gsap } from "gsap";

// Keep your original exports (these use the local files)
export { default as ScrollTrigger } from "./gsap-scroll-trigger";
export { default as ScrollSmoother } from "./gsap-scroll-smoother";
export { default as SplitText } from "./gsap-split-text.js";
export { default as cursorAnimation } from "./tp-cursor";
export { default as chroma } from "./chroma.min";
export { default as WebGL } from "./webgl";

// Also export GSAP itself
export { gsap };

// The comment below is for documentation, keep it
// DO NOT DELETE THIS FOLDER OR ANY OF THESE FILES IN IT AS THEY ARE PREMIUM FEATURES THAT YOU CANT INSTALL THROUGH NPM WITHOUT A PREMIUM MEMBERSHIP.
