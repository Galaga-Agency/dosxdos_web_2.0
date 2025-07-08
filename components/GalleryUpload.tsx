import React, { useRef } from "react";
import { Upload, Trash2 } from "lucide-react";

interface GalleryUploadProps {
  images: string[];
  galleryImages: string[];
  floatingImages: string[];
  onImagesChange: (images: string[]) => void;
  onGalleryImagesChange: (images: string[]) => void;
  onFloatingImagesChange: (images: string[]) => void;
  projectId: string;
  disabled?: boolean;
}

const GalleryUpload: React.FC<GalleryUploadProps> = ({
  images,
  galleryImages,
  floatingImages,
  onImagesChange,
  onGalleryImagesChange,
  onFloatingImagesChange,
  projectId,
  disabled = false,
}) => {
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const floatingInputRef = useRef<HTMLInputElement>(null);

  // Create safe arrays - this ENSURES we never have undefined
  const safeGalleryImages = Array.isArray(galleryImages) ? galleryImages : [];
  const safeFloatingImages = Array.isArray(floatingImages) ? floatingImages : [];

  console.log('GalleryUpload DEBUG:', {
    galleryImages,
    floatingImages,
    safeGalleryImages,
    safeFloatingImages,
    'galleryImages type': typeof galleryImages,
    'floatingImages type': typeof floatingImages,
    'safeGalleryImages type': typeof safeGalleryImages,
    'safeFloatingImages type': typeof safeFloatingImages,
    'safeGalleryImages.map': typeof safeGalleryImages.map,
    'safeFloatingImages.map': typeof safeFloatingImages.map
  });

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("articleId", projectId);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Image upload failed");
        }

        const { url } = await res.json();
        return url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      onGalleryImagesChange([...safeGalleryImages, ...uploadedUrls]);
    } catch (err) {
      console.error("Failed to upload gallery images:", err);
      alert("No se pudieron subir algunas imágenes de la galería");
    }
  };

  const handleFloatingUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("articleId", projectId);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Image upload failed");
        }

        const { url } = await res.json();
        return url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      onFloatingImagesChange([...safeFloatingImages, ...uploadedUrls]);
    } catch (err) {
      console.error("Failed to upload floating images:", err);
      alert("No se pudieron subir algunas imágenes flotantes");
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newImages = safeGalleryImages.filter((_, i) => i !== index);
    onGalleryImagesChange(newImages);
  };

  const handleRemoveFloatingImage = (index: number) => {
    const newImages = safeFloatingImages.filter((_, i) => i !== index);
    onFloatingImagesChange(newImages);
  };

  return (
    <div>
      <div className="form-group">
        <label className="form-label">Galería Carousel (Filas Horizontales)</label>
        <div className="gallery-upload">
          <input
            type="file"
            ref={galleryInputRef}
            style={{ display: "none" }}
            accept="image/*"
            multiple
            onChange={handleGalleryUpload}
            disabled={disabled}
          />

          <button
            type="button"
            className="gallery-upload-btn"
            onClick={() => !disabled && galleryInputRef.current?.click()}
            disabled={disabled}
          >
            <Upload size={20} />
            Subir Imágenes para Galería
          </button>

          <div className="gallery-grid">
            {safeGalleryImages.length > 0 ? safeGalleryImages.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`Galería ${index + 1}`} />
                <button
                  type="button"
                  className="gallery-item-delete"
                  onClick={() => handleRemoveGalleryImage(index)}
                  disabled={disabled}
                  aria-label="Eliminar imagen"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )) : null}
          </div>
          {safeGalleryImages.length > 0 && (
            <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
              {safeGalleryImages.length} imágenes para galería carousel
            </p>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Imágenes Flotantes (Sección Final)</label>
        <div className="gallery-upload">
          <input
            type="file"
            ref={floatingInputRef}
            style={{ display: "none" }}
            accept="image/*"
            multiple
            onChange={handleFloatingUpload}
            disabled={disabled}
          />

          <button
            type="button"
            className="gallery-upload-btn"
            onClick={() => !disabled && floatingInputRef.current?.click()}
            disabled={disabled}
          >
            <Upload size={20} />
            Subir Imágenes Flotantes
          </button>

          <div className="gallery-grid">
            {safeFloatingImages.length > 0 ? safeFloatingImages.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`Flotante ${index + 1}`} />
                <div style={{
                  position: 'absolute',
                  top: '4px',
                  left: '4px',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '2px 6px',
                  fontSize: '12px',
                  borderRadius: '4px'
                }}>
                  {index === 0 ? 'Grande' : `Flotante ${index}`}
                </div>
                <button
                  type="button"
                  className="gallery-item-delete"
                  onClick={() => handleRemoveFloatingImage(index)}
                  disabled={disabled}
                  aria-label="Eliminar imagen"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )) : null}
          </div>
          {safeFloatingImages.length > 0 && (
            <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
              {safeFloatingImages.length}/3 imágenes flotantes (primera = grande, resto = flotantes)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryUpload;