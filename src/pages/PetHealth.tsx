import { Check, Info, HeartPulse } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { healthTopics } from "@/data/healthTopics";
import { healthIconMap } from "@/lib/iconMap";

const ICON_PALETTES = [
  "bg-brand-50 text-brand-500",
  "bg-accent-100 text-accent-600",
  "bg-gold-400/20 text-gold-500",
  "bg-ink/5 text-ink-soft",
];

export default function PetHealth() {
  return (
    <>
      <PageHeader
        eyebrow="Pet health library"
        icon={HeartPulse}
        title="Know your pet. Protect their health."
        description="Practical, general guidance across the areas that matter most — not a substitute for a diagnosis, but a good place to start noticing what's worth a call."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <RevealGroup className="grid gap-5 lg:grid-cols-2">
            {healthTopics.map((topic, i) => {
              const Icon = healthIconMap[topic.icon];
              return (
                <RevealItem key={topic.id} className="h-full">
                  <div
                    id={topic.id}
                    className="notch-card group flex h-full scroll-mt-28 flex-col border border-line bg-surface p-7 shadow-xs transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg sm:p-8"
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${ICON_PALETTES[i % ICON_PALETTES.length]}`}
                    >
                      <Icon size={19} strokeWidth={1.8} />
                    </span>
                    <h2 className="mt-4 font-display text-xl text-brand-700">{topic.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{topic.description}</p>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {topic.tips.map((tip) => (
                        <li key={tip} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
                          <Check size={14} className="mt-1 shrink-0 text-brand-500" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-dashed border-line bg-paper-alt px-5 py-4">
              <Info size={16} className="mt-0.5 shrink-0 text-ink-faint" />
              <p className="text-xs leading-relaxed text-ink-faint">
                This library is general educational information, not a diagnosis. If your pet is showing
                any of the signs above, especially anything under Emergency Signs, contact a veterinarian
                directly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
