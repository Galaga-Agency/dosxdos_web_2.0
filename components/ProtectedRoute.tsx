"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/ui/Loading/Loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const redirectTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeout
    if (redirectTimeout.current) {
      clearTimeout(redirectTimeout.current);
    }

    if (status === "unauthenticated") {
      // Force immediate redirect without waiting
      redirectTimeout.current = setTimeout(() => {
        window.location.replace("/login");
      }, 0);
    }

    return () => {
      if (redirectTimeout.current) {
        clearTimeout(redirectTimeout.current);
      }
    };
  }, [status]);

  // Immediate redirect for unauthenticated
  if (status === "unauthenticated") {
    // Don't even show loading, just redirect
    if (typeof window !== 'undefined') {
      window.location.replace("/login");
    }
    return null;
  }

  // Show loading only while checking session
  if (status === "loading") {
    return (
      <div className="protected-route-loader">
        <Loading />
      </div>
    );
  }

  // Only render children when authenticated
  if (status === "authenticated") {
    return <>{children}</>;
  }

  // Fallback - should not reach here
  return null;
};

export default ProtectedRoute;