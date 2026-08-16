import { useMemo, useState } from "react";
import { doctors } from "@/data/doctors";
import { DoctorCard } from "./DoctorCard";
import { DoctorFilters } from "./DoctorFilters";
import { defaultFilterState } from "./filterState";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SearchX } from "lucide-react";

export function DoctorDirectory({ limit }: { limit?: number }) {
  const [filters, setFilters] = useState(defaultFilterState);

  const filtered = useMemo(() => {
    const matches = doctors.filter((doc) => {
      if (filters.specialization !== "All" && doc.specialization !== filters.specialization) return false;
      if (filters.city !== "All" && doc.city !== filters.city) return false;
      if (filters.consultationType !== "Any" && !doc.consultationTypes.includes(filters.consultationType)) return false;
      if (doc.fee > filters.maxPrice) return false;
      if (filters.availableTodayOnly && !doc.availableToday) return false;
      if (filters.query.trim()) {
        const q = filters.query.trim().toLowerCase();
        if (!doc.name.toLowerCase().includes(q) && !doc.hospital.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    return limit ? matches.slice(0, limit) : matches;
  }, [filters, limit]);

  return (
    <div className="flex flex-col gap-8">
      <DoctorFilters value={filters} onChange={setFilters} />

      {filtered.length > 0 ? (
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doctor) => (
            <RevealItem key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-line py-16 text-center">
          <SearchX size={28} className="text-ink-faint" />
          <p className="font-display text-lg text-brand-700">No veterinarians match those filters.</p>
          <p className="text-sm text-ink-soft">Try widening your search or clearing a filter.</p>
        </div>
      )}
    </div>
  );
}
