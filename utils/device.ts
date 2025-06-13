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

// NEW: Create external store for instant updates
let listeners = new Set<() => void>();
let cachedSnapshot: any = null;

// Cache the server snapshot to avoid infinite loops
const SERVER_SNAPSHOT = {
  isMobile: true,
  isTablet: false,
  isDesktop: false,
  isTouchDevice: false,
  windowDimensions: { width: 0, height: 0 },
};

const deviceStore = {
  getSnapshot(): {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isTouchDevice: boolean;
    windowDimensions: { width: number; height: number };
  } {
    const newSnapshot = {
      isMobile: isMobile(),
      isTablet: isTablet(),
      isDesktop: isDesktop(),
      isTouchDevice: isTouchDevice(),
      windowDimensions: getWindowDimensions(),
    };

    // Only update cache if values actually changed
    if (
      !cachedSnapshot ||
      cachedSnapshot.isMobile !== newSnapshot.isMobile ||
      cachedSnapshot.isTablet !== newSnapshot.isTablet ||
      cachedSnapshot.isDesktop !== newSnapshot.isDesktop ||
      cachedSnapshot.isTouchDevice !== newSnapshot.isTouchDevice ||
      cachedSnapshot.windowDimensions.width !==
        newSnapshot.windowDimensions.width ||
      cachedSnapshot.windowDimensions.height !==
        newSnapshot.windowDimensions.height
    ) {
      cachedSnapshot = newSnapshot;
    }

    return cachedSnapshot;
  },

  getServerSnapshot() {
    // Return cached stable reference
    return SERVER_SNAPSHOT;
  },

  subscribe(listener: () => void) {
    if (typeof window === "undefined") return () => {};

    listeners.add(listener);

    // Add resize listener only once
    if (listeners.size === 1) {
      let timeoutId: NodeJS.Timeout;
      const debouncedUpdate = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          listeners.forEach((l) => l());
        }, 100);
      };

      window.addEventListener("resize", debouncedUpdate);

      // Store cleanup function
      (deviceStore as any)._cleanup = () => {
        window.removeEventListener("resize", debouncedUpdate);
        clearTimeout(timeoutId);
      };
    }

    return () => {
      listeners.delete(listener);
      if (listeners.size === 0 && (deviceStore as any)._cleanup) {
        (deviceStore as any)._cleanup();
      }
    };
  },
};

export { deviceStore };
