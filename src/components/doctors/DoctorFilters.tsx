import { Search, SlidersHorizontal } from "lucide-react";
import { specializations, cities } from "@/data/doctors";
import type { DoctorFilterState } from "./filterState";

const selectClasses =
  "w-full appearance-none rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition-[border-color,box-shadow] focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(31,74,59,0.1)]";

export function DoctorFilters({
  value,
  onChange,
}: {
  value: DoctorFilterState;
  onChange: (next: DoctorFilterState) => void;
}) {
  const set = <K extends keyof DoctorFilterState>(key: K, val: DoctorFilterState[K]) =>
    onChange({ ...value, [key]: val });

  return (
    <div className="notch-card-sm border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-5">
        <label className="flex flex-1 flex-col gap-1.5 text-xs font-semibold text-ink-soft">
          Search
          <span className="relative">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              type="text"
              value={value.query}
              onChange={(e) => set("query", e.target.value)}
              placeholder="Doctor name or hospital…"
              className="w-full rounded-xl border border-line bg-paper py-2.5 pl-9 pr-3.5 text-sm text-ink outline-none transition-[border-color,box-shadow] focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(31,74,59,0.1)]"
            />
          </span>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft lg:w-44">
          Specialization
          <select
            value={value.specialization}
            onChange={(e) => set("specialization", e.target.value)}
            className={selectClasses}
          >
            <option>All</option>
            {specializations.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft lg:w-40">
          Location
          <select value={value.city} onChange={(e) => set("city", e.target.value)} className={selectClasses}>
            <option>All</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft lg:w-44">
          Consultation type
          <select
            value={value.consultationType}
            onChange={(e) => set("consultationType", e.target.value as DoctorFilterState["consultationType"])}
            className={selectClasses}
          >
            <option>Any</option>
            <option>Video consult</option>
            <option>In-clinic visit</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft lg:w-44">
          Max fee: ${value.maxPrice}
          <input
            type="range"
            min={30}
            max={120}
            step={5}
            value={value.maxPrice}
            onChange={(e) => set("maxPrice", Number(e.target.value))}
            className="accent-brand-500"
          />
        </label>

        <button
          type="button"
          onClick={() => set("availableTodayOnly", !value.availableTodayOnly)}
          aria-pressed={value.availableTodayOnly}
          className={
            "flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors " +
            (value.availableTodayOnly
              ? "border-brand-500 bg-brand-50 text-brand-700"
              : "border-line bg-paper text-ink-soft hover:border-brand-500")
          }
        >
          <SlidersHorizontal size={14} />
          Available today
        </button>
      </div>
    </div>
  );
}
