import { useParams } from "react-router-dom";
import { ArrowRight, Languages, MapPin, Clock3, Stethoscope } from "lucide-react";
import { doctors } from "@/data/doctors";
import { RatingStars } from "@/components/ui/RatingStars";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import NotFound from "./NotFound";

export default function DoctorProfile() {
  const { slug } = useParams();
  const doctor = doctors.find((d) => d.slug === slug);

  if (!doctor) return <NotFound />;

  return (
    <>
      <section className="bg-brand-900 pb-16 pt-32 text-paper sm:pb-20 sm:pt-40">
        <div className="container-page flex flex-col items-center gap-8 text-center sm:flex-row sm:items-end sm:text-left">
          <div className="overflow-hidden rounded-card bg-brand-700">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="aspect-[5/6] w-[140px] object-cover"
            />
          </div>
          <div>
            {doctor.availableToday && (
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 px-3 py-1 text-xs font-bold text-brand-100">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-300" />
                </span>
                Available today
              </span>
            )}
            <h1 className="font-display text-3xl text-paper sm:text-4xl">{doctor.name}</h1>
            <p className="mt-1 text-paper/60">{doctor.credentials}</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-paper/75 sm:justify-start">
              <RatingStars rating={doctor.rating} />
              <span>{doctor.reviewCount} reviews</span>
              <span className="flex items-center gap-1">
                <MapPin size={13} /> {doctor.city}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal direction="left" className="flex flex-col gap-10">
            <div>
              <h2 className="font-display text-xl text-brand-700">About</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{doctor.bio}</p>
            </div>

            <div>
              <h2 className="font-display text-xl text-brand-700">Focus areas</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {doctor.focusAreas.map((area) => (
                  <span key={area} className="rounded-full bg-accent-100 px-3 py-1.5 text-sm font-medium text-accent-600">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl text-brand-700">Details</h2>
              <ul className="mt-3 flex flex-col gap-3 text-sm text-ink-soft">
                <li className="flex items-center gap-2.5">
                  <Stethoscope size={15} className="text-brand-500" />
                  {doctor.experienceYears} years of experience · {doctor.hospital}
                </li>
                <li className="flex items-center gap-2.5">
                  <Languages size={15} className="text-brand-500" />
                  Speaks {doctor.languages.join(" & ")}
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock3 size={15} className="text-brand-500" />
                  Next available: {doctor.nextAvailable}
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="notch-card sticky top-28 border border-line bg-surface p-7">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-ink-faint">Consultation fee</p>
              <p className="mt-2 font-display text-3xl text-brand-700">
                ${doctor.fee}
                <span className="text-base font-normal text-ink-soft"> / visit</span>
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {doctor.consultationTypes.map((type) => (
                  <span key={type} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-600">
                    {type}
                  </span>
                ))}
              </div>
              <LinkButton
                href={`/appointments?doctor=${doctor.slug}`}
                variant="primary"
                size="md"
                icon={<ArrowRight size={16} />}
                className="mt-6 w-full justify-center"
              >
                Book Appointment
              </LinkButton>
              {doctor.consultationTypes.includes("Video consult") && (
                <LinkButton
                  href="/consultation"
                  variant="outline"
                  size="md"
                  className="mt-3 w-full justify-center"
                >
                  Start Video Consult
                </LinkButton>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
