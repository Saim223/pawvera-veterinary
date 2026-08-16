import { useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RatingStars } from "@/components/ui/RatingStars";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";
import type { AvatarPalette } from "@/data/types";

// Subtle per-testimonial accent, used only on the small initial badge — the
// card itself stays a consistent white surface (matching DoctorCard/
// TileShell) instead of each card wearing a different pastel background.
const AVATAR_TINTS: Record<AvatarPalette, { bg: string; text: string }> = {
  brand: { bg: "bg-brand-100", text: "text-brand-700" },
  accent: { bg: "bg-accent-100", text: "text-accent-600" },
  gold: { bg: "bg-gold-400/25", text: "text-gold-500" },
  slate: { bg: "bg-ink/10", text: "text-ink-soft" },
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
            {items.map((t, i) => {
              const tint = AVATAR_TINTS[t.palette];
              return (
                <article
                  key={`${t.id}-${i}`}
                  className="notch-card-sm group relative flex w-[260px] shrink-0 flex-col overflow-hidden border border-line bg-surface p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-accent-400 hover:shadow-lg sm:w-[290px]"
                >
                  <Quote
                    size={64}
                    strokeWidth={1.5}
                    className="pointer-events-none absolute -right-3 -top-3 text-brand-900/[0.05]"
                    aria-hidden="true"
                  />

                  <RatingStars rating={t.rating} />
                  <p className="relative mt-3.5 flex-1 font-display text-base leading-snug text-brand-700">
                    "{t.quote}"
                  </p>
                  <div className="relative mt-5 flex items-center gap-3 border-t border-line pt-4">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${tint.bg} ${tint.text}`}
                      aria-hidden="true"
                    >
                      {t.ownerName.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.ownerName}</p>
                      <p className="text-xs text-ink-soft">
                        Owner of {t.petName} · {t.petType}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
