import { useEffect, useState } from 'react';

/**
 * Custom hook to check if the component has hydrated on the client side.
 * Prevents hydration mismatches and ensures animations run only after 
 * the client-side JavaScript has fully loaded.
 * 
 * @returns boolean - true when component is hydrated and ready for animations
 */
export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This effect only runs on the client side after hydration
    setIsHydrated(true);
  }, []);

  return isHydrated;
};