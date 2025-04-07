"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import "./CoverImageUpload.scss";

interface CoverImageUploadProps {
  coverImage: string | null;
  coverImageInputRef: React.RefObject<HTMLInputElement>;
  isSubmitting?: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

const CoverImageUpload: React.FC<CoverImageUploadProps> = ({
  coverImage,
  coverImageInputRef,
  isSubmitting = false,
  onImageChange,
  onRemoveImage,
}) => {
  return (
    <div className="cover-image-upload">
      <input
        type="file"
        ref={coverImageInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={onImageChange}
        disabled={isSubmitting}
      />

      <div
        className={`cover-image-preview ${!coverImage ? "empty" : ""}`}
        onClick={() =>
          !isSubmitting && coverImageInputRef.current?.click()
        }
      >
        {coverImage ? (
          <>
            <img src={coverImage} alt="Imagen de portada" />
            <button
              type="button"
              className="cover-image-delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveImage();
              }}
              disabled={isSubmitting}
            >
              <Trash2 size={16} />
            </button>
          </>
        ) : (
          <div className="cover-image-placeholder">
            <div className="cover-image-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p>Haz clic para subir una imagen de portada</p>
            <span className="cover-image-note">
              Si no subes una imagen, se utilizará la primera imagen del
              contenido
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverImageUpload;