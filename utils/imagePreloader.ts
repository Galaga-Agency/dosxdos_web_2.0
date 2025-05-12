/**
 * Image utility functions for preloading, caching, and optimizing images
 */

/**
 * Preloads an array of images to improve load time for critical visuals
 * @param imagePaths Array of image paths to preload
 */
export const preloadImages = (imagePaths: string[]): void => {
  if (typeof window === "undefined") return;

  imagePaths.forEach((path) => {
    const img = document.createElement("img");
    img.src = path;
  });
};

/**
 * Preloads the next image in a slider/carousel to ensure smooth transitions
 * @param currentIndex Current active image index
 * @param images Array of all images in the slider
 * @param isCircular Whether the slider loops back to the beginning after reaching the end
 */
export const preloadNextImage = (
  currentIndex: number,
  images: string[],
  isCircular: boolean = true
): void => {
  if (typeof window === "undefined" || images.length === 0) return;

  // Calculate the index of the next image
  const nextIndex = isCircular
    ? (currentIndex + 1) % images.length
    : Math.min(currentIndex + 1, images.length - 1);

  // If we're at the last image and not circular, don't preload
  if (!isCircular && nextIndex === currentIndex) return;

  // Preload the next image
  const img = document.createElement("img");
  img.src = images[nextIndex];
};

/**
 * Preloads specific image indexes from an array
 * Useful for preloading first few images of a gallery or carousel
 * @param images Array of all images
 * @param indexes Array of indexes to preload (default: [0, 1])
 */
export const preloadImagesByIndex = (
  images: string[],
  indexes: number[] = [0, 1]
): void => {
  if (typeof window === "undefined" || images.length === 0) return;

  indexes.forEach((index) => {
    if (index >= 0 && index < images.length) {
      const img = document.createElement("img");
      img.src = images[index];
    }
  });
};

/**
 * Helper function to extract image URLs from a nested data structure
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
