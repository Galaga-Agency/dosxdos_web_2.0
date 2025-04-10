import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef } from "react";

export function PreventFocusStealingPlugin() {
  const [editor] = useLexicalComposerContext();
  const userClicked = useRef(false);

  useEffect(() => {
    const rootEl = editor.getRootElement();

    if (!rootEl) return;

    // Set to true when user actually clicks the editor
    const handleClick = () => {
      userClicked.current = true;
    };

    // Intercept focus
    const originalFocus = rootEl.focus;
    rootEl.focus = function (...args: any[]) {
      if (!userClicked.current) {
        console.warn("🛑 Blocked editor from auto-focusing");
        return;
      }
      return originalFocus.apply(this, args as any);
    };

    rootEl.addEventListener("mousedown", handleClick);

    return () => {
      rootEl.focus = originalFocus;
      rootEl.removeEventListener("mousedown", handleClick);
    };
  }, [editor]);

  return null;
}
