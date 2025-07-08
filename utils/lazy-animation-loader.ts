export const loadHomePageAnimations = async () => {
  // Load GSAP dynamically
  const [
    { default: gsap },
    { ScrollTrigger },
    { ScrollSmoother },
    { SplitText },
  ] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/ScrollSmoother"),
    import("gsap/SplitText"),
  ]);

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

  // Load animation functions dynamically
  const [
    { charAnimation },
    { imageParallax },
    { hoverCircleButtonAnimation },
    { featuredImageAnimation },
    { highlightAnimation },
    { initRollingTextAnimation },
    { animateHeroSlider },
  ] = await Promise.all([
    import("@/utils/animations/text-anim"),
    import("@/utils/animations/image-parallax"),
    import("@/utils/animations/hover-btn"),
    import("@/utils/animations/featured-image-anim"),
    import("@/utils/animations/highlight-anim"),
    import("@/utils/animations/rolling-text-animation"),
    import("@/utils/animations/homepage-hero"),
  ]);

  return {
    gsap,
    charAnimation,
    imageParallax,
    hoverCircleButtonAnimation,
    featuredImageAnimation,
    highlightAnimation,
    initRollingTextAnimation,
    animateHeroSlider,
  };
};

export const loadServiceAnimations = async () => {
  const { initCardMouseParallax } = await import(
    "@/utils/animations/card-hover-anim"
  );
  return { initCardMouseParallax };
};

export const loadProjectAnimations = async () => {
  const { panelTwoAnimation } = await import(
    "@/utils/animations/panel-animation"
  );
  return { panelTwoAnimation };
};
