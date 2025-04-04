"use client";

import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import { SessionProvider } from "next-auth/react";

import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SmoothScrollWrapper>
        <div className="admin-layout">{children}</div>
      </SmoothScrollWrapper>
    </SessionProvider>
  );
}
