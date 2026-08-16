import { Link } from "react-router-dom";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent-500">404</p>
      <h1 className="mt-4 font-display text-3xl text-brand-700 sm:text-4xl">This page wandered off.</h1>
      <p className="mt-3 max-w-sm text-ink-soft">
        The page you're looking for doesn't exist. Let's get you back to something useful.
      </p>
      <div className="mt-8 flex gap-4">
        <LinkButton href="/" variant="primary">
          Back home
        </LinkButton>
        <Link
          to="/doctors"
          className="inline-flex items-center px-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Find a veterinarian →
        </Link>
      </div>
    </div>
  );
}
