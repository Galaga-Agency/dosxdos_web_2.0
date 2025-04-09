"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";
import "./PageTransition.scss";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathRef.current && !isTransitioning) {
      runTransition(children);
      prevPathRef.current = pathname;
    }
  }, [pathname, children, isTransitioning]);

  const runTransition = (newChildren: React.ReactNode) => {
    if (!containerRef.current || !contentRef.current) return;

    setIsTransitioning(true);
    setContentVisible(false);
    
    // Create a persistent cover layer
    const coverLayer = document.createElement("div");
    coverLayer.className = "page-transition__cover-layer";
    document.body.appendChild(coverLayer);
    
    // Create a separate container for the logo to ensure it's positioned correctly
    const logoContainer = document.createElement("div");
    logoContainer.className = "page-transition__logo-container";
    document.body.appendChild(logoContainer);
    
    // Initial fade in the cover
    gsap.fromTo(coverLayer, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.2, onComplete: startMainAnimation }
    );
    
    function startMainAnimation() {
      // Now create the animation layer
      containerRef.current!.innerHTML = "";
      
      const glassLayer = document.createElement("div");
      const logo = document.createElement("img");
  
      glassLayer.className = "page-transition__panel glass-layer";
      logo.className = "page-transition__logo";
      logo.src = "/assets/img/logo/logo_fondo_rojo.png";
      logo.alt = "Dos x Dos Logo";
  
      containerRef.current!.appendChild(glassLayer);
      logoContainer.appendChild(logo); // Add logo to the separate container
  
      const tl = gsap.timeline({
        onComplete: () => {
          containerRef.current!.innerHTML = "";
          // Remove the cover layer and logo container after everything is done
          document.body.removeChild(coverLayer);
          document.body.removeChild(logoContainer);
          setIsTransitioning(false);
        },
      });
  
      gsap.set(glassLayer, {
        x: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.3)"
      });
  
      gsap.set(logo, {
        opacity: 0,
        scale: 0.8,
      });
      
      // We can now hide the cover as our glass layer will take over
      tl.to(coverLayer, { opacity: 0, duration: 0.4 }, 0);
  
      // Entry animation - smooth single layer slide in
      tl.to(glassLayer, { 
        x: "0%", 
        duration: 0.8, 
        ease: "power3.out" 
      }, 0);
      
      // Logo animation
      tl.to(logo, { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5, 
        ease: "back.out(1.7)" 
      }, "-=0.3");
  
      // Update the children after the glass layer is in place
      tl.call(() => {
        setDisplayChildren(newChildren);
      });
      
      // Before exit animations, fade in the cover again
      tl.to(coverLayer, { opacity: 1, duration: 0.3 });
      
      // Now we can safely make the content visible since it's behind the cover
      tl.call(() => {
        setContentVisible(true);
      });
  
      // Logo exit animation - start sooner
      tl.to(logo, { 
        opacity: 0, 
        scale: 0.8, 
        duration: 0.3, // Slightly faster exit
        ease: "power2.inOut" 
      }, "-=0.1");
  
      // Smooth exit animation for the glass layer
      tl.to(glassLayer, {
        x: "-100%",
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.3");
      
      // Finally fade out the cover to reveal the new content
      tl.to(coverLayer, { 
        opacity: 0, 
        duration: 0.5,
        ease: "power1.inOut" 
      });
    }
  };

  return (
    <div className="page-transition">
      <div className="page-transition__panels" ref={containerRef}></div>
      <div
        className="page-transition__content"
        ref={contentRef}
        style={{
          opacity: contentVisible ? 1 : 0,
          visibility: contentVisible ? "visible" : "hidden",
          transition: "opacity 0.3s ease"
        }}
      >
        {displayChildren}
      </div>
    </div>
  );
}