// Global state for smooth scroll and loading coordination

// Simple global variable to track loading state
let _isLoading = false;
let _smootherInitialized = false;

// The manager object with methods
const LoadingManager = {
  // Getter for current loading state
  get isLoading() {
    return _isLoading;
  },

  // Method to set loading state
  setLoading(value: boolean) {
    _isLoading = value;
    this.updateScrollSmoother();
  },

  // Method to indicate smoother is initialized
  smootherInitialized() {
    _smootherInitialized = true;
    this.updateScrollSmoother();
  },

  // Handle ScrollSmoother state based on loading
  updateScrollSmoother() {
    if (!_smootherInitialized || typeof window === "undefined") return;

    const smoother = (window as any).__smoother__;
    if (!smoother) return;

    if (_isLoading) {
      console.log("Pausing ScrollSmoother due to loading");
      smoother.paused(true);
    } else {
      console.log("Resuming ScrollSmoother after loading");
      setTimeout(() => {
        smoother.paused(false);
      }, 100);
    }
  },
};

export default LoadingManager;
