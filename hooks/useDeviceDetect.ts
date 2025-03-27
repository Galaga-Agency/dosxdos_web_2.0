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
    isDesktop: true,
    isTouchDevice: false,
    windowDimensions: { width: 0, height: 0 },
  });

  useEffect(() => {
    // Initial setup
    const updateDeviceInfo = () => {
      setDeviceInfo({
        isMobile: checkIsMobile(),
        isTablet: checkIsTablet(),
        isDesktop: checkIsDesktop(),
        isTouchDevice: checkIsTouchDevice(),
        windowDimensions: getWindowDimensions(),
      });
    };

    // Set initial device info
    updateDeviceInfo();

    // Add resize listener
    window.addEventListener("resize", updateDeviceInfo);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
}

export default useDeviceDetect;
