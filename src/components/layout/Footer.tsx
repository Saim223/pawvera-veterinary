import { Link } from "react-router-dom";
import { InstagramIcon, XIcon, FacebookIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { LogoMark } from "@/components/ui/Logo";

const columns: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Platform",
    links: [
      { label: "Find Doctors", to: "/doctors" },
      { label: "Book Appointment", to: "/appointments" },
      { label: "Online Consultation", to: "/consultation" },
      { label: "Pet Health", to: "/pet-health" },
    ],
  },
  {
    heading: "For Doctors",
    links: [
      { label: "Register", to: "/register?as=vet" },
      { label: "Doctor Login", to: "/login?as=vet" },
      { label: "Doctor Dashboard", to: "/#doctor-dashboard" },
      { label: "Resources", to: "/pet-health" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/about#contact" },
      { label: "Careers", to: "/about#careers" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
  {
    heading: "Emergency",
    links: [
      { label: "Emergency Care", to: "/emergency" },
      { label: "Support", to: "/about#contact" },
    ],
  },
];

const socials = [
  { label: "Instagram", icon: InstagramIcon },
  { label: "X (Twitter)", icon: XIcon },
  { label: "Facebook", icon: FacebookIcon },
  { label: "LinkedIn", icon: LinkedInIcon },
];

export function Footer() {
  return (
    <footer className="bg-brand-900 text-paper">
      <div className="container-page grid gap-8 py-10 sm:py-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Pawvera home">
            <LogoMark />
            <span className="font-display text-lg font-medium text-paper">Pawvera</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">
            The network connecting pet owners with verified veterinary doctors — for booked visits,
            online consults, and everything in between.
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            {socials.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#top"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-colors hover:border-paper/40 hover:text-paper"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-paper/45">{col.heading}</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-paper/75 transition-colors hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Pawvera, Inc. All rights reserved.</span>
          <span>Online consultations are not a substitute for in-person emergency care.</span>
        </div>
      </div>
    </footer>
  );
}
