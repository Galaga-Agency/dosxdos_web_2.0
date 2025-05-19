import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

// Function to clean up all ScrollTrigger instances
 function clearScrollTriggers() {
  if (ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger: { kill: () => any }) => trigger.kill());
  }
}

// Panel Animation function
 function panelAnimation() {
  // Clean up existing ScrollTrigger instances related to panels to prevent glitches
  ScrollTrigger.getAll().forEach((trigger: any) => {
    if (
      trigger.vars &&
      trigger.vars.trigger &&
      (trigger.vars.trigger.classList.contains("project-panel") ||
        trigger.vars.trigger.classList.contains("project-panel-area"))
    ) {
      trigger.kill();
    }
  });

  // Use matchMedia for responsive behavior
  let pr = gsap.matchMedia();

  pr.add("(min-width: 768px)", () => {
    // Force a small delay to ensure DOM is fully ready
    gsap.delayedCall(0.5, () => {
      // Query the panels after delay to ensure DOM is ready
      let projectPanels = gsap.utils.toArray(".project-panel");

      if (projectPanels.length === 0) {
        console.warn("No project panels found");
        return;
      }

      console.log(`Found ${projectPanels.length} project panels`);
      projectPanels.forEach((panel, i) => console.log(`Panel ${i + 1} found:`, panel));

      // Create a new timeline for each execution to prevent conflicts
      let tl = gsap.timeline();

      // Get the project panel area for endTrigger
      const projectPanelArea = document.querySelector(".project-panel-area");
      if (!projectPanelArea) {
        console.warn("Project panel area not found");
        return;
      }

      // Set up each panel individually with extra logging
      projectPanels.forEach((panel: any, index) => {
        // Set explicit height to ensure consistency
        gsap.set(panel, { height: "100vh" });

        // Create animation for each panel
        tl.to(panel, {
          scrollTrigger: {
            id: `panel-trigger-${index}`,
            trigger: panel,
            pin: true,
            scrub: 1,
            start: "top top",
            end: "bottom 100%",
            endTrigger: projectPanelArea,
            pinSpacing: false,
            markers: false,
            onEnter: () => console.log(`Panel ${index + 1} entered`),
            onLeave: () => console.log(`Panel ${index + 1} left`),
            onEnterBack: () => console.log(`Panel ${index + 1} entered back`),
            onLeaveBack: () => console.log(`Panel ${index + 1} left backwards`),
            onRefresh: (self: any) => {
              // Ensure pin is properly set up on refresh
              self.pin = true;
              console.log(`Panel ${index + 1} refreshed`);
            },
          } as any,
        });
      });
    });
  });
}

export { panelAnimation, clearScrollTriggers };