declare module "@/plugins/gsap-scroll-smoother" {
  interface ScrollSmootherInstance {
    kill(): void;
    scrollTop(value: number): void;
    scrollTo(
      target: string | Element | number,
      smooth?: boolean,
      position?: string
    ): void;
    progress(): number;
    paused(value?: boolean): boolean;
  }

  interface ScrollSmootherStatic {
    create(options?: {
      wrapper?: string | Element;
      content?: string | Element;
      smooth?: number | boolean;
      effects?: boolean;
      smoothTouch?: number | boolean;
      normalizeScroll?: boolean;
      [key: string]: any;
    }): ScrollSmootherInstance;

    get(): ScrollSmootherInstance | null;
  }

  const ScrollSmoother: ScrollSmootherStatic;
  export default ScrollSmoother;
}
