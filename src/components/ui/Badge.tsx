import type { ReactNode } from "react";
import { clsx } from "clsx";

type BadgeTone = "brand" | "accent" | "gold" | "neutral" | "live";

const toneClasses: Record<BadgeTone, string> = {
  brand: "bg-brand-50 text-brand-600",
  accent: "bg-accent-100 text-accent-600",
  gold: "bg-gold-400/20 text-gold-500",
  neutral: "bg-ink/5 text-ink-soft",
  live: "bg-brand-500/10 text-brand-500",
};

export function Badge({
  children,
  tone = "neutral",
  icon,
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        toneClasses[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
