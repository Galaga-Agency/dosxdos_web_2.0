"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { templatePageAnimation } from "@/utils/animations/page-transition-anim";

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const overlayRef: any = useRef<HTMLDivElement>(null);
  const logoRef: any = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const cleanup = templatePageAnimation(overlayRef, logoRef);

    return cleanup;
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#fff",
          zIndex: 99,
          pointerEvents: "none",
        }}
      >
        <div
          ref={logoRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0,
          }}
        >
          <Image
            src="/assets/img/logo/logo_full_gris.svg"
            alt="Logo"
            width={580}
            height={580}
          />
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </>
  );
}