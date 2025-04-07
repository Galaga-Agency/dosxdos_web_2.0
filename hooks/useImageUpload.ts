import { useState, useRef, useCallback } from 'react';

/**
 * Hook for managing image handling with base64 encoding
 * to ensure images are properly stored in the blog post
 */
export function useImageUpload() {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  // Convert a file to base64 string
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Handle cover image selection with base64 conversion
  const handleCoverImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setCoverImageFile(file);

    try {
      // Convert file to base64 string
      const base64Image = await fileToBase64(file);
      setCoverImage(base64Image);
    } catch (error) {
      console.error("Error converting image to base64:", error);
      alert("Error processing image. Please try again.");
    }
  }, []);

  // Handle removing cover image
  const handleRemoveCoverImage = useCallback(() => {
    setCoverImage(null);
    setCoverImageFile(null);
    
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = "";
    }
  }, []);

  // Handle image uploads from the editor - with base64 conversion
  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    try {
      // Convert to base64 for embedding in the blog post
      return await fileToBase64(file);
    } catch (error) {
      console.error("Error converting image to base64:", error);
      throw error;
    }
  }, []);

  // No cleanup needed for base64 strings
  const cleanup = useCallback(() => {
    // Nothing to clean up - base64 strings don't need to be revoked
  }, []);

  return {
    coverImage,
    setCoverImage,
    coverImageFile,
    setCoverImageFile,
    coverImageInputRef,
    handleCoverImageChange,
    handleRemoveCoverImage,
    handleImageUpload,
    cleanup
  };
}