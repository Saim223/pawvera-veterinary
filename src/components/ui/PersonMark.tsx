import type { AvatarPalette } from "@/data/types";

const palettes: Record<AvatarPalette, { bg: string; figure: string; highlight: string }> = {
  brand: { bg: "#DCEAE8", figure: "#123B42", highlight: "#3F7378" },
  accent: { bg: "#FBE2E0", figure: "#C96C65", highlight: "#E98D87" },
  gold: { bg: "#F3EAD8", figure: "#B99C6E", highlight: "#E8D6B5" },
  slate: { bg: "#E3E8E6", figure: "#5D6B6D", highlight: "#8B9799" },
};

interface PersonMarkProps {
  palette?: AvatarPalette;
  size?: number;
  className?: string;
  variant?: "bust" | "portrait";
}

export function PersonMark({ palette = "brand", size = 56, className, variant = "bust" }: PersonMarkProps) {
  const c = palettes[palette];

  if (variant === "portrait") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 240"
        className={className}
        role="img"
        aria-hidden="true"
      >
        <rect width="200" height="240" rx="0" fill={c.bg} />
        <ellipse cx="100" cy="238" rx="78" ry="86" fill={c.figure} />
        <circle cx="100" cy="98" r="52" fill={c.figure} />
        <path d="M52 98a48 48 0 0 1 96 0c0 16-10 24-10 24H62s-10-8-10-24Z" fill={c.highlight} opacity="0.35" />
        <circle cx="100" cy="94" r="52" fill="none" stroke={c.highlight} strokeOpacity="0.4" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role="img" aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill={c.bg} />
      <path d="M18 92c0-19.9 14.3-34 32-34s32 14.1 32 34" fill={c.figure} />
      <circle cx="50" cy="40" r="17" fill={c.figure} />
      <path d="M33 40a17 17 0 0 1 34 0c0 5-3 8-3 8H36s-3-3-3-8Z" fill={c.highlight} opacity="0.4" />
    </svg>
  );
}
