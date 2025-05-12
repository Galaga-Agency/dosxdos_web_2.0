"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, AlertTriangle } from "lucide-react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  size?: "small" | "medium" | "large";
  showFooter?: boolean;
  icon?: React.ReactNode;
  centered?: boolean;
  variant?: "default" | "danger";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  size = "medium",
  showFooter = true,
  icon,
  centered = false,
  variant = "default",
}) => {
  // Extremely minimal approach to handle scroll blocking
  useEffect(() => {
    if (!isOpen) return;

    // Create a class for the body to disable scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Cleanup function
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  // Use default icon if not provided and variant is danger
  const modalIcon = icon || (variant === "danger" ? <AlertTriangle /> : null);

  // Use portal to render outside of scroll container
  return createPortal(
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div
        className={`modal__content modal__content--${size} modal__content--${variant}`}
      >
        <div className="modal__header">
          {modalIcon && <div className="modal__icon">{modalIcon}</div>}
          <h3 className="modal__title">{title}</h3>
          <button className="modal__close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div
          className={`modal__body ${centered ? "modal__body--centered" : ""}`}
        >
          {children}
        </div>

        {showFooter && (
          <div className="modal__footer">
            <button className="modal__cancel-btn" onClick={onClose}>
              {cancelText}
            </button>
            {onConfirm && (
              <button
                className={`modal__confirm-btn modal__confirm-btn--${variant}`}
                onClick={handleConfirm}
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
