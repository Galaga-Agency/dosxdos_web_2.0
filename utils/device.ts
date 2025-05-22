/**
 * Reliable device detection utilities based on screen size and user agent
 */

export const getWindowDimensions = (): { width: number; height: number } => {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;

  const width = window.innerWidth;
  const userAgent = navigator.userAgent.toLowerCase();

  // Check screen width first (most reliable)
  if (width < 768) return true;

  // Check user agent for mobile keywords
  const mobileKeywords = [
    "android",
    "iphone",
    "ipod",
    "blackberry",
    "windows phone",
    "mobile",
    "opera mini",
    "iemobile",
  ];

  return mobileKeywords.some((keyword) => userAgent.includes(keyword));
};

export const isTablet = (): boolean => {
  if (typeof window === "undefined") return false;

  const width = window.innerWidth;
  const userAgent = navigator.userAgent.toLowerCase();
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Check for tablet keywords in user agent
  const tabletKeywords = ["ipad", "tablet", "kindle", "playbook", "silk"];
  const hasTabletKeyword = tabletKeywords.some((keyword) =>
    userAgent.includes(keyword)
  );

  // iPad detection (even when requesting desktop site)
  const isIPad = /macintosh/.test(userAgent) && isTouch;

  // Size-based detection for touch devices
  const isTabletSize = width >= 768 && width <= 1024 && isTouch;

  return hasTabletKeyword || isIPad || isTabletSize;
};

export const isDesktop = (): boolean => {
  if (typeof window === "undefined") return true;

  // If it's not mobile and not tablet, it's desktop
  return !isMobile() && !isTablet();
};

export const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};
