import { MapPin, Clock3, Phone, TriangleAlert, Siren } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { emergencyClinics } from "@/data/dashboard";
import { healthTopics } from "@/data/healthTopics";

const emergencySigns = healthTopics.find((t) => t.id === "emergency-signs")!;

export default function Emergency() {
  return (
    <>
      <PageHeader
        eyebrow="Emergency care"
        icon={Siren}
        title="When every second matters."
        description="Available emergency clinics near you, ordered by distance — call directly, no forms in the way."
        background="bg-night"
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-4">
            {emergencyClinics.map((clinic) => (
              <Reveal key={clinic.id}>
                <div className="notch-card-sm flex flex-col gap-4 border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-lg text-brand-700">{clinic.name}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-ink-soft">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-ink-faint" />
                        {clinic.distance}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock3 size={14} className="text-ink-faint" />
                        {clinic.waitTime}
                      </span>
                      <span
                        className={
                          "rounded-full px-2.5 py-1 text-xs font-bold " +
                          (clinic.status === "Open now" ? "bg-brand-50 text-brand-600" : "bg-ink/5 text-ink-faint")
                        }
                      >
                        {clinic.status}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`tel:${clinic.phone}`}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-md bg-accent-500 px-5 py-2.5 text-sm font-bold text-brand-700 transition-colors hover:bg-accent-600 hover:text-paper"
                  >
                    <Phone size={15} />
                    {clinic.phoneDisplay}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="right" delay={0.1}>
            <div className="notch-card border border-line bg-brand-900 p-7 text-paper">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-red-400">
                <TriangleAlert size={14} />
                {emergencySigns.title}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-paper/70">{emergencySigns.description}</p>
              <ul className="mt-5 flex flex-col gap-3">
                {emergencySigns.tips.map((tip) => (
                  <li key={tip} className="border-t border-white/10 pt-3 text-sm leading-relaxed text-paper/85 first:border-t-0 first:pt-0">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
