"use client";

import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { FieldError } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./CustomInput.scss";

interface BaseInputProps {
  label: string;
  error?: FieldError;
  placeholder?: string;
  isLoading?: boolean;
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
}

interface SingleLineInputProps
  extends BaseInputProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "ref"> {
  multiline?: false;
  rows?: never;
}

interface MultiLineInputProps
  extends BaseInputProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "ref"> {
  multiline: true;
  rows?: number;
  type?: never;
}

type CustomInputProps = SingleLineInputProps | MultiLineInputProps;

const CustomInput = ({
  label,
  error,
  isLoading,
  placeholder,
  className = "",
  inputRef,
  multiline,
  rows,
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
        {multiline ? (
          <textarea
            ref={inputRef as React.Ref<HTMLTextAreaElement>}
            className={`${error ? "error" : ""} ${className}`}
            disabled={isLoading}
            placeholder={placeholder}
            rows={rows || 3}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={inputRef as React.Ref<HTMLInputElement>}
            type={inputType}
            className={`${error ? "error" : ""} ${className}`}
            disabled={isLoading}
            placeholder={placeholder}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {isPasswordField && !multiline && (
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
