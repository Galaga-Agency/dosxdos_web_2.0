"use client";

import { useEffect } from "react";
import { useDataStore } from "@/store/useDataStore";

interface DataPreloaderProps {
  children: React.ReactNode;
}

const DataPreloader: React.FC<DataPreloaderProps> = ({ children }) => {
  const fetchAllData = useDataStore((state) => state.fetchAllData);
  const projectsLoaded = useDataStore((state) => state.projectsLoaded);
  const postsLoaded = useDataStore((state) => state.postsLoaded);

  useEffect(() => {
    // Only fetch if data hasn't been loaded yet
    if (!projectsLoaded || !postsLoaded) {
      // Fetch data in the background without blocking UI
      fetchAllData().catch(console.error);
    }
  }, [fetchAllData, projectsLoaded, postsLoaded]);

  // Always render children immediately - no loading states here
  return <>{children}</>;
};

export default DataPreloader;
