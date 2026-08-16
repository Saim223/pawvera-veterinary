import { useRef, type PointerEvent } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { LinkButton } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";
import { HeroImageScreen } from "./HeroImageScreen";
import { HeroActivityFeed } from "./HeroActivityFeed";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Raw pointer position relative to the section, in [-0.5, 0.5]. Consumed by
  // HeroImageScreen (small cursor-tilt) and HeroBackground (layered parallax) —
  // each component decides its own sensitivity from these same two values.
  const relX = useMotionValue(0);
  const relY = useMotionValue(0);
  const springRelX = useSpring(relX, { stiffness: 120, damping: 20, mass: 0.4 });
  const springRelY = useSpring(relY, { stiffness: 120, damping: 20, mass: 0.4 });

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    relX.set((e.clientX - rect.left) / rect.width - 0.5);
    relY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handlePointerLeave = () => {
    relX.set(0);
    relY.set(0);
  };

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-brand-900"
    >
      <HeroBackground parallaxX={springRelX} parallaxY={springRelY} prefersReducedMotion={prefersReducedMotion} />

      <div className="container-page relative z-10 grid gap-12 py-28 sm:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:py-24">
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 0.8, 0.28, 1] }}
            className="text-balance font-display text-[2.4rem] font-medium leading-[1.05] tracking-tight text-paper sm:text-[2.9rem] lg:text-[3.4rem]"
          >
            Better care for
            <br />
            every{" "}
            <span className="relative inline-block">
              <em className="italic text-gold-400">pet</em>
              <motion.svg
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full text-gold-400"
                aria-hidden="true"
              >
                <motion.path
                  d="M2,8 Q25,2 50,6 T98,4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={prefersReducedMotion ? undefined : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 0.8, 0.28, 1] }}
                />
              </motion.svg>
            </span>
            .
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 0.8, 0.28, 1] }}
            className="mt-4 font-display text-lg font-medium text-gold-400 sm:text-xl"
          >
            Where every paw matters.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 0.8, 0.28, 1] }}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <LinkButton href="/doctors" variant="accent" size="lg" icon={<ArrowRight size={17} />}>
              Find a Veterinarian
            </LinkButton>
            <LinkButton href="/appointments" variant="ghost-light" size="lg">
              Book an Appointment
            </LinkButton>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <HeroImageScreen prefersReducedMotion={prefersReducedMotion} relX={springRelX} relY={springRelY} />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 0.8, 0.28, 1] }}
            drag
            dragConstraints={heroRef}
            dragElastic={0.15}
            dragMomentum={false}
            whileDrag={{ scale: 1.04 }}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
            className="glass-dark w-full max-w-[300px] cursor-grab touch-none rounded-xl border border-white/15 p-4 shadow-md active:cursor-grabbing"
          >
            <HeroActivityFeed />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
