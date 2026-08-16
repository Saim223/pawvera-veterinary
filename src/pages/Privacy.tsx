import { Scale } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const sections = [
  {
    title: "What we collect",
    body: "Account details you provide (name, email, phone), pet profile information, appointment history, and any photos you choose to upload for a consultation.",
  },
  {
    title: "How it's used",
    body: "To connect you with veterinarians, process appointment requests, and maintain your pet's care history across visits. We do not sell personal data to third parties.",
  },
  {
    title: "Photos you upload",
    body: "Images shared before or during a consultation are visible only to the veterinarian involved in that consultation and are retained as part of your pet's medical record.",
  },
  {
    title: "Your controls",
    body: "You can review, edit, or delete pet profile information and uploaded images from your account at any time.",
  },
];

export default function Privacy() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        icon={Scale}
        title="Privacy Policy"
        description="Last updated August 2026. This is a demo product — the policy below illustrates intended handling of data, not a binding legal document."
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
