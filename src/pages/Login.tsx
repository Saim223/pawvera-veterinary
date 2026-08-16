import { useState, type FormEvent } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { GlassBackdrop } from "@/components/ui/GlassBackdrop";

const fieldClasses =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-[border-color,box-shadow] focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(31,74,59,0.1)]";

export default function Login() {
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState<"owner" | "vet">(searchParams.get("as") === "vet" ? "vet" : "owner");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessage("This is a frontend demo — authentication isn't connected yet.");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper-alt px-4 py-32">
      <GlassBackdrop variant="warm" />
      <div className="glass notch-card w-full max-w-md border border-white/50 p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <LogoMark dark size={40} />
          <h1 className="mt-4 font-display text-2xl text-brand-700">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-soft">Log in to manage appointments and consultations.</p>
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

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft">
            Email
            <input type="email" required placeholder="you@example.com" className={fieldClasses} />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink-soft">
            Password
            <input type="password" required placeholder="••••••••" className={fieldClasses} />
          </label>
          <div className="flex justify-end">
            <a href="#reset" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="mt-1 flex items-center justify-center gap-2 rounded-md bg-brand-500 py-3 text-sm font-bold text-paper transition-colors hover:bg-brand-600"
          >
            <LogIn size={16} />
            Log in as {role === "owner" ? "Pet Owner" : "Veterinarian"}
          </button>
          {message && <p className="text-center text-xs text-ink-faint">{message}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          Don't have an account?{" "}
          <Link to={`/register?as=${role}`} className="font-semibold text-brand-600 hover:text-brand-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
