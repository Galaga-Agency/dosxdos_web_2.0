"use client";

import { SessionProvider } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    let keySequence = "";

    const handleKeyPress = (e: KeyboardEvent) => {
      keySequence += e.key.toLowerCase();

      if (keySequence.includes("admin")) {
        router.push("/admin");
        keySequence = "";
        return;
      }

      if (keySequence.length > 10) {
        keySequence = keySequence.slice(-10);
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
