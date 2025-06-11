// ImageLayoutModal.tsx
import React, { useState, useRef } from "react";
import "./ImageLayoutModal.scss";

interface ImageLayoutModalProps {
  onClose: () => void;
  onDualImageUpload: (leftFile: File, rightFile: File) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

export default function ImageLayoutModal({
  onClose,
  onDualImageUpload,
  onImageUpload,
}: ImageLayoutModalProps) {
  const [leftFile, setLeftFile] = useState<File | null>(null);
  const [rightFile, setRightFile] = useState<File | null>(null);
  const [leftPreview, setLeftPreview] = useState<string>("");
  const [rightPreview, setRightPreview] = useState<string>("");
  const leftInputRef = useRef<HTMLInputElement>(null);
  const rightInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="image-layout-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Upload Two Images</h3>
            <button className="close-btn" onClick={onClose} type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="modal-body">
            <p className="modal-description">
              Select two images to display side by side in your content.
            </p>

            <div className="dual-upload-container">
              {/* Left Image Upload */}
              <div className="image-upload-section">
                <h4>Left Image</h4>
                <div className="upload-area">
                  {leftPreview ? (
                    <div className="image-preview">
                      <img src={leftPreview} alt="Left preview" />
                      <button
                        className="remove-image"
                        onClick={() => handleRemoveImage("left")}
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div
                      className="upload-placeholder"
                      onClick={() => leftInputRef.current?.click()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="48"
                        height="48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
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
                      <p>Click to upload left image</p>
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
                <h4>Right Image</h4>
                <div className="upload-area">
                  {rightPreview ? (
                    <div className="image-preview">
                      <img src={rightPreview} alt="Right preview" />
                      <button
                        className="remove-image"
                        onClick={() => handleRemoveImage("right")}
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div
                      className="upload-placeholder"
                      onClick={() => rightInputRef.current?.click()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="48"
                        height="48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
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
                      <p>Click to upload right image</p>
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
            <button className="cancel-btn" onClick={onClose} type="button">
              Cancel
            </button>
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={!leftFile || !rightFile}
              type="button"
            >
              Insert Images
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
