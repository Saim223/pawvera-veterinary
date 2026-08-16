import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export function DoctorConnectorLine() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      ref={ref}
      viewBox="0 0 160 40"
      preserveAspectRatio="none"
      className="hidden h-10 w-full text-gold-500 lg:block"
      aria-hidden="true"
    >
      <motion.path
        d="M0,20 C 40,20 40,6 80,6 S 120,34 160,20"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeDasharray="1 7"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 1.4, ease: [0.22, 0.8, 0.28, 1] }}
      />
    </svg>
  );
}
