/**
 * Image preloading utilities
 * Updated with simple preloadImages function
 */

import { gsap } from 'gsap';

// Types
export type PreloadStatus = 'pending' | 'loading' | 'loaded' | 'error';

export interface PreloadImageOptions {
  priority?: 'high' | 'low' | 'auto';
  timeout?: number;
  onProgress?: (progress: number) => void;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  crossOrigin?: string;
  cacheBuster?: boolean;
}

export interface PreloadResult {
  totalImages: number;
  loadedImages: number;
  failedImages: number;
  progress: number;
  complete: boolean;
}

// Cache to track loaded images across the app
const imageCache = new Map<string, PreloadStatus>();

/**
 * Simple function to preload multiple images
 * Returns a promise that resolves when all images are loaded
 */
export const preloadImages = (imagePaths: string[]): Promise<void[]> => {
  if (typeof window === "undefined") return Promise.resolve([]);
  
  // Create an array of promises
  const promises = imagePaths.map(path => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      
      // Resolve the promise when the image loads or errors
      img.onload = () => {
        imageCache.set(path, 'loaded');
        resolve();
      };
      
      img.onerror = () => {
        imageCache.set(path, 'error');
        console.warn(`Failed to preload image: ${path}`);
        resolve(); // Also resolve on error to continue
      };
      
      // Start loading the image
      if (imageCache.get(path) === 'loaded') {
        resolve(); // Already loaded
      } else {
        imageCache.set(path, 'loading');
        img.src = path;
      }
    });
  });
  
  // Return a promise that resolves when all images are loaded
  return Promise.all(promises);
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
  isCircular: boolean = true,
  options: PreloadImageOptions = {}
): void => {
  if (typeof window === 'undefined' || images.length === 0 || count <= 0) return;
  
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
    if (imageCache.get(images[nextIndex]) !== 'loaded') {
      imagesToPreload.push(images[nextIndex]);
    }
  }
  
  // Preload the images
  if (imagesToPreload.length > 0) {
    preloadImages(imagesToPreload);
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

/* Keep other utility functions from your original file unchanged */