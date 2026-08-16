import { motion, useTransform, type MotionValue } from "framer-motion";

interface HeroBackgroundProps {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  prefersReducedMotion: boolean | null;
}

// Deterministic (not Math.random) so positions are stable across renders.
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  top: 6 + ((i * 37) % 90),
  left: 3 + ((i * 53) % 94),
  size: 3 + (i % 3) * 1.4,
  duration: 5 + (i % 4) * 1.3,
  delay: i * 0.3,
}));

function FlowLine({ d, gradientId }: { d: string; gradientId: string }) {
  return (
    <motion.path
      d={d}
      stroke={`url(#${gradientId})`}
      strokeWidth={1.5}
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.22 }}
      transition={{ duration: 1.8, ease: [0.22, 0.8, 0.28, 1] }}
    />
  );
}

/**
 * Layered, parallax-reactive decoration behind the hero's floating image
 * screen: soft glow blobs (slowest), flowing gradient lines + rings (mid),
 * a handful of drifting particles (fastest) — each layer moves at a
 * different fraction of the cursor offset so the scene reads as real depth
 * rather than one flat plane. Entirely decorative: aria-hidden, no pointer
 * events, and every continuous loop is skipped under reduced-motion.
 */
export function HeroBackground({ parallaxX, parallaxY, prefersReducedMotion }: HeroBackgroundProps) {
  const farX = useTransform(parallaxX, (v) => v * 26);
  const farY = useTransform(parallaxY, (v) => v * 18);
  const nearX = useTransform(parallaxX, (v) => v * 60);
  const nearY = useTransform(parallaxY, (v) => v * 42);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div className="absolute inset-0" style={{ x: farX, y: farY }}>
        <div className="absolute right-[6%] top-[8%] h-72 w-72 rounded-full bg-brand-400/18 blur-[90px]" />
        <div className="absolute bottom-[4%] right-[24%] hidden h-64 w-64 rounded-full bg-gold-400/14 blur-[80px] sm:block" />
      </motion.div>

      {/* Fixed in place: no parallax drift and no traveling-dash animation,
          just a one-time draw-in so the lines read as a static backdrop. */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 700" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="heroFlowA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e98d87" stopOpacity="0" />
            <stop offset="50%" stopColor="#e98d87" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#789b84" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroFlowB" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#789b84" stopOpacity="0" />
            <stop offset="50%" stopColor="#9db8a8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e8d6b5" stopOpacity="0" />
          </linearGradient>
        </defs>
        <FlowLine d="M 40 560 C 220 460, 300 640, 480 520 C 620 430, 660 260, 860 210" gradientId="heroFlowA" />
        <FlowLine d="M 900 160 C 700 220, 660 60, 480 110 C 320 155, 260 340, 60 380" gradientId="heroFlowB" />
        <circle cx="700" cy="180" r="120" stroke="#e8d6b5" strokeOpacity="0.18" strokeWidth="1" fill="none" />
        <circle
          cx="620"
          cy="520"
          r="70"
          stroke="#789b84"
          strokeOpacity="0.16"
          strokeWidth="1"
          fill="none"
          className="hidden sm:block"
        />
      </svg>

      {!prefersReducedMotion && (
        <motion.div className="absolute inset-0" style={{ x: nearX, y: nearY }}>
          {PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              className={`absolute rounded-full bg-gold-400/70 ${p.id >= 6 ? "hidden sm:block" : ""}`}
              style={{ top: `${p.top}%`, left: `${p.left}%`, width: p.size, height: p.size }}
              animate={{ opacity: [0, 0.9, 0], y: [0, -18, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
