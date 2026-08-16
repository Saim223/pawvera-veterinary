import type { ComponentType } from "react";
import { Users, Stethoscope, CalendarCheck, Smile } from "lucide-react";
import { trustStats } from "@/data/content";
import { useCountUp } from "@/lib/useCountUp";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<string, ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  owners: Users,
  vets: Stethoscope,
  appointments: CalendarCheck,
  satisfaction: Smile,
};

function StatItem({
  id,
  value,
  suffix,
  label,
}: {
  id: string;
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, display } = useCountUp<HTMLDivElement>(value);
  const Icon = icons[id] ?? Users;

  return (
    <div
      ref={ref}
      className="group relative flex flex-col gap-2 overflow-hidden px-6 py-8 transition-transform duration-300 ease-out hover:-translate-y-1 sm:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(130% 100% at 50% 0%, rgba(233,141,135,0.16) 0%, rgba(233,141,135,0) 62%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px origin-center scale-x-0 bg-accent-400/70 transition-transform duration-[400ms] ease-out group-hover:scale-x-100 sm:inset-x-8"
      />

      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent-100 text-accent-600 transition-transform duration-300 group-hover:scale-105">
        <Icon size={16} strokeWidth={2.2} />
      </span>

      <span className="relative mt-1 font-display text-[2.1rem] font-medium leading-none text-brand-700 transition-colors duration-300 group-hover:text-brand-600 sm:text-[2.5rem]">
        {display}
        {suffix}
      </span>
      <span className="relative text-sm leading-snug text-ink-soft">{label}</span>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative z-10 px-4 pointer-events-none sm:px-0">
      <Reveal>
        <div className="container-page">
          <div className="glass pointer-events-auto -mt-14 grid grid-cols-2 divide-x divide-y divide-line rounded-card border border-white/50 sm:-mt-20 lg:-mt-10 lg:grid-cols-4 lg:divide-y-0">
            {trustStats.map((stat) => (
              <StatItem key={stat.id} id={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
