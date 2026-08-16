interface OrganicDividerProps {
  /** CSS color (or a design-token var) of the section that comes NEXT — the
   * divider curves the current section's bottom edge into that color. */
  fill: string;
  className?: string;
}

/**
 * A soft, single-wave seam between two sections, used sparingly at the
 * handful of boundaries with real color contrast (e.g. a dark band cutting
 * back to the light body). Most boundaries stay a plain edge — this is for
 * where an organic transition genuinely reads as more considered than a cut.
 */
export function OrganicDivider({ fill, className }: OrganicDividerProps) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-14 overflow-hidden sm:h-20 ${className ?? ""}`} aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="absolute bottom-0 h-full w-full translate-y-px">
        <path d="M0,32 C320,90 1120,-10 1440,46 L1440,90 L0,90 Z" fill={fill} />
      </svg>
    </div>
  );
}
