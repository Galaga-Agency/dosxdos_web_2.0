"use client";

/**
 * Image preloading utilities
 */

// Types
export type PreloadStatus = "pending" | "loading" | "loaded" | "error";

export interface PreloadImageOptions {
  timeout?: number;
  abortController?: AbortController;
}

// Cache to track loaded images across the app
const imageCache = new Map<string, PreloadStatus>();

// Add global flag to track when critical images are loaded
if (typeof window !== "undefined") {
  (window as any).__PRELOADED_CRITICAL_IMAGES_READY__ = false;
}

/**
 * Simple function to preload multiple images with timeout and abort support
 * Returns a promise that resolves when all images are loaded
 */
export const preloadImages = (
  imagePaths: string[],
  options: PreloadImageOptions = {}
): Promise<void[]> => {
  if (typeof window === "undefined") return Promise.resolve([]);

  const {
    timeout = 10000, // 10 second timeout per image
    abortController = new AbortController(),
  } = options;

  // Filter out already loaded images
  const pathsToLoad = imagePaths.filter(
    (path) => imageCache.get(path) !== "loaded"
  );

  // If all images were already in cache
  if (pathsToLoad.length === 0) {
    if (typeof window !== "undefined") {
      (window as any).__PRELOADED_CRITICAL_IMAGES_READY__ = true;
    }
    return Promise.resolve([]);
  }

  // Create an array of promises
  const promises = pathsToLoad.map((path) => {
    return new Promise<void>((resolve) => {
      // Check if operation was already aborted
      if (abortController.signal.aborted) {
        resolve();
        return;
      }

      const img = new Image();

      // Resolve the promise when the image loads or errors
      img.onload = () => {
        imageCache.set(path, "loaded");
        resolve();
      };

      img.onerror = () => {
        imageCache.set(path, "error");
        console.warn(`Failed to preload image: ${path}`);
        resolve(); // Also resolve on error to continue
      };

      // Start loading the image
      if (imageCache.get(path) === "loaded") {
        resolve(); // Already loaded
      } else {
        imageCache.set(path, "loading");
        img.src = path;

        // Add timeout for this image
        if (timeout > 0) {
          setTimeout(() => {
            if (!img.complete && imageCache.get(path) !== "loaded") {
              console.warn(`Timeout preloading image: ${path}`);
              imageCache.set(path, "error");
              resolve();
            }
          }, timeout);
        }
      }

      // Handle abort for this image
      abortController.signal.addEventListener("abort", () => {
        img.src = ""; // Cancel the image load
        resolve();
      });
    });
  });

  // Return a promise that resolves when all images are loaded
  return Promise.all(promises).then(() => {
    // Set the global flag when all critical images are loaded
    if (typeof window !== "undefined") {
      (window as any).__PRELOADED_CRITICAL_IMAGES_READY__ = true;
    }
    return [];
  });
};

/**
 * Preloads the next X images in a collection starting from current index
 *
 * @param currentIndex Current active image index
 * @param images Array of all images in the collection
 * @param count Number of images to preload ahead (default: 2)
 * @param isCircular Whether the collection loops (default: true)
 */
export const preloadNextImages = (
  currentIndex: number,
  images: string[],
  count: number = 2,
  isCircular: boolean = true
): void => {
  if (typeof window === "undefined" || images.length === 0 || count <= 0)
    return;

  const imagesToPreload: string[] = [];

  // Calculate which images to preload
  for (let i = 1; i <= count; i++) {
    let nextIndex;

    if (isCircular) {
      nextIndex = (currentIndex + i) % images.length;
    } else {
      nextIndex = Math.min(currentIndex + i, images.length - 1);
      // If we're already at the end, no point continuing
      if (nextIndex === currentIndex) break;
    }

    // Add to preload list if not already loaded
    if (imageCache.get(images[nextIndex]) !== "loaded") {
      imagesToPreload.push(images[nextIndex]);
    }
  }

  // Preload the images with a lower timeout for non-critical images
  if (imagesToPreload.length > 0) {
    preloadImages(imagesToPreload, { timeout: 5000 });
  }
};

/**
 * Helper function to extract image URLs from a nested data structure
 *
 * @param items Array of items with image URLs
 * @param imageProperty Property name that contains the image URL
 * @returns Array of image URLs
 */
export const extractImageUrls = <T extends Record<string, any>>(
  items: T[],
  imageProperty: keyof T
): string[] => {
  return items
    .map((item) => item[imageProperty] as unknown as string)
    .filter(Boolean);
};

/**
 * Preload all critical images for the site
 * Call this function from your app layout component
 *
 * @param criticalImages Array of paths to critical images
 */
export const preloadCriticalImages = (
  criticalImages: string[]
): Promise<void[]> => {
  // Create an abort controller for cleanup
  const abortController = new AbortController();

  // If user closes tab during loading, abort preload
  if (typeof window !== "undefined") {
    window.addEventListener(
      "beforeunload",
      () => {
        abortController.abort();
      },
      { once: true }
    );
  }

  return preloadImages(criticalImages, {
    timeout: 15000, // Higher timeout for critical images
    abortController,
  });
};
