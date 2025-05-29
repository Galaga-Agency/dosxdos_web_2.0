"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/ui/Loading/Loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Show loading while session is being checked or user is being redirected
  if (status === "loading" || status === "unauthenticated") {
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

  // Fallback (shouldn't reach here, but just in case)
  return (
    <div className="protected-route-loader">
      <Loading />
    </div>
  );
};

export default ProtectedRoute;
