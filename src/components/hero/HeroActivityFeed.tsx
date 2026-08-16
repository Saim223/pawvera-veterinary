import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Video, UserCheck, FileText, Siren, Star, type LucideIcon } from "lucide-react";

interface Activity {
  icon: LucideIcon;
  text: string;
  tint: string;
}

const activities: Activity[] = [
  { icon: Video, text: "Marcus just booked a video consult", tint: "bg-accent-500/20 text-accent-300" },
  { icon: UserCheck, text: "Dr. Cho accepted a new patient", tint: "bg-brand-400/20 text-brand-200" },
  { icon: FileText, text: "Priya's prescription was sent", tint: "bg-gold-400/20 text-gold-300" },
  { icon: Siren, text: "Aisha found an emergency vet in 40s", tint: "bg-accent-500/20 text-accent-300" },
  { icon: Star, text: "Cameron rated Dr. Mitchell 5 stars", tint: "bg-gold-400/20 text-gold-300" },
];

const ROTATE_INTERVAL = 3800;

/**
 * A small live-feeling ticker cycling through recent platform activity —
 * illustrative, not a real feed, but gives the hero a sense of an active
 * network rather than a static screenshot.
 */
export function HeroActivityFeed({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % activities.length), ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  const current = activities[index];
  const Icon = current.icon;

  return (
    <div className={className}>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-paper/50">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300 opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-300" />
        </span>
        Live activity
      </div>

      <div className="relative mt-3 h-11 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
            transition={{ duration: 0.4, ease: [0.22, 0.8, 0.28, 1] }}
            className="absolute inset-x-0 flex items-center gap-2.5"
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${current.tint}`}>
              <Icon size={14} />
            </span>
            <span className="text-sm leading-snug text-paper/85">{current.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
