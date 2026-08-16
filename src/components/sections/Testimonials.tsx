import { useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PersonMark } from "@/components/ui/PersonMark";
import { RatingStars } from "@/components/ui/RatingStars";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";
import type { AvatarPalette } from "@/data/types";

const TINTS: Record<AvatarPalette, string> = {
  brand: "bg-brand-50",
  accent: "bg-accent-100",
  gold: "bg-gold-400/15",
  slate: "bg-ink/5",
};

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  // Doubled so the track can loop seamlessly at -50%; skipped under
  // reduced-motion, where the strip is just a static single row instead.
  const items = prefersReducedMotion ? testimonials : [...testimonials, ...testimonials];

  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pet owners, in their words"
          icon={Quote}
          title="Real visits, told by the people who booked them."
        />
      </div>

      <Reveal delay={0.1}>
        <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div
            className={prefersReducedMotion ? "flex gap-5 px-4 py-3" : "flex w-max animate-marquee gap-5 px-4 py-3"}
            style={prefersReducedMotion ? undefined : { animationDuration: `${testimonials.length * 7}s` }}
          >
            {items.map((t, i) => (
              <article
                key={`${t.id}-${i}`}
                className={`notch-card-sm group relative w-[240px] shrink-0 overflow-hidden border border-line p-5 shadow-xs transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:scale-[1.03] hover:border-accent-400 hover:shadow-lg sm:w-[270px] ${TINTS[t.palette]}`}
              >
                <Quote size={46} strokeWidth={1.5} className="pointer-events-none absolute -right-2 -top-2 text-brand-900/[0.06]" aria-hidden="true" />

                <div className="relative flex items-center justify-between">
                  <RatingStars rating={t.rating} />
                  <Quote size={13} strokeWidth={2.4} className="text-accent-500/70" aria-hidden="true" />
                </div>
                <p className="relative mt-3 font-display text-base leading-snug text-brand-700">"{t.quote}"</p>
                <div className="relative mt-4 flex items-center gap-2.5 border-t border-brand-900/8 pt-4">
                  <PersonMark palette={t.palette} size={36} />
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.ownerName}</p>
                    <p className="text-xs text-ink-soft">
                      Owner of {t.petName} · {t.petType}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
