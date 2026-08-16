import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, Loader2 } from "lucide-react";
import { doctors } from "@/data/doctors";

const petTypes = ["Dog", "Cat", "Rabbit", "Bird", "Other"];
const timeSlots = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "6:00 PM"];

const fieldClasses =
  "w-full rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition-[border-color,box-shadow] focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(31,74,59,0.1)]";

export function AppointmentBookingForm() {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("doctor");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="notch-card border border-line bg-surface p-7 sm:p-9">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-start gap-3 py-6"
          >
            <CircleCheck size={34} className="text-brand-500" />
            <p className="font-display text-xl text-brand-700">Appointment requested.</p>
            <p className="text-sm text-ink-soft">
              We'll confirm by email shortly and add it to your appointment history below.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Book another →
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
            <h2 className="font-display text-xl text-brand-700 sm:col-span-2">Book a new appointment</h2>

            <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft">
              Pet's name
              <input required placeholder="e.g. Hazel" className={fieldClasses} />
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft">
              Pet type
              <select defaultValue={petTypes[0]} className={fieldClasses}>
                {petTypes.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft sm:col-span-2">
              Veterinarian
              <select defaultValue={preselected ?? "any"} className={fieldClasses}>
                <option value="any">Any available veterinarian</option>
                {doctors.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name} — {d.specialization} (${d.fee})
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft">
              Preferred date
              <input type="date" min={today} defaultValue={today} required className={fieldClasses} />
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft">
              Preferred time
              <select defaultValue={timeSlots[0]} className={fieldClasses}>
                {timeSlots.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft sm:col-span-2">
              Anything the vet should know? <span className="font-normal text-ink-faint">(optional)</span>
              <textarea rows={3} placeholder="Symptoms, questions, past visits…" className={fieldClasses} />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex items-center justify-center gap-2 rounded-md bg-brand-500 px-6 py-3.5 text-sm font-bold text-paper transition-colors hover:bg-brand-600 disabled:opacity-70 sm:col-span-2"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Booking…
                </>
              ) : (
                "Book Appointment"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
