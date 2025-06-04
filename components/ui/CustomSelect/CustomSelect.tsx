"use client";

import React, { SelectHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import "./CustomSelect.scss";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: FieldError;
  options: Option[];
  placeholder?: string;
  isLoading?: boolean;
  selectRef?: React.Ref<HTMLSelectElement>;
}

const CustomSelect = ({
  label,
  error,
  options,
  placeholder = "Selecciona una opción",
  isLoading,
  className = "",
  selectRef,
  ...props
}: CustomSelectProps) => {
  return (
    <div className="form-select">
      <label>{label}</label>
      <select
        ref={selectRef}
        className={`${error ? "error" : ""} ${className}`}
        disabled={isLoading}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="error-feedback">{error.message}</p>}
    </div>
  );
};

export default CustomSelect;
