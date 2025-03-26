import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "../plugins";
import { textInvert } from "../utils/animations/text-invert";
import { useEffect } from "react";

export default function useTextInvert() {
  useEffect(() => {
    textInvert();

    
  }, []);
}