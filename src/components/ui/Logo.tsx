import { Link } from "react-router-dom";
import { clsx } from "clsx";

// The artwork's paw/dog shapes are a dark navy nearly identical to the site's
// dark sections (brand-900) — on a light background they read fine on their
// own, but on a dark one they need a soft tinted disc behind them or they
// vanish. `dark` here means "sitting on a light/solid background."
export function LogoMark({ size = 34, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <span
      style={{ width: size, height: size }}
      className={clsx("inline-flex shrink-0 items-center justify-center", !dark && "rounded-full bg-paper/70 p-1 shadow-sm backdrop-blur-sm")}
    >
      <img src="/logo-icon.png" alt="" aria-hidden="true" className="h-full w-full object-contain" />
    </span>
  );
}

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link to="/" className={clsx("inline-flex items-center gap-2.5", className)} aria-label="Pawvera home">
      <LogoMark dark={dark} />
      <span className={clsx("font-display text-xl font-medium tracking-tight", dark ? "text-brand-700" : "text-paper")}>
        Pawvera
      </span>
    </Link>
  );
}
