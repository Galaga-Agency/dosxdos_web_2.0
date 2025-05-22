/**
 * Device and viewport utility functions using device-detector-js
 */
import DeviceDetector from "device-detector-js";

const deviceDetector = new DeviceDetector();

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
  const device: any = deviceDetector.parse(navigator.userAgent);
  return device.device?.type === "mobile";
};

export const isTablet = (): boolean => {
  if (typeof window === "undefined") return false;

  // First try device-detector-js for real devices
  const device = deviceDetector.parse(navigator.userAgent);
  if (device.device?.type === "tablet") {
    return true;
  }

  // Fall back to screen size for dev tools simulation
  const width = window.innerWidth;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // If it's a touch device with tablet-like dimensions, consider it a tablet
  return isTouch && width >= 768 && width <= 1366;
};

export const isDesktop = (): boolean => {
  if (typeof window === "undefined") return true;
  const device = deviceDetector.parse(navigator.userAgent);
  return device.device?.type === "desktop" || device.device?.type === undefined;
};

export const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};
