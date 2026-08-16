const PAW_BEANS = [
  { cx: 14, cy: 21, rx: 6.2, ry: 7.4, rotate: -16 },
  { cx: 25.5, cy: 10.5, rx: 6.6, ry: 7.8, rotate: 0 },
  { cx: 38.5, cy: 10.5, rx: 6.6, ry: 7.8, rotate: 0 },
  { cx: 50, cy: 21, rx: 6.2, ry: 7.4, rotate: 16 },
];

interface CatPawProps {
  gradId: string;
  className?: string;
}

/** The paw's static artwork — every pose/press/reach animation is handled by
 * whatever wraps this (the orchestrator), not by the artwork itself. */
export function CatPaw({ gradId, className }: CatPawProps) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fbe0dd" />
          <stop offset="55%" stopColor="#e98d87" />
          <stop offset="100%" stopColor="#b85b54" />
        </radialGradient>
      </defs>
      <path
        d="M32 59C17.5 59 10.5 47 13 36.5 14.7 28.9 22 24 32 24 42 24 49.3 28.9 51 36.5 53.5 47 46.5 59 32 59Z"
        fill={`url(#${gradId})`}
        stroke="#ffffff"
        strokeWidth="3"
        paintOrder="stroke"
      />
      {PAW_BEANS.map((b, i) => (
        <g key={i} transform={`rotate(${b.rotate} ${b.cx} ${b.cy})`}>
          <ellipse cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill={`url(#${gradId})`} stroke="#ffffff" strokeWidth="2.6" paintOrder="stroke" />
          <circle cx={b.cx - 1.6} cy={b.cy - 2.2} r="1.2" fill="#fff" opacity="0.75" />
        </g>
      ))}
    </svg>
  );
}
