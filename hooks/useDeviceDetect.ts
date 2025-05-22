import { useState, useEffect } from "react";
import {
  getWindowDimensions,
  isMobile as checkIsMobile,
  isTablet as checkIsTablet,
  isDesktop as checkIsDesktop,
  isTouchDevice as checkIsTouchDevice,
} from "@/utils/device";

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  windowDimensions: {
    width: number;
    height: number;
  };
}

export function useDeviceDetect(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: false, // Start with false to prevent hydration issues
    isTouchDevice: false,
    windowDimensions: { width: 0, height: 0 },
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're on the client side
    setIsClient(true);

    const updateDeviceInfo = () => {
      const newDeviceInfo = {
        isMobile: checkIsMobile(),
        isTablet: checkIsTablet(),
        isDesktop: checkIsDesktop(),
        isTouchDevice: checkIsTouchDevice(),
        windowDimensions: getWindowDimensions(),
      };

      setDeviceInfo(newDeviceInfo);
    };

    // Set initial device info
    updateDeviceInfo();

    // Add resize listener with debouncing
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDeviceInfo, 150);
    };

    window.addEventListener("resize", debouncedUpdate);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  // Return safe defaults until client-side detection is ready
  if (!isClient) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isTouchDevice: false,
      windowDimensions: { width: 0, height: 0 },
    };
  }

  return deviceInfo;
}

export default useDeviceDetect;
