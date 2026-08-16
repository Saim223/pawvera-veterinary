import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, type MotionValue } from "framer-motion";

interface CatFaceProps {
  gradId: string;
  className?: string;
  eyeShiftX: MotionValue<number>;
  eyeShiftY: MotionValue<number>;
  /** Only breathe/blink/wiggle-ear while genuinely idle (default state) — a
   * cat mid-interaction shouldn't also be blinking at you. */
  idle: boolean;
  /** Reduced motion: no timers, no loops, just the plain static face. */
  disableIdle: boolean;
}

/**
 * The cat's face artwork plus its "alive" idle behaviors: occasional blink,
 * an occasional ear flick, and a tiny velocity-driven glance. Each idle
 * behavior is a self-contained timer so the orchestrator doesn't need to
 * choreograph them — it only tells this component whether it's allowed to
 * be idle at all right now.
 */
export function CatFace({ gradId, className, eyeShiftX, eyeShiftY, idle, disableIdle }: CatFaceProps) {
  const [blinking, setBlinking] = useState(false);
  const earControls = useAnimationControls();
  const blinkTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wiggleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (disableIdle || !idle) return;

    const scheduleBlink = () => {
      blinkTimeout.current = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 130);
        scheduleBlink();
      }, 2600 + Math.random() * 2600);
    };
    const scheduleWiggle = () => {
      wiggleTimeout.current = setTimeout(() => {
        earControls.start({ rotate: [0, -10, 5, 0] }, { duration: 0.45, ease: "easeInOut" });
        scheduleWiggle();
      }, 4200 + Math.random() * 3400);
    };

    scheduleBlink();
    scheduleWiggle();

    return () => {
      if (blinkTimeout.current) clearTimeout(blinkTimeout.current);
      if (wiggleTimeout.current) clearTimeout(wiggleTimeout.current);
    };
  }, [idle, disableIdle, earControls]);

  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      animate={disableIdle ? undefined : { scale: [1, 1.03, 1] }}
      transition={disableIdle ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <radialGradient id={gradId} cx="35%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#fdf6e8" />
          <stop offset="55%" stopColor="#e8d6b5" />
          <stop offset="100%" stopColor="#a9895a" />
        </radialGradient>
      </defs>

      <motion.path
        d="M8 19 L3 3 Q2.5 -2 8 0.5 L28 14 Z"
        fill={`url(#${gradId})`}
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinejoin="round"
        paintOrder="stroke"
        animate={earControls}
        style={{ transformOrigin: "8px 12px" }}
      />
      <path
        d="M56 19 L61 3 Q61.5 -2 56 0.5 L36 14 Z"
        fill={`url(#${gradId})`}
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinejoin="round"
        paintOrder="stroke"
      />
      <path d="M11 16 L7 5 Q6.7 1.5 11 3.3 L24 13 Z" fill="#c3d6c9" />
      <path d="M53 16 L57 5 Q57.3 1.5 53 3.3 L40 13 Z" fill="#c3d6c9" />

      <rect x="9" y="14" width="46" height="40" rx="19" fill={`url(#${gradId})`} stroke="#ffffff" strokeWidth="3" paintOrder="stroke" />

      <motion.g style={{ x: eyeShiftX, y: eyeShiftY }}>
        {blinking ? (
          <>
            <path d="M19.5 34 Q23.5 37 27.5 34" stroke="#0a1416" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M36.5 34 Q40.5 37 44.5 34" stroke="#0a1416" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="23.5" cy="34" rx="4.3" ry="5.6" fill="#0a1416" />
            <ellipse cx="40.5" cy="34" rx="4.3" ry="5.6" fill="#0a1416" />
            <circle cx="22" cy="31.3" r="1.3" fill="#fff" opacity="0.85" />
            <circle cx="39" cy="31.3" r="1.3" fill="#fff" opacity="0.85" />
          </>
        )}
      </motion.g>

      <path d="M29.5 40 L34.5 40 L32 43.4 Z" fill="#e98d87" />
      <path
        d="M23 44.6 Q27.5 49.5 32 45.6 Q36.5 49.5 41 44.6"
        stroke="#0a1416"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g stroke="#0a1416" strokeWidth="1" strokeLinecap="round" opacity="0.4">
        <path d="M15 38 L4 36" />
        <path d="M15 42 L4 43" />
        <path d="M49 38 L60 36" />
        <path d="M49 42 L60 43" />
      </g>
    </motion.svg>
  );
}
