import type { ReactNode, ComponentType } from "react";
import { clsx } from "clsx";
import { Reveal } from "./Reveal";

type EyebrowIcon = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

interface SectionHeadingProps {
  eyebrow?: string;
  /** Icon shown in place of the eyebrow text — the text itself stays in the
   * DOM as sr-only so the section is still labeled for assistive tech. */
  icon?: EyebrowIcon;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "light";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  icon: Icon,
  title,
  description,
  align = "left",
  tone = "default",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          {Icon ? (
            <span
              className={clsx(
                "mb-4 flex h-10 w-10 items-center justify-center rounded-full",
                align === "center" && "mx-auto",
                tone === "light" ? "bg-white/10 text-gold-400" : "bg-accent-100 text-accent-600",
              )}
            >
              <Icon size={18} strokeWidth={2} />
              <span className="sr-only">{eyebrow}</span>
            </span>
          ) : (
            <p
              className={clsx(
                "mb-4 text-xs font-bold uppercase tracking-[0.14em]",
                tone === "light" ? "text-gold-400" : "text-accent-500",
              )}
            >
              {eyebrow}
            </p>
          )}
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={clsx(
            "text-balance font-display text-[2.1rem] leading-[1.12] tracking-tight sm:text-[2.6rem] lg:text-[3.1rem]",
            tone === "light" ? "text-paper" : "text-brand-700",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={clsx(
              "mt-5 text-[1.05rem] leading-relaxed",
              tone === "light" ? "text-paper/75" : "text-ink-soft",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
