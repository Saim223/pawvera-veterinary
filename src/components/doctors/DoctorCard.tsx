import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock3, MapPin, Stethoscope } from "lucide-react";
import { clsx } from "clsx";
import type { Doctor } from "@/data/types";
import { RatingStars } from "@/components/ui/RatingStars";
import { TiltCard } from "@/components/ui/TiltCard";
import { LinkButton } from "@/components/ui/Button";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Popup: a quick-look preview of the bio. Kept OUTSIDE TiltCard's 3D
          transform context — a child of a rotateX/rotateY'd element inherits
          that rotation, and rotated text renders soft/anti-aliased instead of
          crisp, which is exactly the "blur on hover" this avoids. Anchored
          with bottom-full so it always grows upward from the card's top edge;
          a long bio can never overlap the avatar/name underneath. */}
      <div
        className={clsx(
          "pointer-events-none absolute inset-x-4 bottom-full z-20 mb-3 origin-bottom transition-all duration-300 ease-out",
          hovered ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0",
        )}
      >
        <div className="notch-card-sm relative bg-brand-700 px-4 py-3 text-xs leading-relaxed text-paper shadow-lg">
          {doctor.bio}
          <span className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1.5 rotate-45 bg-brand-700" aria-hidden="true" />
        </div>
      </div>

      {/* max=0 disables the 3D tilt entirely — any rotateX/rotateY tilt on
          this card renders its content (photo, text) at an angle, which
          browsers anti-alias as soft/blurry. Keeping just the hover scale. */}
      <TiltCard max={0} scale={1.02} className="h-full">
        <article className="notch-card group relative flex h-full flex-col gap-5 border border-line bg-surface p-6 shadow-xs transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-accent-400 hover:shadow-lg">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(120% 80% at 15% 0%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%)" }}
            />
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  width={58}
                  height={58}
                  className="h-[58px] w-[58px] rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 -right-1 flex h-5 w-5 scale-75 items-center justify-center rounded-full border-2 border-surface bg-brand-500 text-paper opacity-0 shadow-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                >
                  <Stethoscope size={10} strokeWidth={2.4} />
                </span>
              </div>
              <div>
                <h3 className="font-display text-lg leading-tight text-brand-700">{doctor.name}</h3>
                <p className="text-sm text-ink-soft">{doctor.credentials}</p>
              </div>
            </div>
            {doctor.availableToday && (
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[0.68rem] font-bold text-brand-600">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
                </span>
                Today
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-soft">
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-100 px-2.5 py-1 text-xs font-semibold text-accent-600">
              {doctor.specialization}
            </span>
            <span>{doctor.experienceYears} yrs exp</span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-ink-soft">
            <MapPin size={14} className="shrink-0 text-ink-faint" />
            <span className="truncate">{doctor.hospital} · {doctor.city}</span>
          </div>

          <div className="flex items-center border-t border-line pt-4">
            <RatingStars rating={doctor.rating} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-display text-xl font-medium text-brand-700">${doctor.fee}</span>
              <span className="text-sm text-ink-soft"> / consult</span>
            </div>
            <span className="flex items-center gap-1 text-xs text-ink-faint">
              <Clock3 size={12} />
              {doctor.nextAvailable}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-3">
            <Link
              to={`/doctors/${doctor.slug}`}
              className="flex-1 rounded-md border border-line px-4 py-2.5 text-center text-sm font-semibold text-brand-700 transition-colors hover:border-brand-500 hover:bg-brand-50"
            >
              View Profile
            </Link>
            <LinkButton href={`/appointments?doctor=${doctor.slug}`} variant="primary" size="sm" className="flex-1">
              Book
            </LinkButton>
          </div>
        </article>
      </TiltCard>
    </div>
  );
}
