import gsap from "gsap";

export const createPageTransitionAnimation = (
  containerRef: React.RefObject<HTMLDivElement>,
  newChildren: React.ReactNode,
  onUpdateChildren: (children: React.ReactNode) => void,
  onSetContentVisible: (visible: boolean) => void,
  onComplete: () => void
) => {
  if (!containerRef.current) return;

  // Create a persistent cover layer
  const coverLayer = document.createElement("div");
  coverLayer.className = "page-transition__cover-layer";
  document.body.appendChild(coverLayer);

  // Create a separate container for the logo to ensure it's positioned correctly
  const logoContainer = document.createElement("div");
  logoContainer.className = "page-transition__logo-container";
  document.body.appendChild(logoContainer);

  // Create decorative elements
  const decorCornerTL = document.createElement("div");
  const decorCornerTR = document.createElement("div");
  const decorCornerBL = document.createElement("div");
  const decorCornerBR = document.createElement("div");
  const decorCircle = document.createElement("div");
  const decorSquare = document.createElement("div");
  const decorLine = document.createElement("div");
  const decorDots = document.createElement("div");

  decorCornerTL.className =
    "page-transition__decor-corner page-transition__decor-corner--tl";
  decorCornerTR.className =
    "page-transition__decor-corner page-transition__decor-corner--tr";
  decorCornerBL.className =
    "page-transition__decor-corner page-transition__decor-corner--bl";
  decorCornerBR.className =
    "page-transition__decor-corner page-transition__decor-corner--br";
  decorCircle.className = "page-transition__decor-circle";
  decorSquare.className = "page-transition__decor-square";
  decorLine.className = "page-transition__decor-line";
  decorDots.className = "page-transition__decor-dots";

  logoContainer.appendChild(decorCornerTL);
  logoContainer.appendChild(decorCornerTR);
  logoContainer.appendChild(decorCornerBL);
  logoContainer.appendChild(decorCornerBR);
  logoContainer.appendChild(decorCircle);
  logoContainer.appendChild(decorSquare);
  logoContainer.appendChild(decorLine);
  logoContainer.appendChild(decorDots);

  // Initially hide all decorative elements
  const decorativeElements = [
    decorCornerTL,
    decorCornerTR,
    decorCornerBL,
    decorCornerBR,
    decorCircle,
    decorSquare,
    decorLine,
    decorDots,
  ];

  decorativeElements.forEach((el) => {
    gsap.set(el, { opacity: 0, scale: 0.8 });
  });

  // Initial fade in the cover
  gsap.fromTo(
    coverLayer,
    { opacity: 0 },
    { opacity: 1, duration: 0.2, onComplete: startMainAnimation }
  );

  function startMainAnimation() {
    // Check if container still exists
    if (!containerRef.current) return;

    // Now create the animation layer
    containerRef.current.innerHTML = "";

    const glassLayer = document.createElement("div");
    const logo = document.createElement("img");

    glassLayer.className = "page-transition__panel glass-layer";
    logo.className = "page-transition__logo";
    logo.src = "/assets/img/logo/logo_fondo_rojo.png";
    logo.alt = "Dos x Dos Logo";

    containerRef.current.appendChild(glassLayer);
    logoContainer.appendChild(logo); // Add logo to the separate container

    const tl = gsap.timeline({
      onComplete: () => {
        // Check if container still exists before clearing
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
        // Remove the cover layer and logo container after everything is done
        if (document.body.contains(coverLayer)) {
          document.body.removeChild(coverLayer);
        }
        if (document.body.contains(logoContainer)) {
          document.body.removeChild(logoContainer);
        }
        onComplete();
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
      borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
    });

    gsap.set(logo, {
      opacity: 0,
      scale: 0.8,
    });

    // We can now hide the cover as our glass layer will take over
    tl.to(coverLayer, { opacity: 0, duration: 0.4 }, 0);

    // Entry animation - smooth single layer slide in
    tl.to(
      glassLayer,
      {
        x: "0%",
        duration: 0.8,
        ease: "power3.out",
      },
      0
    );

    // Logo animation - start slightly before glass layer is fully in
    tl.to(
      logo,
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Animate decorative elements super fast stagger right after logo starts
    tl.to(
      decorativeElements,
      {
        opacity: 0.5,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        stagger: {
          amount: 0.1, // Super fast stagger
          from: "center",
          grid: "auto",
        },
      },
      "-=0.45" // Start just slightly after logo begins
    );

    // Update the children after the glass layer is in place
    tl.call(() => {
      onUpdateChildren(newChildren);
    });

    // Before exit animations, fade in the cover again
    tl.to(coverLayer, { opacity: 1, duration: 0.3 });

    // Now we can safely make the content visible since it's behind the cover
    tl.call(() => {
      onSetContentVisible(true);
    });

    // Logo and decorative elements exit animation - super fast synchronized
    tl.to(
      logo,
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.inOut",
      },
      "-=0.1"
    );

    // Decorative elements exit with fast stagger
    tl.to(
      decorativeElements,
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.inOut",
        stagger: {
          amount: 0.05, // Very fast stagger
          from: "edges",
          grid: "auto",
        },
      },
      "<" // Start at the same time as logo
    );

    // Smooth exit animation for the glass layer
    tl.to(
      glassLayer,
      {
        x: "-100%",
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.3"
    );

    // Finally fade out the cover to reveal the new content
    tl.to(coverLayer, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut",
    });
  }
};
