import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";

export function BrowserFrame({
  url,
  children,
  tilt = "left",
  className,
}: {
  url: string;
  children: ReactNode;
  tilt?: "left" | "right";
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const rotateY = tilt === "left" ? 5 : -5;

  return (
    <div style={{ perspective: 1600 }} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 40, rotateY: prefersReducedMotion ? 0 : rotateY * 1.6, rotateX: 4 }}
        whileInView={{ opacity: 1, y: 0, rotateY: prefersReducedMotion ? 0 : rotateY, rotateX: 2 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        whileHover={prefersReducedMotion ? undefined : { rotateY: rotateY * 0.4, rotateX: 0.5 }}
        transition={{ duration: 0.9, ease: [0.22, 0.8, 0.28, 1] }}
        className={clsx(
          "overflow-hidden rounded-lg border border-line bg-surface shadow-lg",
          "[transform-style:preserve-3d]",
        )}
      >
        <div className="flex items-center gap-2 border-b border-line bg-paper-alt px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E8635A]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E8B84B]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#5FAE72]" />
          <span className="ml-3 truncate rounded-full bg-surface px-3 py-1 text-[0.7rem] text-ink-faint">{url}</span>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
