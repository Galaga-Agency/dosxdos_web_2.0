"use client";

import React from "react";
import "./CustomCheckbox.scss";

interface CustomCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  className = "",
  id,
  ...props
}) => {
  return (
    <div className={`custom-checkbox ${className}`}>
      <label className="custom-checkbox__container">
        <input type="checkbox" className="custom-checkbox__input" {...props} />
        <span className="custom-checkbox__checkmark"></span>
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
