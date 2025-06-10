import React, { useRef } from "react";
import { Upload, Trash2 } from "lucide-react";

interface GalleryUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  projectId: string;
  disabled?: boolean;
}

const GalleryUpload: React.FC<GalleryUploadProps> = ({
  images,
  onImagesChange,
  projectId,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      onImagesChange([...images, ...uploadedUrls]);
    } catch (err) {
      console.error("Failed to upload gallery images:", err);
      alert("No se pudieron subir algunas imágenes de la galería");
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="form-group">
      <label className="form-label">Galería de Imágenes</label>
      <div className="gallery-upload">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={disabled}
        />

        <button
          type="button"
          className="gallery-upload-btn"
          onClick={() => !disabled && fileInputRef.current?.click()}
          disabled={disabled}
        >
          <Upload size={20} />
          Subir Imágenes
        </button>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image} alt={`Imagen ${index + 1}`} />
              <button
                type="button"
                className="gallery-item-delete"
                onClick={() => handleRemoveImage(index)}
                disabled={disabled}
                aria-label="Eliminar imagen"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryUpload;
