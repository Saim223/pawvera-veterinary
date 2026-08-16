import { LayoutDashboard, PawPrint, CalendarClock, Pill, Image as ImageIcon, ChevronRight } from "lucide-react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { myPets, ownerAppointment, ownerPrescriptions } from "@/data/dashboard";

const sidebarIcons = [LayoutDashboard, PawPrint, CalendarClock, Pill, ImageIcon];

const petThumbs = ["/images/hero/hero-1-640.webp", "/images/hero/hero-3-640.webp"];

export function OwnerDashboardPreview() {
  return (
    <BrowserFrame url="app.vetly.com/dashboard" tilt="left">
      <div className="flex">
        <div className="hidden w-14 flex-col items-center gap-5 border-r border-line bg-paper-alt py-6 sm:flex">
          {sidebarIcons.map((Icon, i) => (
            <span
              key={i}
              className={
                "flex h-9 w-9 items-center justify-center rounded-xl " +
                (i === 0 ? "bg-brand-500 text-paper" : "text-ink-faint")
              }
            >
              <Icon size={16} />
            </span>
          ))}
        </div>

        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">Welcome back</p>
              <p className="font-display text-lg text-brand-700">Jordan's Pets</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-[1.1fr_1fr]">
            <div className="rounded-lg border border-line bg-surface p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-ink-faint">My Pets</p>
              <div className="flex flex-col gap-3">
                {myPets.map((pet) => (
                  <div key={pet.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-ink">{pet.name}</p>
                      <p className="text-xs text-ink-soft">{pet.species} · {pet.age}</p>
                    </div>
                    <span
                      className={
                        "rounded-full px-2.5 py-1 text-[0.65rem] font-bold " +
                        (pet.status === "Good" ? "bg-brand-50 text-brand-600" : "bg-gold-400/20 text-gold-500")
                      }
                    >
                      {pet.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-line bg-brand-50 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-brand-600">Next appointment</p>
              <p className="font-display text-base text-brand-700">{ownerAppointment.doctorName}</p>
              <p className="text-xs text-ink-soft">{ownerAppointment.specialization}</p>
              <p className="mt-2 text-sm font-semibold text-brand-600">{ownerAppointment.when}</p>
              <span className="mt-2 inline-block rounded-full bg-surface px-2.5 py-1 text-[0.65rem] font-bold text-ink-soft">
                {ownerAppointment.type}
              </span>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-line bg-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-ink-faint">Prescriptions</p>
                <ChevronRight size={14} className="text-ink-faint" />
              </div>
              <div className="flex flex-col gap-2.5">
                {ownerPrescriptions.map((rx) => (
                  <div key={rx.id} className="text-xs">
                    <p className="font-semibold text-ink">{rx.medication}</p>
                    <p className="text-ink-soft">{rx.pet} · {rx.instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-line bg-surface p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-ink-faint">Uploaded images</p>
              <div className="flex gap-2">
                {petThumbs.map((src) => (
                  <div key={src} className="h-12 w-12 overflow-hidden rounded-lg border border-line">
                    <img src={src} alt="Uploaded pet photo thumbnail" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-line text-ink-faint">
                  <ImageIcon size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
