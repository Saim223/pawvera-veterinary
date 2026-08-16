import { ArrowRight, Stethoscope } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GlassBackdrop } from "@/components/ui/GlassBackdrop";

export function DoctorCTA() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <Reveal>
          <div className="notch-card relative isolate overflow-hidden bg-brand-500 px-8 py-12 text-paper sm:px-12 sm:py-14">
            <GlassBackdrop variant="night" />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(232,214,181,0.18),transparent_55%)]"
              aria-hidden="true"
            />

            <div className="relative grid gap-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-14">
              <span className="mx-auto flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 lg:mx-0">
                <Stethoscope size={40} strokeWidth={1.5} className="text-gold-400" />
              </span>

              <div className="text-center lg:text-left">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-400">For veterinarians</p>
                <h2 className="mt-3 font-display text-2xl leading-tight text-paper sm:text-3xl">
                  Are you a veterinarian?
                </h2>
                <p className="mt-3 max-w-md text-[1rem] leading-relaxed text-paper/75">
                  Set your own fee and hours, and connect with pet owners who need trusted care.
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                <LinkButton href="/register?as=vet" variant="accent" size="md" icon={<ArrowRight size={16} />} className="w-full justify-center">
                  Register as Veterinarian
                </LinkButton>
                <LinkButton href="/about" variant="ghost-light" size="md" className="w-full justify-center">
                  Learn More
                </LinkButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
