import { Siren, MapPin, Clock3, ArrowRight, Hospital } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GlassBackdrop } from "@/components/ui/GlassBackdrop";
import { emergencyClinics } from "@/data/dashboard";

export function EmergencyCare() {
  return (
    <section className="relative overflow-hidden bg-night py-12 text-paper sm:py-16" id="emergency">
      <GlassBackdrop variant="night" />
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal direction="left">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-red-400">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400/40" />
              <Siren size={14} className="relative" />
            </span>
            Emergency care
          </div>
          <h2 className="mt-5 text-balance font-display text-[2.1rem] leading-[1.12] tracking-tight text-paper sm:text-[2.6rem] lg:text-[3rem]">
            When every second matters.
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-paper/70">
            Urgent care nearby, sorted by distance and open status.
          </p>
          <LinkButton href="/emergency" variant="accent" size="lg" icon={<ArrowRight size={17} />} className="mt-8">
            Find Emergency Vet
          </LinkButton>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <div className="glass-dark relative overflow-hidden rounded-card border border-white/12 p-3 shadow-lg">
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
              aria-hidden="true"
            />
            {emergencyClinics.map((clinic, i) => {
              const isOpen = clinic.status === "Open now";
              return (
                <div
                  key={clinic.id}
                  className={
                    "group flex items-center justify-between gap-4 rounded-lg px-4 py-4 transition-colors duration-200 hover:bg-white/6 " +
                    (i !== emergencyClinics.length - 1 ? "border-b border-white/8" : "")
                  }
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 " +
                        (isOpen ? "bg-brand-400/20 text-brand-100" : "bg-white/8 text-paper/45")
                      }
                    >
                      <Hospital size={17} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="font-display text-base text-paper">{clinic.name}</p>
                      <div className="mt-1.5 flex items-center gap-3 text-xs text-paper/55">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {clinic.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock3 size={12} />
                          {clinic.waitTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={
                      "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold " +
                      (isOpen ? "bg-brand-500/20 text-brand-100" : "bg-white/8 text-paper/45")
                    }
                  >
                    {isOpen && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300 opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-300" />
                      </span>
                    )}
                    {clinic.status}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
