"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import "./LogoutButton.scss";

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ className = "" }) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <button
      onClick={handleLogout}
      className={`logout-button ${className}`}
      aria-label="Cerrar sesión"
    >
      <LogOut size={16} />
      <span>Cerrar sesión</span>
    </button>
  );
};

export default LogoutButton;
