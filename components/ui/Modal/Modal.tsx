"use client";

import React, { useRef, useEffect } from "react";
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
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  size = "medium",
  showFooter = true,
  icon,
  centered = false,
  variant = "default",
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  if (!isOpen) return null;

  // Use default icon if not provided and variant is danger
  const modalIcon = icon || (variant === "danger" ? <AlertTriangle /> : null);

  return (
    <div className="modal">
      <div
        className="modal__overlay"
        style={{
          animation: "fadeIn 0.3s ease forwards",
          opacity: 0,
        }}
        onClick={onClose}
      ></div>
      <div
        ref={contentRef}
        style={{
          animation: "popIn 0.4s ease forwards",
          opacity: 0,
        }}
        className={`modal__content modal__content--${size} modal__content--${variant}`}
      >
        <div className="modal__header">
          {modalIcon && (
            <div
              className="modal__icon"
              style={{
                animation: "popIn 0.6s ease forwards",
                opacity: 0,
              }}
            >
              {modalIcon}
            </div>
          )}
          <h3
            className="modal__title"
            style={{
              animation: "fadeUp 0.6s ease forwards 0.2s",
              opacity: 0,
            }}
          >
            {title}
          </h3>
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
    </div>
  );
};

export default Modal;
