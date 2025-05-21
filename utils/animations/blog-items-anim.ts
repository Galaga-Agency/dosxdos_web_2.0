import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

export function blogItemsAnimation() {
  if (typeof window === "undefined") return;

  // Blog item hover effects
  const blogItems = document.querySelectorAll(".blog-page__post-item");

  blogItems.forEach((item) => {
    const image = item.querySelector(".blog-item__image-container img");

    if (image) {
      item.addEventListener("mouseenter", () => {
        gsap.to(image, {
          scale: 1.05,
          duration: 0.6,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    }
  });

  // Animate highlight elements in the desktop social CTA
  const desktopSocialCta = document.querySelector(
    ".blog-page__desktop-social-cta"
  );
  if (desktopSocialCta) {
    const highlightElements = desktopSocialCta.querySelectorAll(".highlight");

    if (highlightElements.length > 0) {
      // Set initial state for highlights
      gsap.set(highlightElements, { backgroundSize: "0% 100%" });

      // Animate when the section comes into view
      ScrollTrigger.create({
        trigger: desktopSocialCta,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(highlightElements, {
            backgroundSize: "100% 100%",
            duration: 0.8,
            ease: "power2.out",
          });
        },
      });
    }
  }
}
