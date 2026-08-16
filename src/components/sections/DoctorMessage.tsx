import { motion, useReducedMotion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { DoctorConnectorLine } from "./DoctorConnectorLine";
import { doctors } from "@/data/doctors";

const featured = doctors[2];

export function DoctorMessage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-12 sm:py-16">
      <div className="container-page grid items-center gap-2 lg:grid-cols-[0.7fr_auto_1fr]">
        <Reveal direction="left">
          <div className="mx-auto max-w-[280px] overflow-hidden rounded-card bg-brand-50 lg:mx-0">
            <img src={featured.photo} alt={featured.name} className="aspect-[5/6] w-full object-cover" />
          </div>
        </Reveal>

        <DoctorConnectorLine />

        <Reveal direction="right" delay={0.1}>
          <motion.div
            className="blob-panel relative bg-accent-100 px-8 py-14 sm:px-14 sm:py-16"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    borderRadius: [
                      "42% 58% 65% 35% / 45% 40% 60% 55%",
                      "56% 44% 40% 60% / 55% 60% 40% 45%",
                      "42% 58% 65% 35% / 45% 40% 60% 55%",
                    ],
                  }
            }
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          >
            <Quote size={64} className="absolute left-6 top-6 text-accent-500/15 sm:left-10 sm:top-10" strokeWidth={1} />
            <blockquote className="relative">
              <p className="text-balance font-display text-2xl italic leading-snug text-brand-700 sm:text-3xl">
                "Every pet deserves compassionate care, timely treatment, and a veterinarian who
                listens."
              </p>
              <footer className="mt-6">
                <p className="font-display text-base font-medium text-brand-700">{featured.name}</p>
                <p className="text-sm text-ink-soft">{featured.specialization} · {featured.hospital}</p>
              </footer>
              <LinkButton href="/doctors" variant="primary" size="sm" icon={<ArrowRight size={15} />} className="mt-7">
                Meet Our Veterinarians
              </LinkButton>
            </blockquote>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
