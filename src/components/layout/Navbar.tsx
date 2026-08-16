import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, ChevronDown, UserRound, LogIn, UserPlus } from "lucide-react";
import { clsx } from "clsx";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Find Doctors", to: "/doctors" },
  { label: "Appointments", to: "/appointments" },
  { label: "Pet Health", to: "/pet-health" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "About", to: "/about" },
];

export function Navbar({ transparentAtTop = false }: { transparentAtTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [shrunk, setShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const solid = !transparentAtTop || scrolled;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      setShrunk(window.scrollY > 140);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!accountOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAccountOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [accountOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,padding] duration-300 ease-out",
        solid && shrunk && "glass border-b border-line py-2",
        solid && !shrunk && "glass border-b border-line py-3",
        !solid && "border-b border-transparent bg-transparent py-5",
      )}
    >
      <div className="container-page flex items-center justify-between">
        <Logo dark={solid} className={clsx("origin-left transition-transform duration-300", shrunk && "scale-90")} />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = !link.to.includes("#") && link.to === location.pathname;
            return (
              <Link
                key={link.label}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "text-sm transition-colors",
                  active ? "font-bold" : "font-semibold",
                  active
                    ? solid
                      ? "text-brand-600"
                      : "text-paper"
                    : solid
                      ? "text-ink-soft hover:text-brand-600"
                      : "text-paper/85 hover:text-paper",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center lg:flex">
          <div className="relative" ref={accountRef}>
            <button
              type="button"
              onClick={() => setAccountOpen((v) => !v)}
              className={clsx(
                "flex items-center gap-1.5 rounded-md bg-[linear-gradient(180deg,#ee9a94_0%,#e98d87_55%,#d67872_100%)] px-3.5 py-2 text-sm font-semibold text-brand-700 shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_10px_24px_-8px_rgba(233,141,135,0.55)] transition-[filter] hover:brightness-[1.04]",
                accountOpen && "brightness-[1.04]",
              )}
              aria-haspopup="menu"
              aria-expanded={accountOpen}
              aria-controls="account-menu"
            >
              <UserRound size={16} strokeWidth={2} />
              Account
              <ChevronDown size={14} className={clsx("transition-transform duration-200", accountOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {accountOpen && (
                <motion.div
                  id="account-menu"
                  role="menu"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.22, 0.8, 0.28, 1] }}
                  className="absolute right-0 top-full mt-2 w-60 origin-top-right rounded-md border border-line bg-surface p-1.5 shadow-lg"
                >
                  <a
                    href="tel:+18005550142"
                    role="menuitem"
                    className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-600"
                  >
                    <Phone size={15} strokeWidth={2} className="text-accent-500" />
                    Emergency Call
                  </a>
                  <div className="my-1 h-px bg-line" />
                  <Link
                    to="/login"
                    role="menuitem"
                    className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-600"
                  >
                    <LogIn size={15} strokeWidth={2} />
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    role="menuitem"
                    className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-600"
                  >
                    <UserPlus size={15} strokeWidth={2} />
                    Register
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          type="button"
          className={clsx(
            "inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
            solid ? "text-brand-700" : "text-paper",
          )}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 0.8, 0.28, 1] }}
            className="glass overflow-hidden border-t border-line lg:hidden"
          >
            <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
              {navLinks.map((link) => {
                const active = !link.to.includes("#") && link.to === location.pathname;
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "rounded-xl px-3 py-3 text-[0.95rem] text-ink hover:bg-brand-50",
                      active ? "bg-brand-50 font-bold text-brand-600" : "font-semibold",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-2 flex flex-col gap-3 border-t border-line pt-4">
                <a
                  href="tel:+18005550142"
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-ink-soft"
                >
                  <Phone size={15} strokeWidth={2} className="text-accent-500" />
                  Emergency Call
                </a>
                <Link to="/login" className="rounded-xl px-3 py-2 text-sm font-semibold text-ink-soft">
                  Log in
                </Link>
                <LinkButton href="/register" variant="outline" size="md" className="w-full">
                  Register
                </LinkButton>
                <LinkButton href="/appointments" variant="accent" size="md" className="w-full">
                  Book Appointment
                </LinkButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
