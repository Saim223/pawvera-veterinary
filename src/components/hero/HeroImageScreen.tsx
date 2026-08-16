import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SquareCheckBig, Clock3 } from "lucide-react";
import { PetLoveSymbol } from "./PetLoveSymbol";

interface HeroImageScreenProps {
  prefersReducedMotion: boolean | null;
  relX: MotionValue<number>;
  relY: MotionValue<number>;
}

// Regular 7-sided heptagon, point-up, as percentage vertices (works on any
// rectangular box — the aspect ratio just stretches it, same as a hexagon clip).
const HEPTAGON_CLIP =
  "polygon(50% 0%, 89.09% 18.82%, 98.75% 61.12%, 71.69% 95.05%, 28.31% 95.05%, 1.25% 61.12%, 10.91% 18.82%)";

/**
 * The hero's floating "3D screen": a premium display panel showing the pet
 * care/love mark, drifting through space on its own, tilting slightly
 * toward the cursor, and easing back on scroll — each on its own layer so
 * none of the motions fight each other.
 */
export function HeroImageScreen({ prefersReducedMotion, relX, relY }: HeroImageScreenProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.9]);
  const scrollY = useTransform(scrollYProgress, [0, 0.5, 1], [22, 0, -28]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.12, 0.5, 0.88, 1], [0.65, 1, 1, 1, 0.7]);

  const rotY = useTransform(relX, [-0.5, 0.5], [-11, 11]);
  const rotX = useTransform(relY, [-0.5, 0.5], [11, -11]);

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[360px]" style={{ perspective: 1600 }}>
      {/* Entrance: one-time mount animation only. */}
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.86, rotateY: 22, x: 40 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 0.8, 0.28, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Scroll-linked depth: driven continuously by this element's own scroll motion values. */}
        <motion.div style={{ scale: scrollScale, y: scrollY, opacity: scrollOpacity, transformStyle: "preserve-3d" }}>
          {/* Idle drift: slow, organic, multi-axis so it never reads as a robotic bounce —
              a wider roaming range and a touch of rotateX give it real presence in space. */}
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    x: [0, 54, -40, 24, -14, 0],
                    y: [0, -20, 16, -10, 6, 0],
                    rotateZ: [0, 2.2, -1.8, 1, -0.4, 0],
                    rotateX: [0, 4, -3, 1.6, -0.8, 0],
                  }
            }
            transition={prefersReducedMotion ? undefined : { duration: 17, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Cursor tilt: small, spring-eased, disabled with the rest under reduced-motion. */}
            <motion.div
              style={prefersReducedMotion ? undefined : { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              <div className="absolute -inset-6 -z-10 bg-gold-400/20 blur-3xl" style={{ clipPath: HEPTAGON_CLIP }} />

              <div
                className="glass-dark relative aspect-[3/2] overflow-hidden p-2 shadow-lg"
                style={{ clipPath: HEPTAGON_CLIP }}
              >
                <div
                  className="relative flex h-full w-full items-center justify-center overflow-hidden bg-brand-900"
                  style={{ clipPath: HEPTAGON_CLIP }}
                >
                  <PetLoveSymbol size={100} className="h-20 w-20 sm:h-24 sm:w-24" />
                </div>
              </div>

              {/* Outside the bezel's own overflow-hidden, so these can actually
                  float past its edge instead of being clipped by it. */}
              <div className="glass-dark absolute -left-5 top-8 z-10 hidden items-center gap-1.5 rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold text-paper shadow-md sm:flex">
                <SquareCheckBig size={13} className="text-brand-300" />
                Verified vets
              </div>
              <div className="glass-dark absolute -right-4 bottom-10 z-10 hidden items-center gap-1.5 rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold text-paper shadow-md sm:flex">
                <Clock3 size={13} className="text-gold-400" />
                24/7 care
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
