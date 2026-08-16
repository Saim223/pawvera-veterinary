import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { CatFace } from "./cat-cursor/CatFace";
import { CatPaw } from "./cat-cursor/CatPaw";
import { PawRipple } from "./cat-cursor/PawRipple";
import { useCursorInteraction } from "./cat-cursor/useCursorInteraction";

/**
 * The site's cursor: a small cat that follows the pointer, stays "alive"
 * while idle (blink, breathe, occasional ear flick, a tiny velocity-driven
 * glance), and reacts differently depending on what it's over — a button,
 * a form field, or a draggable card — via useCursorInteraction's delegated
 * state machine. Desktop/fine-pointer only: on touch there's no cursor to
 * replace, and existing whileTap feedback on buttons already covers the
 * equivalent tactile response there. Purely decorative — pointer-events:
 * none throughout — so it never changes what a click/drag/select actually
 * does, only what's drawn on top of it.
 */
export function CatCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const { state, clickSignal } = useCursorInteraction(enabled);
  const [ripples, setRipples] = useState<{ id: number }[]>([]);
  const lastClickSignal = useRef(0);
  const catGradId = useId();
  const pawGradId = useId();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, prefersReducedMotion ? { stiffness: 10000, damping: 1000 } : { stiffness: 700, damping: 42, mass: 0.4 });
  const springY = useSpring(y, prefersReducedMotion ? { stiffness: 10000, damping: 1000 } : { stiffness: 700, damping: 42, mass: 0.4 });

  const velocityX = useVelocity(springX);
  const velocityY = useVelocity(springY);
  const rotateY = useSpring(useTransform(velocityX, [-1800, 1800], [-22, 22]), { stiffness: 200, damping: 24 });
  const rotateX = useSpring(useTransform(velocityY, [-1800, 1800], [22, -22]), { stiffness: 200, damping: 24 });
  const eyeShiftX = useSpring(useTransform(velocityX, [-1800, 1800], [-1.6, 1.6]), { stiffness: 220, damping: 26 });
  const eyeShiftY = useSpring(useTransform(velocityY, [-1800, 1800], [1.6, -1.6]), { stiffness: 220, damping: 26 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("cat-cursor");

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const handleWindowLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("blur", handleWindowLeave);

    return () => {
      document.documentElement.classList.remove("cat-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("blur", handleWindowLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (clickSignal === lastClickSignal.current) return;
    lastClickSignal.current = clickSignal;
    if (prefersReducedMotion) return;
    const id = clickSignal;
    setRipples((prev) => [...prev, { id }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 400);
  }, [clickSignal, prefersReducedMotion]);

  if (!enabled) return null;

  const tiltStyle = prefersReducedMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" as const };

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden" aria-hidden="true">
      <motion.div className="absolute -left-5 -top-5 h-10 w-10" style={{ x: springX, y: springY, perspective: 600 }}>
        <motion.div className="relative h-10 w-10" style={tiltStyle}>
          <AnimatePresence mode="popLayout">
            {state === "default" && (
              <motion.div
                key="default"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.16 }}
                className="absolute inset-0"
              >
                <CatFace
                  gradId={catGradId}
                  className="h-10 w-10 drop-shadow-[0_2px_4px_rgba(14,25,19,0.45)]"
                  eyeShiftX={eyeShiftX}
                  eyeShiftY={eyeShiftY}
                  idle
                  disableIdle={!!prefersReducedMotion}
                />
              </motion.div>
            )}

            {state === "button" && (
              <motion.div
                key="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: prefersReducedMotion ? 10 : [10, 26, 10] }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.15 }
                    : { rotate: { duration: 0.55, repeat: Infinity, ease: "easeInOut" }, default: { duration: 0.18 } }
                }
                className="absolute left-1 top-1 h-7 w-7"
              >
                <CatPaw gradId={pawGradId} className="h-7 w-7 drop-shadow-[0_2px_3px_rgba(14,25,19,0.4)]" />
              </motion.div>
            )}

            {state === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1, rotate: [0, -8, 8, 0] }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.22 }}
                className="absolute left-1 top-1 h-7 w-7"
              >
                <CatPaw gradId={pawGradId} className="h-7 w-7 drop-shadow-[0_2px_3px_rgba(14,25,19,0.4)]" />
              </motion.div>
            )}

            {state === "draggable" && (
              <motion.div
                key="draggable"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0"
              >
                <CatPaw gradId={pawGradId} className="h-8 w-8 drop-shadow-[0_2px_3px_rgba(14,25,19,0.4)]" />
                <motion.div
                  animate={prefersReducedMotion ? undefined : { x: [0, 3, 0, -3, 0] }}
                  transition={prefersReducedMotion ? undefined : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-brand-700 shadow-sm"
                >
                  <MoveHorizontal size={10} strokeWidth={2.4} />
                </motion.div>
              </motion.div>
            )}

            {state === "dragging" && (
              <motion.div
                key="dragging"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1.08, rotate: -4 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.14 }}
                className="absolute -left-1 -top-1 h-9 w-9"
              >
                <CatPaw gradId={pawGradId} className="h-9 w-9 drop-shadow-[0_3px_5px_rgba(14,25,19,0.5)]" />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {ripples.map((r) => (
              <PawRipple key={r.id} size={44} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
