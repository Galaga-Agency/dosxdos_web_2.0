"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

// This is a client component wrapper for SessionProvider
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
