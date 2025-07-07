"use client";

import { useInstantLoading } from "@/hooks/useInstantLoading";
import Loading from "@/components/ui/Loading/Loading";

const InstantLoadingOverlay = () => {
  const isLoading = useInstantLoading();

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 499,
        pointerEvents: "none",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading />
    </div>
  );
};

export default InstantLoadingOverlay;