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
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only redirect once and only when definitely unauthenticated
    if (status === "unauthenticated" && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace("/login");
    }
  }, [status, router]);

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="protected-route-loader">
        <Loading />
      </div>
    );
  }

  // Show loading while redirecting
  if (status === "unauthenticated") {
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

  // Fallback
  return (
    <div className="protected-route-loader">
      <Loading />
    </div>
  );
};

export default ProtectedRoute;