import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20" id="final-cta">
      <picture>
        <source
          type="image/webp"
          srcSet="/images/hero/hero-3-640.webp 640w, /images/hero/hero-3-960.webp 960w, /images/hero/hero-3-1280.webp 1280w, /images/hero/hero-3-1536.webp 1536w"
          sizes="100vw"
        />
        <img
          src="/images/hero/hero-3-1536.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
        />
      </picture>
      <div className="absolute inset-0 bg-brand-900/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(217,174,108,0.16),transparent_60%)]" />

      <div className="container-page relative text-center">
        <Reveal direction="none">
          <h2 className="mx-auto max-w-2xl text-balance font-display text-[2.3rem] leading-[1.1] tracking-tight text-paper [text-shadow:0_2px_16px_rgba(8,18,16,0.55)] sm:text-[3rem] lg:text-[3.4rem]">
            Better care starts with the right veterinarian.
          </h2>
        </Reveal>
        <Reveal direction="none" delay={0.08}>
          <p className="mx-auto mt-5 max-w-md text-[1.05rem] leading-relaxed text-paper/75 [text-shadow:0_1px_10px_rgba(8,18,16,0.5)]">
            Book a consultation and give your pet the care they deserve.
          </p>
        </Reveal>
        <Reveal direction="none" delay={0.16}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/doctors" variant="accent" size="lg" icon={<ArrowRight size={17} />}>
              Find a Veterinarian
            </LinkButton>
            <LinkButton href="/appointments" variant="ghost-light" size="lg">
              Book Appointment
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
