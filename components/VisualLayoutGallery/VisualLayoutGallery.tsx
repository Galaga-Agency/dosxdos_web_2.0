import React, { useRef } from "react";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import "./VisualLayoutGallery.scss";

interface VisualLayoutGalleryProps {
  coverImage: string | null;
  portfolioThumbnail: string | null;
  galleryImages: string[];
  floatingImages: string[];
  onCoverImageChange: (image: string | null) => void;
  onPortfolioThumbnailChange: (image: string | null) => void;
  onGalleryImagesChange: (images: string[]) => void;
  onFloatingImagesChange: (images: string[]) => void;
  projectId: string;
  disabled?: boolean;
}

const VisualLayoutGallery: React.FC<VisualLayoutGalleryProps> = ({
  coverImage,
  portfolioThumbnail,
  galleryImages,
  floatingImages,
  onCoverImageChange,
  onPortfolioThumbnailChange,
  onGalleryImagesChange,
  onFloatingImagesChange,
  projectId,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentSlotRef = useRef<{ type: 'cover' | 'thumbnail' | 'gallery' | 'floating', index?: number } | null>(null);

  const safeGalleryImages = Array.isArray(galleryImages) ? galleryImages : [];
  const safeFloatingImages = Array.isArray(floatingImages) ? floatingImages : [];

  // Ensure we have arrays of the right size - use empty strings for missing slots
  const gallerySlots = Array(8).fill('').map((_, i) => safeGalleryImages[i] || '');
  const floatingSlots = Array(3).fill('').map((_, i) => safeFloatingImages[i] || '');

  const handleSlotClick = (type: 'cover' | 'thumbnail' | 'gallery' | 'floating', index?: number) => {
    if (disabled) return;
    currentSlotRef.current = { type, index };
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !currentSlotRef.current) return;

    const file = files[0];
    const { type, index } = currentSlotRef.current;

    try {
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

      if (type === 'cover') {
        onCoverImageChange(url);
      } else if (type === 'thumbnail') {
        onPortfolioThumbnailChange(url);
      } else if (type === 'gallery' && index !== undefined) {
        const newGalleryImages = [...safeGalleryImages];
        // Extend array if needed
        while (newGalleryImages.length <= index) {
          newGalleryImages.push('');
        }
        newGalleryImages[index] = url;
        onGalleryImagesChange(newGalleryImages);
      } else if (type === 'floating' && index !== undefined) {
        const newFloatingImages = [...safeFloatingImages];
        while (newFloatingImages.length <= index) {
          newFloatingImages.push('');
        }
        newFloatingImages[index] = url;
        onFloatingImagesChange(newFloatingImages);
      }
    } catch (err) {
      console.error("Failed to upload image:", err);
      alert("No se pudo subir la imagen");
    }
  };

  const handleRemoveImage = (type: 'gallery' | 'floating', index: number) => {
    if (type === 'gallery') {
      // Create a copy and remove the specific index
      const newImages = [...safeGalleryImages];
      newImages.splice(index, 1);
      onGalleryImagesChange(newImages);
    } else {
      const newImages = [...safeFloatingImages];
      newImages.splice(index, 1);
      onFloatingImagesChange(newImages);
    }
  };

  const ImageSlot = ({ 
    image, 
    onClick, 
    onRemove, 
    label, 
    slotType
  }: { 
    image: string; 
    onClick: () => void; 
    onRemove?: () => void;
    label: string;
    slotType: string;
  }) => {
    const hasImage = image && image.length > 0;
    
    return (
      <div className={`image-slot image-slot--${slotType}`} onClick={onClick}>
        {hasImage ? (
          <>
            <img src={image} alt={label} className="image-slot__image" />
            {onRemove && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="image-slot__delete-btn"
                disabled={disabled}
              >
                <Trash2 size={12} />
              </button>
            )}
            <div className="image-slot__label">
              {label}
            </div>
          </>
        ) : (
          <div className="image-slot__placeholder">
            <Plus size={16} />
            <span>{label}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="visual-layout-gallery">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileUpload}
        disabled={disabled}
      />

      {/* Hero Images Section */}
      <div className="form-group">
        <label className="form-label">Imágenes Principales</label> 
        <div className="layout-section">
          <p className="layout-section__description">
            Imagen de portada para la página del proyecto y miniatura para el grid del portfolio
          </p>
          
          <div className="hero-images">
            <div className="hero-image-slot">
              <p className="hero-image-slot__title">IMAGEN DE PORTADA</p>
              <p className="hero-image-slot__subtitle">Se ve en la página del proyecto</p>
              <ImageSlot
                image={coverImage || ''}
                onClick={() => handleSlotClick('cover')}
                onRemove={() => onCoverImageChange(null)}
                label="Portada"
                slotType="hero-cover"
              />
            </div>
            
            <div className="hero-image-slot">
              <p className="hero-image-slot__title">MINIATURA PORTFOLIO</p>
              <p className="hero-image-slot__subtitle">Se ve en el grid de proyectos</p>
              <ImageSlot
                image={portfolioThumbnail || ''}
                onClick={() => handleSlotClick('thumbnail')}
                onRemove={() => onPortfolioThumbnailChange(null)}
                label="Miniatura"
                slotType="hero-thumbnail"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Gallery Section */}
      <div className="form-group">
        <label className="form-label">Galería Carousel - Diseño Visual</label>
        <div className="layout-section">
          <p className="layout-section__description">
            Haz clic en cada casilla para subir una imagen específica para esa posición
          </p>
          
          {/* First Row */}
          <div className="carousel-row">
            <p className="carousel-row__title">FILA SUPERIOR (4 imágenes)</p>
            <div className="carousel-row__slots">
              <ImageSlot
                image={gallerySlots[0]}
                onClick={() => handleSlotClick('gallery', 0)}
                onRemove={() => handleRemoveImage('gallery', 0)}
                label="Pos 1"
                slotType="carousel-1"
              />
              <ImageSlot
                image={gallerySlots[1]}
                onClick={() => handleSlotClick('gallery', 1)}
                onRemove={() => handleRemoveImage('gallery', 1)}
                label="Pos 2"
                slotType="carousel-2"
              />
              <ImageSlot
                image={gallerySlots[2]}
                onClick={() => handleSlotClick('gallery', 2)}
                onRemove={() => handleRemoveImage('gallery', 2)}
                label="Pos 3"
                slotType="carousel-3"
              />
              <ImageSlot
                image={gallerySlots[3]}
                onClick={() => handleSlotClick('gallery', 3)}
                onRemove={() => handleRemoveImage('gallery', 3)}
                label="Pos 4"
                slotType="carousel-4"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="carousel-row">
            <p className="carousel-row__title">FILA INFERIOR (4 imágenes)</p>
            <div className="carousel-row__slots">
              <ImageSlot
                image={gallerySlots[4]}
                onClick={() => handleSlotClick('gallery', 4)}
                onRemove={() => handleRemoveImage('gallery', 4)}
                label="Pos 5"
                slotType="carousel-5"
              />
              <ImageSlot
                image={gallerySlots[5]}
                onClick={() => handleSlotClick('gallery', 5)}
                onRemove={() => handleRemoveImage('gallery', 5)}
                label="Pos 6"
                slotType="carousel-6"
              />
              <ImageSlot
                image={gallerySlots[6]}
                onClick={() => handleSlotClick('gallery', 6)}
                onRemove={() => handleRemoveImage('gallery', 6)}
                label="Pos 7"
                slotType="carousel-7"
              />
              <ImageSlot
                image={gallerySlots[7]}
                onClick={() => handleSlotClick('gallery', 7)}
                onRemove={() => handleRemoveImage('gallery', 7)}
                label="Pos 8"
                slotType="carousel-8"
              />
            </div>
          </div>

          <div className="layout-section__counter">
            {safeGalleryImages.length}/8 imágenes subidas para carousel
          </div>
        </div>
      </div>

      {/* Floating Images Section */}
      <div className="form-group">
        <label className="form-label">Sección Flotante - Diseño Visual</label>
        <div className="layout-section">
          <p className="layout-section__description">
            La primera imagen será grande, las otras dos flotarán a los lados
          </p>
          
          <div className="floating-layout">
            {/* Large Image */}
            <div className="floating-main">
              <p className="floating-main__title">IMAGEN PRINCIPAL</p>
              <ImageSlot
                image={floatingSlots[0]}
                onClick={() => handleSlotClick('floating', 0)}
                onRemove={() => handleRemoveImage('floating', 0)}
                label="Principal"
                slotType="floating-main"
              />
            </div>

            {/* Small Floating Images */}
            <div className="floating-secondary">
              <p className="floating-secondary__title">IMÁGENES FLOTANTES</p>
              <div className="floating-secondary__slots">
                <ImageSlot
                  image={floatingSlots[1]}
                  onClick={() => handleSlotClick('floating', 1)}
                  onRemove={() => handleRemoveImage('floating', 1)}
                  label="Flotante 1"
                  slotType="floating-1"
                />
                <ImageSlot
                  image={floatingSlots[2]}
                  onClick={() => handleSlotClick('floating', 2)}
                  onRemove={() => handleRemoveImage('floating', 2)}
                  label="Flotante 2"
                  slotType="floating-2"
                />
              </div>
            </div>
          </div>

          <div className="layout-section__counter">
            {safeFloatingImages.length}/3 imágenes subidas para sección flotante
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h4 className="instructions__title">Instrucciones:</h4>
        <ul className="instructions__list">
          <li>Haz clic en cualquier casilla vacía (+) para subir una imagen para esa posición específica</li>
          <li>Pasa el cursor sobre las imágenes para ver las opciones de eliminar</li>
          <li>Las imágenes aparecerán exactamente en el orden que las coloques aquí</li>
          <li>Puedes reemplazar cualquier imagen haciendo clic sobre ella</li>
        </ul>
      </div>
    </div>
  );
};

export default VisualLayoutGallery;