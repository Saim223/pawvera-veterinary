import type { ReactNode, ComponentType } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { GlassBackdrop } from "./GlassBackdrop";
import { OrganicDivider } from "./OrganicDivider";

type EyebrowIcon = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

export function PageHeader({
  eyebrow,
  icon: Icon,
  title,
  description,
  background = "bg-brand-900",
}: {
  eyebrow: string;
  /** Icon shown in place of the eyebrow text — the text itself stays in the
   * DOM as sr-only so the page is still labeled for assistive tech. */
  icon?: EyebrowIcon;
  title: ReactNode;
  description?: ReactNode;
  background?: string;
}) {
  return (
    <section className={clsx("relative isolate overflow-hidden pb-20 pt-32 text-paper sm:pb-24 sm:pt-40", background)}>
      <GlassBackdrop variant="night" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(232,214,181,0.14),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="container-page relative z-10">
        {Icon ? (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-gold-400"
          >
            <Icon size={19} strokeWidth={2} />
            <span className="sr-only">{eyebrow}</span>
          </motion.span>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.14em] text-gold-400"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="mt-4 max-w-2xl text-balance font-display text-[2.2rem] leading-[1.1] tracking-tight text-paper sm:text-[2.8rem]"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-paper/70"
          >
            {description}
          </motion.p>
        )}
      </div>

      <OrganicDivider fill="var(--color-paper)" />
    </section>
  );
}
