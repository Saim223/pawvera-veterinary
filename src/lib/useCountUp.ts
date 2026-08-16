import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function useCountUp<T extends HTMLElement = HTMLElement>(
  target: number,
  options?: { duration?: number; decimals?: number },
) {
  const ref = useRef<T | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  const duration = options?.duration ?? 1600;
  const decimals = options?.decimals ?? 0;

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration, prefersReducedMotion]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-US");

  return { ref, display };
}
