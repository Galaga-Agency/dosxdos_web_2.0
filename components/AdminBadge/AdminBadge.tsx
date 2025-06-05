"use client";

import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import "./AdminBadge.scss";
import TransitionLink from "../TransitionLink";

interface AdminBadgeProps {
  className?: string;
}

const AdminBadge: React.FC<AdminBadgeProps> = ({ className = "" }) => {
  return (
    <TransitionLink
      href="/admin"
      className={`admin-badge admin-badge--icon ${className}`}
      aria-label="Admin Panel"
    >
      <Shield size={20} />
    </TransitionLink>
  );
};

export default AdminBadge;
