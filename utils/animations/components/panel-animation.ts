import { gsap } from "gsap";
import $ from "jquery";
import { ScrollTrigger } from "@/plugins";

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
    // Query the panels after media match to ensure DOM is ready
    let projectPanels = gsap.utils.toArray(".project-panel");

    if (projectPanels.length === 0) {
      console.warn("No project panels found");
      return;
    }

    // Create a new timeline for each execution to prevent conflicts
    let tl = gsap.timeline();

    // Get the project panel area for endTrigger
    const projectPanelArea = document.querySelector(".project-panel-area");
    if (!projectPanelArea) {
      console.warn("Project panel area not found");
      return;
    }

    // Force a small delay to ensure layout is complete
    gsap.delayedCall(0.1, () => {
      // Set up each panel individually
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
            onLeaveBack: () => console.log(`Panel ${index + 1} left backwards`),
            onRefresh: (self: any) => {
              // Ensure pin is properly set up on refresh
              self.pin = true;
            },
          } as any,
        });
      });
    });
  });
}

// Function to clean up all ScrollTrigger instances
function clearScrollTriggers() {
  if (ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger: { kill: () => any; }) => trigger.kill());
  }
}


export { panelAnimation, clearScrollTriggers };