declare module "@/plugins/gsap-split-text" {
    interface SplitTextInstance {
      chars: Element[];
      words: Element[];
      lines: Element[];
      type: string;
      isSplit: boolean;
      revert(): this;
      split(vars?: object): this;
    }
  
    interface SplitTextStatic {
      new(target: string | Element | Element[] | NodeList, vars?: {
        type?: string;
        charsClass?: string;
        wordsClass?: string;
        linesClass?: string;
        position?: string;
        wordsDelimiter?: string;
        lineThreshold?: number;
        [key: string]: any;
      }): SplitTextInstance;
    }
  
    const SplitText: SplitTextStatic;
    export default SplitText;
  }