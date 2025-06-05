"use client";

import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import "./AdminBadge.scss";
import TransitionLink from "../Link";

interface AdminBadgeProps {
  className?: string;
}

const AdminBadge: React.FC<AdminBadgeProps> = ({ className = "" }) => {
  return (
    <Link
      href="/admin"
      className={`admin-badge admin-badge--icon ${className}`}
      aria-label="Admin Panel"
    >
      <Shield size={20} />
    </Link>
  );
};

export default AdminBadge;
