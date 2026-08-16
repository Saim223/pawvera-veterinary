import { useState, type FormEvent } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { UserPlus, Wallet } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { GlassBackdrop } from "@/components/ui/GlassBackdrop";
import { specializations } from "@/data/doctors";

const fieldClasses =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-[border-color,box-shadow] focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(31,74,59,0.1)]";

export default function Register() {
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState<"owner" | "vet">(searchParams.get("as") === "vet" ? "vet" : "owner");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessage("This is a frontend demo — account creation isn't connected yet.");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper-alt px-4 py-32">
      <GlassBackdrop variant="warm" />
      <div className="glass notch-card w-full max-w-md border border-white/50 p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <LogoMark dark size={40} />
          <h1 className="mt-4 font-display text-2xl text-brand-700">Create your account</h1>
          <p className="mt-1 text-sm text-ink-soft">Join as a pet owner or a veterinary doctor.</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-md bg-paper-alt p-1">
          {(["owner", "vet"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={
                "rounded-md py-2 text-sm font-semibold transition-colors " +
                (role === r ? "bg-brand-500 text-paper" : "text-ink-soft")
              }
            >
              {r === "owner" ? "Pet Owner" : "Veterinarian"}
            </button>
          ))}
        </div>

        {role === "vet" && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-line bg-paper-alt px-4 py-3.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-400/20 text-gold-500">
              <Wallet size={15} />
            </span>
            <p className="text-xs leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">Keep 90% of every consultation fee.</span> Pawvera takes a
              flat 10% platform fee — no monthly cost, no signup fee. You set your own price and hours.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft">
            Full name
            <input required placeholder="Jordan Lee" className={fieldClasses} />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft">
            Email
            <input type="email" required placeholder="you@example.com" className={fieldClasses} />
          </label>

          {role === "vet" && (
            <>
              <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft">
                Specialization
                <select className={fieldClasses} defaultValue={specializations[0]}>
                  {specializations.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft">
                License number
                <input required placeholder="e.g. VET-40218" className={fieldClasses} />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft">
                Consultation fee
                <span className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-ink-faint">$</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    placeholder="55"
                    className={`${fieldClasses} pl-8`}
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ink-faint">
                    / consult
                  </span>
                </span>
              </label>
            </>
          )}

          <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft">
            Password
            <input type="password" required placeholder="••••••••" className={fieldClasses} />
          </label>

          <button
            type="submit"
            className="mt-1 flex items-center justify-center gap-2 rounded-md bg-brand-500 py-3 text-sm font-bold text-paper transition-colors hover:bg-brand-600"
          >
            <UserPlus size={16} />
            Create {role === "owner" ? "Pet Owner" : "Veterinarian"} Account
          </button>
          {message && <p className="text-center text-xs text-ink-faint">{message}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          Already have an account?{" "}
          <Link to={`/login?as=${role}`} className="font-semibold text-brand-600 hover:text-brand-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
