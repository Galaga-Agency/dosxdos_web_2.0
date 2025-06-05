"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FieldError } from "react-hook-form";
import "./CustomSelect.scss";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  error?: FieldError;
  options: Option[];
  placeholder?: string;
  isLoading?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
}

const CustomSelect = ({
  label,
  error,
  options,
  placeholder = "Selecciona una opción",
  isLoading,
  value = "",
  onChange,
  onBlur,
  name,
  disabled = false,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Find the selected option label
  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Calculate dropdown position when opening
  const updateDropdownPosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onBlur?.();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      updateDropdownPosition();
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onBlur]);

  // Update internal state when value prop changes
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleOptionClick = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
    onBlur?.();
  };

  const handleToggle = () => {
    if (!disabled && !isLoading) {
      if (!isOpen) {
        updateDropdownPosition();
      }
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    } else if (event.key === "Escape") {
      setIsOpen(false);
      onBlur?.();
    }
  };

  return (
    <>
      <div className="form-select">
        <label>{label}</label>

        {/* Hidden input for form compatibility */}
        <input type="hidden" name={name} value={selectedValue} />

        {/* Custom dropdown trigger */}
        <div
          ref={triggerRef}
          className={`select-trigger ${error ? "error" : ""} ${
            isOpen ? "open" : ""
          } ${disabled ? "disabled" : ""}`}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span
            className={`select-value ${!selectedValue ? "placeholder" : ""}`}
          >
            {displayText}
          </span>
          <span className="select-chevron">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </span>
        </div>

        {error && <p className="error-feedback">{error.message}</p>}
      </div>

      {/* Portal dropdown to body - this escapes all z-index contexts */}
      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            ref={dropdownRef}
            className="select-dropdown-portal"
            style={{
              position: "absolute",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              zIndex: 999999,
            }}
            role="listbox"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`select-option ${
                  selectedValue === option.value ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option.value)}
                role="option"
                aria-selected={selectedValue === option.value}
              >
                {option.label}
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default CustomSelect;
