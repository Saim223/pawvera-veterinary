import { Scale } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const sections = [
  {
    title: "The service",
    body: "Pawvera connects pet owners with independent veterinary doctors and hospitals for booking, online consultation, and pet health record-keeping. We are a platform, not a veterinary practice.",
  },
  {
    title: "Not for emergencies",
    body: "Online consultations are not a substitute for in-person emergency care. If your pet is in a life-threatening situation, contact an emergency veterinary clinic directly.",
  },
  {
    title: "Veterinarian responsibilities",
    body: "Veterinarians using this platform are independently licensed and responsible for the medical advice, diagnoses, and treatment they provide.",
  },
  {
    title: "Payments",
    body: "Consultation fees are set by each veterinarian and charged at the time of booking. Refund and cancellation terms are shown before you confirm an appointment.",
  },
];

export default function Terms() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        icon={Scale}
        title="Terms of Service"
        description="Last updated August 2026. This is a demo product — the terms below illustrate intended platform behavior, not a binding legal agreement."
      />
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-2xl">
          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-xl text-brand-700">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
