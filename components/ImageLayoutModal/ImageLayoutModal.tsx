// ImageLayoutModal.tsx
import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import "./ImageLayoutModal.scss";
import PrimaryButton from "../ui/PrimaryButton/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton/SecondaryButton";

interface ImageLayoutModalProps {
  onClose: () => void;
  onDualImageUpload: (leftFile: File, rightFile: File) => void;
  onImageUpload?: (file: File) => Promise<string>;
  onSingleImageUpload?: () => void;
}

export default function ImageLayoutModal({
  onClose,
  onDualImageUpload,
  onImageUpload,
  onSingleImageUpload,
}: ImageLayoutModalProps) {
  const [showChoice, setShowChoice] = useState(true);
  const [leftFile, setLeftFile] = useState<File | null>(null);
  const [rightFile, setRightFile] = useState<File | null>(null);
  const [leftPreview, setLeftPreview] = useState<string>("");
  const [rightPreview, setRightPreview] = useState<string>("");
  const leftInputRef = useRef<HTMLInputElement>(null);
  const rightInputRef = useRef<HTMLInputElement>(null);

  const handleLayoutChoice = (layoutType: "single" | "dual") => {
    if (layoutType === "single") {
      onSingleImageUpload?.();
      onClose();
    } else {
      setShowChoice(false);
    }
  };

  const handleFileChange = (file: File | null, side: "left" | "right") => {
    if (!file) return;

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    if (side === "left") {
      setLeftFile(file);
      setLeftPreview(previewUrl);
    } else {
      setRightFile(file);
      setRightPreview(previewUrl);
    }
  };

  const handleSubmit = () => {
    if (leftFile && rightFile) {
      onDualImageUpload(leftFile, rightFile);
    }
  };

  const handleRemoveImage = (side: "left" | "right") => {
    if (side === "left") {
      setLeftFile(null);
      setLeftPreview("");
      if (leftInputRef.current) leftInputRef.current.value = "";
    } else {
      setRightFile(null);
      setRightPreview("");
      if (rightInputRef.current) rightInputRef.current.value = "";
    }
  };

  return createPortal(
    <div className="image-layout-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {showChoice ? (
            // Choice Modal
            <>
              <div className="modal-header">
                <h2 className="modal-title">Seleccionar tipo de imagen</h2>
                <button className="modal-close" onClick={onClose} type="button">
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <p className="modal-description">
                  Elige cómo quieres mostrar las imágenes en tu contenido.
                </p>

                <div className="layout-options">
                  <button
                    className="layout-option"
                    onClick={() => handleLayoutChoice("single")}
                    type="button"
                  >
                    <div className="layout-preview single-preview"></div>
                    <span>Imagen única</span>
                  </button>
                  <button
                    className="layout-option"
                    onClick={() => handleLayoutChoice("dual")}
                    type="button"
                  >
                    <div className="layout-preview dual-preview">
                      <div className="dual-left"></div>
                      <div className="dual-right"></div>
                    </div>
                    <span>Dos imágenes lado a lado</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Dual Image Upload Modal
            <>
              <div className="modal-header">
                <h2 className="modal-title">Agregar dos imágenes</h2>
                <button className="modal-close" onClick={onClose} type="button">
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <p className="modal-description">
                  Selecciona dos imágenes para mostrar una al lado de la otra.
                </p>

                <div className="dual-upload-container">
                  {/* Left Image Upload */}
                  <div className="image-upload-section">
                    <h4>Imagen izquierda</h4>
                    <div className="upload-area">
                      {leftPreview ? (
                        <div className="image-preview">
                          <img src={leftPreview} alt="Vista previa izquierda" />
                          <button
                            className="remove-image"
                            onClick={() => handleRemoveImage("left")}
                            type="button"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div
                          className="upload-placeholder"
                          onClick={() => leftInputRef.current?.click()}
                        >
                          <div className="upload-icon">📷</div>
                          <p>Haz clic para subir</p>
                        </div>
                      )}
                      <input
                        ref={leftInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileChange(e.target.files?.[0] || null, "left")
                        }
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                  {/* Right Image Upload */}
                  <div className="image-upload-section">
                    <h4>Imagen derecha</h4>
                    <div className="upload-area">
                      {rightPreview ? (
                        <div className="image-preview">
                          <img src={rightPreview} alt="Vista previa derecha" />
                          <button
                            className="remove-image"
                            onClick={() => handleRemoveImage("right")}
                            type="button"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div
                          className="upload-placeholder"
                          onClick={() => rightInputRef.current?.click()}
                        >
                          <div className="upload-icon">📷</div>
                          <p>Haz clic para subir</p>
                        </div>
                      )}
                      <input
                        ref={rightInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileChange(e.target.files?.[0] || null, "right")
                        }
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <SecondaryButton onClick={onClose} type="button" lightBg>
                  Cancelar
                </SecondaryButton>
                <PrimaryButton
                  onClick={handleSubmit}
                  disabled={!leftFile || !rightFile}
                  type="button"
                >
                  Insertar imágenes
                </PrimaryButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
