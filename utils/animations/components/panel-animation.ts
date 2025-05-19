import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

// Function to clean up all ScrollTrigger instances
function clearScrollTriggers() {
  console.log("[panel-animation] clearScrollTriggers called");
  if (ScrollTrigger) {
    const triggers = ScrollTrigger.getAll();
    console.log(`[panel-animation] Clearing ${triggers.length} ScrollTriggers`);
    ScrollTrigger.getAll().forEach((trigger: { kill: () => any }) => trigger.kill());
  }
}

// Panel Animation function
function panelAnimation() {
  console.log("[panel-animation] panelAnimation function called");
  
  // Log existing triggers
  const existingTriggers = ScrollTrigger.getAll();
  console.log(`[panel-animation] ${existingTriggers.length} existing ScrollTriggers`);
  
  // Clean up existing ScrollTrigger instances related to panels to prevent glitches
  console.log("[panel-animation] Cleaning up existing panel triggers");
  ScrollTrigger.getAll().forEach((trigger: any) => {
    if (
      trigger.vars &&
      trigger.vars.trigger &&
      (trigger.vars.trigger.classList.contains("project-panel") ||
        trigger.vars.trigger.classList.contains("project-panel-area"))
    ) {
      console.log("[panel-animation] Killing panel trigger:", trigger.vars.id || "unnamed");
      trigger.kill();
    }
  });

  // Log smoother state
  if ((window as any).__smoother__) {
    console.log("[panel-animation] Smoother exists, paused state:", (window as any).__smoother__.paused());
  } else {
    console.log("[panel-animation] No smoother found");
  }

  // Use matchMedia for responsive behavior
  let pr = gsap.matchMedia();
  console.log("[panel-animation] Creating matchMedia");

  pr.add("(min-width: 768px)", () => {
    console.log("[panel-animation] matchMedia condition met (min-width: 768px)");
    
    // Force a small delay to ensure DOM is fully ready
    console.log("[panel-animation] Setting up delayed call for panel setup");
    gsap.delayedCall(0.5, () => {
      console.log("[panel-animation] Delayed call executing for panel setup");
      
      // Query the panels after delay to ensure DOM is ready
      let projectPanels = gsap.utils.toArray(".project-panel");
      console.log(`[panel-animation] Found ${projectPanels.length} project panels`);

      if (projectPanels.length === 0) {
        console.warn("[panel-animation] No project panels found");
        return;
      }

      projectPanels.forEach((panel, i) => console.log(`[panel-animation] Panel ${i + 1} found:`, panel));

      // Create a new timeline for each execution to prevent conflicts
      console.log("[panel-animation] Creating new timeline");
      let tl = gsap.timeline();

      // Get the project panel area for endTrigger
      const projectPanelArea = document.querySelector(".project-panel-area");
      console.log("[panel-animation] Project panel area found:", !!projectPanelArea);
      
      if (!projectPanelArea) {
        console.warn("[panel-animation] Project panel area not found");
        return;
      }

      // Check if smoother exists at this point
      console.log("[panel-animation] Smoother before panel setup:", (window as any).__smoother__ ? "exists" : "does not exist");

      // Set up each panel individually with extra logging
      projectPanels.forEach((panel: any, index) => {
        console.log(`[panel-animation] Setting up panel ${index + 1}`);
        
        // Set explicit height to ensure consistency
        gsap.set(panel, { height: "100vh" });
        console.log(`[panel-animation] Set height for panel ${index + 1}`);

        // Create animation for each panel
        console.log(`[panel-animation] Creating ScrollTrigger for panel ${index + 1}`);
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
            onEnter: () => {
              console.log(`[panel-animation] Panel ${index + 1} entered`);
              // Add body class for CSS control
              document.body.classList.add('panel-section-active');
            },
            onLeave: () => {
              console.log(`[panel-animation] Panel ${index + 1} left`);
              // Only remove class when leaving the last panel
              if (index === projectPanels.length - 1) {
                document.body.classList.remove('panel-section-active');
              }
            },
            onEnterBack: () => {
              console.log(`[panel-animation] Panel ${index + 1} entered back`);
              // Add body class for CSS control
              document.body.classList.add('panel-section-active');
            },
            onLeaveBack: () => {
              console.log(`[panel-animation] Panel ${index + 1} left backwards`);
              // Only remove class when leaving the first panel backwards
              if (index === 0) {
                document.body.classList.remove('panel-section-active');
              }
            },
            onRefresh: (self: any) => {
              // Ensure pin is properly set up on refresh
              self.pin = true;
              console.log(`[panel-animation] Panel ${index + 1} refreshed`);
            },
          } as any,
        });
        console.log(`[panel-animation] Successfully created trigger for panel ${index + 1}`);
      });

      console.log("[panel-animation] All panels setup complete");
      
      // Log the active ScrollTriggers after setup
      const finalTriggers = ScrollTrigger.getAll();
      console.log(`[panel-animation] ${finalTriggers.length} ScrollTriggers after panel setup`);
    });
  });

  console.log("[panel-animation] panelAnimation function execution complete");
}

export { panelAnimation, clearScrollTriggers };