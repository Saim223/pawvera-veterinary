import { motion, useReducedMotion } from "framer-motion";
import { ListChecks } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksSteps } from "@/data/content";

// Each card's resting tilt, as if pinned up by hand rather than machine-placed —
// alternating left/right so the row doesn't read as a mirrored pattern.
const REST_TILT = [-3, 2.4, -2, 2.8];
const SWAY_DELAY = [0, 0.4, 0.8, 1.2];

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-paper-alt py-12 sm:py-16" id="how-it-works">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          icon={ListChecks}
          title="From worried to reassured, in four steps."
          align="center"
          className="mx-auto"
        />

        <div className="relative mt-24">
          {/* The rail every card's string hangs from — only reads correctly once
              the steps sit in one row, so it's lg+ only. */}
          <div
            className="absolute inset-x-6 top-0 hidden h-px bg-gradient-to-r from-brand-200/0 via-brand-200 to-brand-200/0 lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-y-16 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step, i) => {
              const tilt = REST_TILT[i % REST_TILT.length];
              return (
                <div key={step.id} className="flex flex-col items-center">
                  {/* String: fixed, doesn't rotate with the card — it's taut. */}
                  <div className="h-8 w-px shrink-0 bg-gradient-to-b from-brand-200/0 via-brand-300 to-brand-300" aria-hidden="true" />

                  <motion.div
                    initial={{ opacity: 0, y: -14, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: tilt }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 0.8, 0.28, 1] }}
                    whileHover={{ rotate: 0, y: -6, transition: { duration: 0.35, ease: [0.22, 0.8, 0.28, 1] } }}
                    className="group relative w-full max-w-[260px] origin-top"
                  >
                    {/* Idle sway: a second, independent animate loop layered under the
                        hover/entrance transforms above via a wrapping span so they never fight. */}
                    <motion.div
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { rotate: [0, 1.4, 0, -1.4, 0] }
                      }
                      transition={
                        prefersReducedMotion
                          ? undefined
                          : { duration: 7, repeat: Infinity, ease: "easeInOut", delay: SWAY_DELAY[i % SWAY_DELAY.length] }
                      }
                      className="origin-top"
                    >
                      {/* Grommet: the "hole" the string threads through, sitting on the
                          card's top seam so the whole tag reads as pinned, not stacked. */}
                      <span className="absolute -top-4 left-1/2 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand-200 bg-surface font-display text-sm text-brand-600 shadow-sm">
                        {step.index}
                      </span>

                      <div className="notch-card-sm h-full border border-line bg-surface p-6 pt-8 shadow-md transition-shadow duration-300 group-hover:shadow-lg">
                        <h3 className="font-display text-lg text-brand-700">{step.title}</h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{step.description}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
