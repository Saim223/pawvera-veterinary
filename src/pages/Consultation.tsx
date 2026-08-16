import { Camera, Clock3, FileText, Video, Check, Wallet } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConsultationCallCard } from "@/components/sections/ConsultationCallCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { doctors } from "@/data/doctors";

const expectations = [
  { icon: Camera, title: "Share what you see", description: "Upload a photo before or during the call so the vet has context immediately." },
  { icon: Clock3, title: "Usually under 15 minutes", description: "Most consultations wrap up quickly once the vet can see and hear what's going on." },
  { icon: FileText, title: "Notes saved automatically", description: "Prescriptions and treatment notes are added straight to your pet's profile." },
];

const consultFees = doctors.map((d) => d.fee);
const minFee = Math.min(...consultFees);
const maxFee = Math.max(...consultFees);

const pricingPoints = [
  "The fee is set by each vet and shown on their profile before you book — no surprises after the call.",
  "You pay once, only when you book — no subscription or membership required.",
  "Follow-up messages about the same visit are included at no extra cost.",
];

export default function Consultation() {
  return (
    <>
      <PageHeader
        eyebrow="Online consultation"
        icon={Video}
        title="Talk to a vet without leaving the couch."
        description="This is a live simulation of the consultation experience — start it below to see how a real call would look."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <Reveal direction="left" className="flex flex-col gap-6">
            {expectations.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500">
                  <Icon size={17} />
                </span>
                <div>
                  <h3 className="font-display text-base text-brand-700">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{description}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <ConsultationCallCard />
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-alt py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal direction="left">
            <SectionHeading eyebrow="Pricing" icon={Wallet} title="One fee, set upfront, no surprises." />
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
              Every consultation fee is set by the vet you choose and shown on their profile before you book.
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="notch-card border border-line bg-surface p-7 shadow-xs sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-ink-faint">Typical video consult</p>
              <p className="mt-2 font-display text-4xl text-brand-700">
                ${minFee}
                <span className="text-xl text-ink-soft"> – ${maxFee}</span>
              </p>
              <RevealGroup className="mt-6 flex flex-col gap-3">
                {pricingPoints.map((point) => (
                  <RevealItem key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand-500" />
                    {point}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
