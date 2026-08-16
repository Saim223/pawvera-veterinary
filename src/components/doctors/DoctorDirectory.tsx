import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { doctors } from "@/data/doctors";
import { DoctorCard } from "./DoctorCard";
import { DoctorFilters } from "./DoctorFilters";
import { defaultFilterState } from "./filterState";
import { SearchX } from "lucide-react";

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.8, 0.28, 1] as const } },
};

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
        // Plain `animate="visible"` (not the shared Reveal/whileInView
        // pattern) is used deliberately: this grid's contents change on
        // every filter toggle, and a doctor who drops out and reappears
        // is a fresh mount. `whileInView` + `viewport={{ once: true }}`
        // only fires once for the *group*, so a freshly (re)mounted card
        // stays stuck at its "hidden" (opacity: 0) starting variant —
        // `animate` is actively maintained and re-propagates to any child
        // mounted at any time, so this doesn't happen.
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={gridVariants}
        >
          {filtered.map((doctor) => (
            <motion.div key={doctor.id} variants={cardVariants}>
              <DoctorCard doctor={doctor} />
            </motion.div>
          ))}
        </motion.div>
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
