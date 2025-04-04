"use client";

import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import "./CustomInput.scss";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  placeholder?: string;
  isLoading?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

const CustomInput = ({
  label,
  error,
  isLoading,
  placeholder,
  className = "",
  inputRef,
  ...props
}: CustomInputProps) => {
  return (
    <div className="form-input">
      <label>{label}</label>
      <input
        ref={inputRef}
        className={`${error ? "error" : ""} ${className}`}
        disabled={isLoading}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className="error-feedback">{error.message}</p>}
    </div>
  );
};

export default CustomInput;
