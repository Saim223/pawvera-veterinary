import { clsx } from "clsx";

interface GlassBackdropProps {
  variant?: "warm" | "night";
  className?: string;
}

/**
 * Soft blurred color blobs placed behind a glass surface that would
 * otherwise have nothing to blur. Purely decorative — always aria-hidden
 * and non-interactive. Parent must be `relative` (and usually `overflow-hidden`).
 */
export function GlassBackdrop({ variant = "warm", className }: GlassBackdropProps) {
  const isNight = variant === "night";

  return (
    <div className={clsx("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)} aria-hidden="true">
      <div
        className={clsx(
          "absolute -left-[10%] -top-[20%] h-[55%] w-[55%] rounded-full blur-3xl",
          isNight ? "bg-brand-400/14" : "bg-brand-400/25",
        )}
      />
      <div
        className={clsx(
          "absolute -right-[15%] top-[10%] h-[60%] w-[50%] rounded-full blur-3xl",
          isNight ? "bg-accent-500/18" : "bg-accent-400/25",
        )}
      />
      <div
        className={clsx(
          "absolute bottom-[-25%] left-[20%] h-[50%] w-[50%] rounded-full blur-3xl",
          isNight ? "bg-gold-400/12" : "bg-gold-400/25",
        )}
      />
    </div>
  );
}
