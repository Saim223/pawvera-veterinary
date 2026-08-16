interface PetLoveSymbolProps {
  size?: number;
  className?: string;
}

/**
 * A single custom mark for "pet care + pet love": a heart silhouette with a
 * paw print knocked out of its body, rather than two stacked icons. The paw
 * fill matches the hero screen's panel background so it reads as one carved
 * shape, not a separate badge.
 */
export function PetLoveSymbol({ size = 120, className }: PetLoveSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="petLoveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8d6b5" />
          <stop offset="100%" stopColor="#e98d87" />
        </linearGradient>
      </defs>

      <path
        d="M60,107 C60,107 14,75 14,42 C14,19 33,7 50,15 C55,17.5 58,22 60,27 C62,22 65,17.5 70,15 C87,7 106,19 106,42 C106,75 60,107 60,107 Z"
        fill="url(#petLoveGrad)"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1.5"
      />

      <g fill="#123b42">
        <ellipse cx="60" cy="73" rx="17" ry="13.5" />
        <circle cx="40" cy="49" r="8.6" />
        <circle cx="52" cy="38" r="9.6" />
        <circle cx="68" cy="38" r="9.6" />
        <circle cx="80" cy="49" r="8.6" />
      </g>
    </svg>
  );
}
