import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export function MiniBarChart({ data }: { data: { day: string; value: number }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div ref={ref} className="flex h-16 items-end gap-1.5">
      {data.map((d, i) => (
        <div key={d.day} className="flex h-full flex-1 items-end">
          <motion.div
            className="w-full rounded-full bg-current"
            initial={{ height: 0 }}
            animate={{ height: isInView ? `${(d.value / max) * 100}%` : 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.3 }
                : { duration: 0.7, delay: i * 0.06, ease: [0.22, 0.8, 0.28, 1] }
            }
          />
        </div>
      ))}
    </div>
  );
}
