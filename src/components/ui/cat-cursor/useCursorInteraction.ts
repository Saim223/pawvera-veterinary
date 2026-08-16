import { useEffect, useRef, useState } from "react";

export type CursorState = "default" | "button" | "form" | "draggable" | "dragging";

// Detected once, walked with .closest() on each pointerover — no per-element
// listeners, so adding a new button/card anywhere in the app "just works."
const BUTTON_SELECTOR = "a, button, [role='button'], input[type='submit'], input[type='button'], summary, label[for]";
const FORM_SELECTOR = "input:not([type='submit']):not([type='button']), select, textarea";
const DRAGGABLE_SELECTOR = ".cursor-grab, [data-cursor='drag'], [draggable='true']";

interface CursorInteraction {
  state: CursorState;
  clickSignal: number;
}

function classify(target: Element | null): CursorState {
  if (!target) return "default";
  // Order matters: a form control inside a draggable card is still a form
  // control first — you're interacting with the field, not the card.
  if (target.closest(FORM_SELECTOR)) return "form";
  if (target.closest(BUTTON_SELECTOR)) return "button";
  if (target.closest(DRAGGABLE_SELECTOR)) return "draggable";
  return "default";
}

/**
 * Delegated pointer-event state machine behind the cursor. A single set of
 * document/window listeners classifies whatever's under the pointer instead
 * of every button wiring itself up — the "detect intelligently" requirement.
 */
export function useCursorInteraction(enabled: boolean): CursorInteraction {
  const [state, setState] = useState<CursorState>("default");
  const [clickSignal, setClickSignal] = useState(0);
  const draggingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const handleOver = (e: PointerEvent) => {
      if (draggingRef.current) return;
      setState(classify(e.target as Element | null));
    };

    const handleDown = (e: PointerEvent) => {
      const next = classify(e.target as Element | null);
      if (next === "draggable") {
        draggingRef.current = true;
        setState("dragging");
      } else if (next === "button" || next === "form") {
        setClickSignal((c) => c + 1);
      }
    };

    const handleUp = (e: PointerEvent) => {
      if (draggingRef.current) {
        draggingRef.current = false;
        setState(classify(e.target as Element | null));
      }
    };

    const handleWindowBlur = () => {
      draggingRef.current = false;
      setState("default");
    };

    document.addEventListener("pointerover", handleOver, true);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("pointerover", handleOver, true);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [enabled]);

  return { state, clickSignal };
}
