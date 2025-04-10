import { useEffect } from "react";

export function useStickyInputFocus(inputSelector: string) {
  useEffect(() => {
    let isTyping = false;
    let lastFocused: HTMLElement | null = null;

    const inputEl = document.querySelector(inputSelector) as HTMLElement | null;
    if (!inputEl) return;

    const onFocus = () => {
      isTyping = true;
      lastFocused = inputEl;
    };

    const onBlur = () => {
      // Let it go after 1 second if user leaves
      setTimeout(() => {
        isTyping = false;
        lastFocused = null;
      }, 1000);
    };

    const protectFocus = () => {
      if (isTyping && document.activeElement !== inputEl) {
        inputEl.focus();
      }
    };

    inputEl.addEventListener("focus", onFocus);
    inputEl.addEventListener("blur", onBlur);
    const interval = setInterval(protectFocus, 50);

    return () => {
      inputEl.removeEventListener("focus", onFocus);
      inputEl.removeEventListener("blur", onBlur);
      clearInterval(interval);
    };
  }, [inputSelector]);
}
