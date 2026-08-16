import { Siren, HeartPulse, Timer, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal } from "@/components/ui/Reveal";
import { MiniBarChart } from "@/components/charts/MiniBarChart";
import { MiniLineChart } from "@/components/charts/MiniLineChart";
import { CircularProgress } from "@/components/charts/CircularProgress";
import { TreatmentVideoCard } from "./TreatmentVideoCard";
import { useCountUp } from "@/lib/useCountUp";
import { impactStat, bentoMetrics, weeklyConsultBars, responseTimeline } from "@/data/dashboard";

function TileShell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <TiltCard max={4} className={className}>
      <div className="notch-card-sm flex h-full flex-col justify-between gap-5 border border-line bg-surface p-6">
        {children}
      </div>
    </TiltCard>
  );
}

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const { ref, display } = useCountUp<HTMLSpanElement>(value, { decimals });
  return (
    <span ref={ref} className="font-display text-3xl font-medium text-brand-700">
      {display}
      {suffix}
    </span>
  );
}

export function BentoImpact() {
  return (
    <section className="bg-paper-alt py-12 sm:py-16" id="pet-health-impact">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why speed matters"
          icon={Zap}
          title="Every minute matters when a pet needs care."
          description="Faster access to a vet means faster treatment — here's what that looks like in numbers."
        />

        <div className="mt-14 grid grid-cols-6 gap-5">
          <Reveal className="col-span-full sm:col-span-3" direction="left">
            <div className="notch-card relative isolate flex h-full min-h-[280px] flex-col justify-between overflow-hidden bg-brand-900 p-7 text-paper sm:p-8">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_100%,rgba(63,122,95,0.35),transparent_60%)]"
                aria-hidden="true"
              />
              <HeartPulse
                size={200}
                strokeWidth={1}
                className="pointer-events-none absolute -bottom-10 -right-10 text-white/[0.04]"
                aria-hidden="true"
              />
              <div className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-400">
                <HeartPulse size={14} />
                Illustrative platform data
              </div>

              <div className="relative">
                <BigStat />
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/65">
                  {impactStat.label} — cases where owners flagged a delay in reaching a veterinarian as a
                  contributing factor. Shown here as demo data to visualize platform impact, not a
                  verified clinical statistic.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="col-span-full sm:col-span-3" direction="right">
            <TreatmentVideoCard />
          </Reveal>

          <Reveal className="col-span-full sm:col-span-2">
            <TileShell>
              <div className="flex items-center justify-between text-ink-soft">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em]">
                  <Siren size={14} className="text-accent-500" />
                  This week
                </div>
              </div>
              <div className="text-accent-500">
                <MiniBarChart data={weeklyConsultBars} />
              </div>
              <div>
                <Counter value={bentoMetrics.emergencyConsults.value} suffix={bentoMetrics.emergencyConsults.suffix} />
                <p className="mt-1 text-sm text-ink-soft">{bentoMetrics.emergencyConsults.label}</p>
              </div>
            </TileShell>
          </Reveal>

          <Reveal className="col-span-full sm:col-span-2" delay={0.05}>
            <TileShell>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-ink-soft">
                <HeartPulse size={14} className="text-brand-500" />
                Outcomes
              </div>
              <div className="flex items-center justify-center py-2 text-brand-500">
                <CircularProgress value={bentoMetrics.successfulTreatments.value} label="outcomes" />
              </div>
              <p className="text-sm text-ink-soft">{bentoMetrics.successfulTreatments.label}</p>
            </TileShell>
          </Reveal>

          <Reveal className="col-span-full sm:col-span-2" delay={0.1}>
            <TileShell>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-ink-soft">
                <Timer size={14} className="text-gold-500" />
                Response time
              </div>
              <div className="text-gold-500">
                <MiniLineChart data={responseTimeline} />
              </div>
              <div>
                <span className="font-display text-2xl font-medium text-brand-700">
                  {bentoMetrics.avgResponse.value}
                  {bentoMetrics.avgResponse.suffix}
                </span>
                <p className="mt-1 text-sm text-ink-soft">{bentoMetrics.avgResponse.label}</p>
              </div>
            </TileShell>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BigStat() {
  const { ref, display } = useCountUp<HTMLSpanElement>(impactStat.value);
  return (
    <span ref={ref} className="font-display text-5xl font-medium text-paper sm:text-6xl">
      {display}
    </span>
  );
}
