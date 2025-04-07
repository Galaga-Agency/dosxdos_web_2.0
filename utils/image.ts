
/**
 * Handle image file upload
 * In a real application, this would connect to a backend service.
 * This example creates object URLs for demo purposes.
 */
export const uploadImage = async (file: File): Promise<string> => {
    try {
      // In a real app, you'd upload to your server
      // For this demo, create an object URL
      return new Promise((resolve) => {
        setTimeout(() => {
          const imageUrl = URL.createObjectURL(file);
          resolve(imageUrl);
        }, 1000); // Simulate upload delay
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };
  
  /**
   * Validates image file before upload
   */
  export const validateImage = (file: File): { valid: boolean; error?: string } => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return { valid: false, error: 'El archivo debe ser una imagen' };
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, error: 'La imagen no debe exceder 5MB' };
    }
    
    return { valid: true };
  };
  
  /**
   * Creates a preview for an image file
   */
  export const createImagePreview = (file: File): string => {
    return URL.createObjectURL(file);
  };
  
  /**
   * Cleans up object URLs to prevent memory leaks
   */
  export const revokeObjectURL = (url: string): void => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  };