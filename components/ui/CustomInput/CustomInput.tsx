"use client";

import React, { InputHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
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
  type,
  ...props
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="form-input">
      <label>{label}</label>
      <div className="input-wrapper">
        <input
          ref={inputRef}
          type={inputType}
          className={`${error ? "error" : ""} ${className}`}
          disabled={isLoading}
          placeholder={placeholder}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            disabled={isLoading}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      {error && <p className="error-feedback">{error.message}</p>}
    </div>
  );
};

export default CustomInput;
