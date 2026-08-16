import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, MouseEvent } from "react";
import { clsx } from "clsx";

type Variant = "primary" | "accent" | "outline" | "ghost-light" | "outline-light";
type Size = "md" | "sm" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-[linear-gradient(180deg,#1c4b53_0%,#123b42_55%,#0c2b31_100%)] text-paper shadow-[0_1px_0_0_rgba(255,255,255,0.14)_inset,0_10px_20px_-8px_rgba(10,30,34,0.45)] hover:brightness-[1.06]",
  // Coral is light enough that white text fails contrast (~2.4:1) — Deep
  // Teal text on coral clears WCAG AA comfortably (~5:1), per brand spec's
  // own "white or teal depending on contrast" guidance.
  accent:
    "bg-[linear-gradient(180deg,#ee9a94_0%,#e98d87_55%,#d67872_100%)] text-brand-700 shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_10px_24px_-8px_rgba(233,141,135,0.55)] hover:brightness-[1.04]",
  outline: "bg-transparent text-brand-700 border border-line hover:border-brand-500 hover:bg-brand-50",
  "ghost-light":
    "glass-dark text-paper border border-white/20 hover:border-white/35 hover:bg-white/10",
  "outline-light": "bg-transparent text-paper border border-white/40 hover:bg-white hover:text-brand-700",
};

// Physical press feel: buttons with real depth (primary/accent) rise a touch
// on hover and settle back down on press; flat variants (outline/glass) just
// nudge up without the shadow choreography since they have no depth to sell.
const liftVariants = new Set<Variant>(["primary", "accent"]);

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3.5 text-[0.95rem] gap-2",
  lg: "px-8 py-4 text-base gap-2.5",
};

interface SharedProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

function useMagnetic() {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.22);
    y.set(relY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { springX, springY, handleMouseMove, handleMouseLeave };
}

function baseClasses(variant: Variant, size: Size, className?: string) {
  return clsx(
    "relative inline-flex items-center justify-center rounded-md font-semibold whitespace-nowrap transition-colors duration-200 ease-out cursor-pointer select-none",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

type ConflictingHandlers = "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd";

type ButtonProps = SharedProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingHandlers>;
type LinkButtonProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, ConflictingHandlers> & { href: string };

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  children,
  ...rest
}: ButtonProps) {
  const { springX, springY, handleMouseMove, handleMouseLeave } = useMagnetic();
  const lift = liftVariants.has(variant);
  return (
    <motion.button
      className={baseClasses(variant, size, className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={lift ? { scale: 1.025 } : undefined}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      {...rest}
    >
      {icon && iconPosition === "left" && <span className="inline-flex">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="inline-flex">{icon}</span>}
    </motion.button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  children,
  ...rest
}: LinkButtonProps) {
  const { springX, springY, handleMouseMove, handleMouseLeave } = useMagnetic();
  const lift = liftVariants.has(variant);
  return (
    <motion.a
      className={baseClasses(variant, size, className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={lift ? { scale: 1.025 } : undefined}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      {...rest}
    >
      {icon && iconPosition === "left" && <span className="inline-flex">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="inline-flex">{icon}</span>}
    </motion.a>
  );
}
