import { LayoutDashboard } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { OwnerDashboardPreview } from "./OwnerDashboardPreview";
import { DoctorDashboardPreview } from "./DoctorDashboardPreview";

export function ProductPreviews() {
  return (
    <section className="overflow-hidden bg-paper-alt py-12 sm:py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Inside the platform"
          icon={LayoutDashboard}
          title="One product, built for both sides of the visit."
          description="Pet owners manage every pet in one place. Veterinarians manage every appointment in another."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 flex flex-col gap-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <OwnerDashboardPreview />
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-500">For pet owners</p>
                <h3 className="mt-4 font-display text-2xl text-brand-700 sm:text-3xl">
                  Every pet, every visit, in one dashboard.
                </h3>
                <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
                  See upcoming appointments, past consultations, prescriptions, and the photos you've
                  shared — organized by pet, not buried in email.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left" className="order-2 lg:order-1">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-500">For veterinarians</p>
                <h3 className="mt-4 font-display text-2xl text-brand-700 sm:text-3xl">
                  Run your practice without the back office.
                </h3>
                <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
                  Accept or decline requests, run video consultations, and review a patient's full
                  history — including the photos their owner sent — before you ever say hello.
                </p>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.1} className="order-1 lg:order-2">
              <DoctorDashboardPreview />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
