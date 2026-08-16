import { Stethoscope } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DoctorDirectory } from "@/components/doctors/DoctorDirectory";

export default function Doctors() {
  return (
    <>
      <PageHeader
        eyebrow="Veterinary directory"
        icon={Stethoscope}
        title="Find the right veterinarian for your pet"
        description="Filter by specialization, location, availability, and price — every profile shows a real fee and a real next opening."
      />
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <DoctorDirectory />
        </div>
      </section>
    </>
  );
}
