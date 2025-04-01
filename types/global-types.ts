declare global {
  interface Window {
    __smoother__?: {
      scrollTop: () => number;
      scrollTo: (position: number, smooth: boolean) => void;
    };
  }
}

export {};
