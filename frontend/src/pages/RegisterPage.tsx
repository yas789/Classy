import { FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
import { AuthLayout } from "../layouts/AuthLayout";

export function RegisterPage() {
  const { isLoading, session, signIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && session) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!name.trim()) {
        throw new Error("Your name is required.");
      }

      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to register.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <div className="mb-7">
        <h2 className="text-2xl font-semibold tracking-tight text-[#0b1c30]">Create your Classy account</h2>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span>Already registered?</span>
          <Link className="font-medium text-[#4648d4] hover:underline" to="/login">
            Sign in
          </Link>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          type="button"
        >
          <svg aria-hidden="true" className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          <span className="truncate">Google</span>
        </button>
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          type="button"
        >
          <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0" viewBox="0 0 23 23">
            <path d="M1 1h10v10H1z" fill="#f35325" />
            <path d="M12 1h10v10H12z" fill="#81bc06" />
            <path d="M1 12h10v10H1z" fill="#05a6f0" />
            <path d="M12 12h10v10H12z" fill="#ffba08" />
          </svg>
          <span className="truncate">Microsoft</span>
        </button>
      </div>

      <div className="relative mb-6 flex items-center justify-center">
        <div className="w-full border-t border-slate-200" />
        <span className="absolute bg-white px-3 text-xs text-slate-400">or create with email</span>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700" htmlFor="name">
            Full name
          </label>
          <input
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#4648d4] focus:ring-1 focus:ring-[#4648d4]"
            id="name"
            placeholder="Alex Teacher"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700" htmlFor="email">
            Institutional email
          </label>
          <input
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#4648d4] focus:ring-1 focus:ring-[#4648d4]"
            id="email"
            placeholder="name@school.edu"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700" htmlFor="password">
            Password
          </label>
          <input
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#4648d4] focus:ring-1 focus:ring-[#4648d4]"
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <label className="flex cursor-pointer select-none items-start gap-2 pt-1">
          <input className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#4648d4] focus:ring-[#4648d4]/20" required type="checkbox" />
          <span className="text-xs leading-5 text-slate-600">
            I agree to use Classy for teacher-reviewed assessment workflows.
          </span>
        </label>

        {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

        <button
          className="mt-2 h-10 w-full rounded-lg bg-[#4648d4] text-sm font-medium text-white shadow-sm transition-all hover:bg-[#3b3dbf] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#c0c1ff]"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}
