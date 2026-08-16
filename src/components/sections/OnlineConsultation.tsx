import { Check, Video } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrganicDivider } from "@/components/ui/OrganicDivider";
import { ConsultationCallCard } from "./ConsultationCallCard";

const points = ["Licensed vets", "Under 1 min to connect", "Live photo sharing"];

export function OnlineConsultation() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900 py-12 text-paper sm:py-16" id="consultation">
      {/* Diagonal seam: a second, darker section color clipped in behind the
          call card, with a soft gold-to-coral line drawn along the exact cut
          so the two halves read as deliberately distinct, not just a card
          floating on one flat background. The line's x-range (41%-46%) is
          kept inside the empty grid gap below (widened to lg:gap-24 to make
          room for it) so it never crosses into the text or the card at any
          scroll height, regardless of which one is taller. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <div
          className="absolute inset-0 bg-night"
          style={{ clipPath: "polygon(41% 0%, 100% 0%, 100% 100%, 46% 100%)" }}
        />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="consultSeam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8d6b5" stopOpacity="0" />
              <stop offset="18%" stopColor="#e8d6b5" stopOpacity="0.9" />
              <stop offset="82%" stopColor="#e98d87" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e98d87" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="41" y1="0" x2="46" y2="100" stroke="url(#consultSeam)" strokeWidth="1.6" opacity="0.4" />
          <line x1="41" y1="0" x2="46" y2="100" stroke="url(#consultSeam)" strokeWidth="0.35" />
        </svg>
      </div>

      <div className="container-page relative z-10 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="Online consultation"
            icon={Video}
            title="Some visits don't need a waiting room."
            description="See a vet face-to-face from home — no drive, no waiting room."
            tone="light"
          />
          <div className="mt-6 flex flex-wrap gap-2.5">
            {points.map((point) => (
              <span
                key={point}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-paper/85"
              >
                <Check size={13} className="shrink-0 text-gold-400" />
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:pl-3">
          <ConsultationCallCard startHref="/consultation" />
        </div>
      </div>

      <OrganicDivider fill="var(--color-paper)" />
    </section>
  );
}
