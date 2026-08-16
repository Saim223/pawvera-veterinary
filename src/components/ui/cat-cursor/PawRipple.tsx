import { motion } from "framer-motion";

interface PawRippleProps {
  size: number;
  className?: string;
}

/**
 * A single soft paw-print "stamp" that scales up and fades on click — the
 * click feedback the spec asks for ("small paw-print particles or soft
 * ripple... do not create large particle explosions, keep it elegant").
 * One instance per click, not a particle burst.
 */
export function PawRipple({ size, className }: PawRippleProps) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      style={{ width: size, height: size }}
      initial={{ opacity: 0.6, scale: 0.4 }}
      animate={{ opacity: 0, scale: 1.15 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
    >
      <g fill="#e98d87">
        <path d="M32 58C19 58 13 47 15 38 16.5 31.5 23 27 32 27 41 27 47.5 31.5 49 38 51 47 45 58 32 58Z" />
        <ellipse cx="15" cy="23" rx="5.6" ry="6.6" transform="rotate(-16 15 23)" />
        <ellipse cx="25.5" cy="13.5" rx="6" ry="7" />
        <ellipse cx="38.5" cy="13.5" rx="6" ry="7" />
        <ellipse cx="49" cy="23" rx="5.6" ry="6.6" transform="rotate(16 49 23)" />
      </g>
    </motion.svg>
  );
}
