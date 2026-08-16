import { ArrowRight, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { DoctorDirectory } from "@/components/doctors/DoctorDirectory";

export function FindVeterinarian() {
  return (
    <section className="py-12 sm:py-16" id="find-doctors">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Verified specialists"
            icon={ShieldCheck}
            title="Find the right veterinarian for your pet"
            description="Filter by specialty, location, and price to find the right fit."
          />
          <LinkButton href="/doctors" variant="outline" size="md" icon={<ArrowRight size={16} />} className="shrink-0">
            View all doctors
          </LinkButton>
        </div>

        <div className="mt-12">
          <DoctorDirectory limit={3} />
        </div>
      </div>
    </section>
  );
}
