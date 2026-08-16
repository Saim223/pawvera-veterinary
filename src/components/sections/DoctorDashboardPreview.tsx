import { CalendarClock, Video, Clock3, Wallet, Users } from "lucide-react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MiniBarChart } from "@/components/charts/MiniBarChart";
import { doctorTodaySummary, weeklyConsultBars } from "@/data/dashboard";
import { doctors } from "@/data/doctors";

const previewDoctor = doctors.find((d) => d.slug === "james-okafor")!;

const summaryTiles = [
  { icon: CalendarClock, label: "Today's appointments", value: doctorTodaySummary.appointments },
  { icon: Video, label: "Online consultations", value: doctorTodaySummary.onlineConsults },
  { icon: Clock3, label: "Pending requests", value: doctorTodaySummary.pending },
];

export function DoctorDashboardPreview() {
  return (
    <BrowserFrame url="app.vetly.com/doctor" tilt="right">
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={previewDoctor.photo} alt="Dr. James Okafor" className="h-[38px] w-[38px] rounded-full object-cover" />
            <div>
              <p className="font-display text-base text-brand-700">Dr. James Okafor</p>
              <p className="text-xs text-ink-soft">Surgery · Northside Veterinary</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-600">
            <Users size={12} />
            48 patients
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {summaryTiles.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-lg border border-line bg-surface p-3.5">
              <Icon size={15} className="text-accent-500" />
              <p className="mt-2 font-display text-xl text-brand-700">{value}</p>
              <p className="mt-0.5 text-[0.68rem] leading-tight text-ink-soft">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-ink-faint">
              Consultations this week
            </p>
            <div className="text-brand-500">
              <MiniBarChart data={weeklyConsultBars} />
            </div>
          </div>

          <div className="rounded-lg border border-line bg-brand-900 p-4 text-paper sm:w-40">
            <Wallet size={15} className="text-gold-400" />
            <p className="mt-2 font-display text-xl">${doctorTodaySummary.revenue.toLocaleString()}</p>
            <p className="mt-0.5 text-[0.68rem] text-paper/60">Revenue today</p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
