import { CalendarClock, Video, Building2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { AppointmentBookingForm } from "@/components/appointments/AppointmentBookingForm";
import { Reveal } from "@/components/ui/Reveal";
import { appointmentHistory, type AppointmentStatus } from "@/data/appointments";

const statusStyles: Record<AppointmentStatus, string> = {
  Upcoming: "bg-brand-50 text-brand-600",
  Completed: "bg-ink/5 text-ink-soft",
  Cancelled: "bg-accent-100 text-accent-600",
};

export default function Appointments() {
  return (
    <>
      <PageHeader
        eyebrow="Appointments"
        icon={CalendarClock}
        title="Book a visit, or see where things stand."
        description="Request a new appointment below, or review your upcoming and past visits across every pet."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal direction="left">
            <AppointmentBookingForm />
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <h2 className="font-display text-xl text-brand-700">Your appointments</h2>
            <div className="mt-5 flex flex-col gap-3">
              {appointmentHistory.map((appt) => (
                <div
                  key={appt.id}
                  className="notch-card-sm flex flex-col gap-3 border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500">
                      {appt.type === "Video consult" ? <Video size={15} /> : <Building2 size={15} />}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {appt.doctorName} <span className="font-normal text-ink-soft">· {appt.specialization}</span>
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-soft">
                        <CalendarClock size={12} />
                        {appt.date} · {appt.time} · For {appt.petName}
                      </p>
                      {appt.note && <p className="mt-1.5 text-xs text-ink-faint">{appt.note}</p>}
                    </div>
                  </div>
                  <span className={`shrink-0 self-start rounded-full px-3 py-1 text-xs font-bold sm:self-center ${statusStyles[appt.status]}`}>
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
