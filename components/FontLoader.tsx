"use client";

import { useEffect } from "react";

const FontLoader = () => {
  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Load critical fonts
        await Promise.all([
          document.fonts.load('600 1rem "Big Shoulders Display"'),
          document.fonts.load('700 1rem "Big Shoulders Display"'),
          document.fonts.load('400 1rem "Sarabun"'),
        ]);

        // Set a flag to prevent FOUT on critical text elements
        document.documentElement.style.setProperty("--fonts-loaded", "1");

        // Small delay to ensure smooth transition
        setTimeout(() => {
          document.body.classList.add("fonts-ready");
        }, 50);
      } catch (error) {
        console.warn("Font loading failed:", error);
        // Fallback - just add the class anyway after a timeout
        setTimeout(() => {
          document.body.classList.add("fonts-ready");
        }, 1000);
      }
    };

    // Only run if fonts aren't already loaded
    if (!document.body.classList.contains("fonts-ready")) {
      loadFonts();
    }
  }, []);

  return null;
};

export default FontLoader;
