'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to handle initial page loading state
 * Shows loading screen only on first visit to the site
 * 
 * @param loadingTime Time in ms to show loading screen on first visit
 * @returns [isLoading] - True if the loading screen should be shown
 */
export function useInitialLoading(loadingTime: number = 1500): boolean {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if this is a direct page load or navigation
    const hasVisitedSite = sessionStorage.getItem('hasVisitedSite');
    
    if (hasVisitedSite) {
      // User has already visited the site in this session,
      // images are already preloaded - no need for loading screen
      setIsLoading(false);
    } else {
      // First time visiting the site - show loading for specified period
      // while preloaded images are being loaded
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Mark that the site has been visited in this session
        sessionStorage.setItem('hasVisitedSite', 'true');
      }, loadingTime);
      
      return () => clearTimeout(timer);
    }
  }, [loadingTime]);
  
  return isLoading;
}