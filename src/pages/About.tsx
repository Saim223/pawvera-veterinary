import { Mail, MapPin, Phone, Zap, Eye, Stethoscope, Users, PawPrint, Target } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PersonMark } from "@/components/ui/PersonMark";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { trustStats } from "@/data/content";
import { useCountUp } from "@/lib/useCountUp";
import type { AvatarPalette } from "@/data/types";
import type { ComponentType } from "react";

const statIcons: Record<string, ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  owners: Users,
  vets: Stethoscope,
  appointments: Zap,
  satisfaction: Eye,
};

const values = [
  {
    title: "Access first",
    description: "The right vet, found in minutes — not after a dozen phone calls.",
    icon: Zap,
  },
  {
    title: "Transparent by default",
    description: "Fees and availability are visible before you ever book.",
    icon: Eye,
  },
  {
    title: "Built with veterinarians",
    description: "Every workflow is shaped by vets who actually use it daily.",
    icon: Stethoscope,
  },
];

const team: { name: string; role: string; palette: AvatarPalette }[] = [
  { name: "Renee Ibarra", role: "Co-founder & CEO", palette: "brand" },
  { name: "Dr. Wale Adeyemi", role: "Co-founder & Chief Veterinary Officer", palette: "accent" },
  { name: "Sofia Marchetti", role: "Head of Product", palette: "gold" },
  { name: "Tobias Lindgren", role: "Head of Engineering", palette: "slate" },
];

const contactItems = [
  { icon: Mail, label: "hello@vetly.example", href: "mailto:hello@vetly.example" },
  { icon: Phone, label: "(800) 555-0142", href: "tel:+18005550142" },
  { icon: MapPin, label: "412 Willowbrook Lane, Portland, OR" },
];

function StatBlock({ id, value, suffix, label }: { id: string; value: number; suffix: string; label: string }) {
  const { ref, display } = useCountUp<HTMLDivElement>(value);
  const Icon = statIcons[id] ?? Users;
  return (
    <div
      ref={ref}
      className="group notch-card-sm border border-line bg-surface p-6 shadow-xs transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-500 transition-transform duration-300 group-hover:scale-105">
        <Icon size={17} strokeWidth={1.8} />
      </span>
      <p className="mt-4 font-display text-3xl text-brand-700">
        {display}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-ink-soft">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Pawvera"
        icon={PawPrint}
        title="We started Pawvera because finding a good vet shouldn't take longer than the visit itself."
        description="We connect pet owners with verified veterinary doctors and hospitals — for booked visits, online consults, and everything a pet's care history should hold onto."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustStats.map((stat) => (
              <RevealItem key={stat.id}>
                <StatBlock id={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-paper-alt py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Our principles" icon={Target} title="What we optimize for" />
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-3">
            {values.map((v) => (
              <RevealItem key={v.title}>
                <div className="group notch-card-sm h-full border border-line bg-surface p-6 shadow-xs transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-100 text-accent-600 transition-transform duration-300 group-hover:scale-105">
                    <v.icon size={17} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-brand-700">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="The team" icon={Users} title="Leadership" />
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <RevealItem key={member.name}>
                <div className="group notch-card-sm flex h-full flex-col items-center border border-line bg-surface p-6 text-center shadow-xs transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg">
                  <PersonMark
                    palette={member.palette}
                    size={68}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <p className="mt-3 font-display text-base text-brand-700">{member.name}</p>
                  <p className="text-sm text-ink-soft">{member.role}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="careers" className="scroll-mt-28 bg-paper-alt py-16 sm:py-20">
        <div className="container-page max-w-2xl">
          <Reveal>
            <div className="notch-card border border-line bg-surface p-8 shadow-xs">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-400/20 text-gold-500">
                <Users size={19} strokeWidth={1.8} />
              </span>
              <h2 className="mt-4 font-display text-2xl text-brand-700">Careers</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                We're a small, growing team working on veterinary access. We're not actively hiring for a
                specific role right now, but if you work in veterinary medicine, product, or engineering
                and want to help more pets get seen faster, we'd like to hear from you.
              </p>
              <a
                href="mailto:careers@vetly.example"
                className="mt-4 inline-block font-semibold text-brand-600 transition-colors hover:text-brand-700"
              >
                careers@vetly.example →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Get in touch" icon={Mail} title="Contact" />
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-3">
            {contactItems.map((item) => {
              const content = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500 transition-transform duration-300 group-hover:scale-105">
                    <item.icon size={16} strokeWidth={1.8} />
                  </span>
                  <span className="text-sm font-medium text-ink">{item.label}</span>
                </>
              );
              return (
                <RevealItem key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="group notch-card-sm flex h-full items-center gap-3 border border-line bg-surface p-5 shadow-xs transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="group notch-card-sm flex h-full items-center gap-3 border border-line bg-surface p-5 shadow-xs">
                      {content}
                    </div>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
