import { FormEvent, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

type LocationState = {
  from?: { pathname?: string };
};

export function LoginPage() {
  const { isLoading, session, signIn } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as LocationState | null)?.from?.pathname ?? "/";

  if (!isLoading && session) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#f8f9ff] text-[#0b1c30] antialiased lg:flex">
      <section className="relative flex min-h-[42vh] w-full flex-col justify-between overflow-hidden border-b border-white/10 bg-[#0f111a] p-8 text-white sm:p-12 lg:min-h-screen lg:w-[46%] lg:border-b-0 lg:border-r lg:p-16 xl:w-[42%] xl:p-20">
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#4648d4]/15 blur-[100px]" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4648d4] text-white shadow-sm ring-1 ring-white/10">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path
                d="M8 7h8M8 11h8M8 15h5M7 3h10a2 2 0 0 1 2 2v14l-3-2-2 2-2-2-2 2-2-2-3 2V5a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-lg font-semibold tracking-tight">Classy</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Operational
            </span>
          </div>
        </div>

        <div className="relative z-10 my-16 max-w-md space-y-4 lg:my-0">
          <h1 className="text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[40px]">
            Exam evaluation, refined.
          </h1>
          <p className="text-[15px] leading-6 text-white/60">
            Surgical AI accuracy and rubric traceability for teacher-led marking.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-8 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <svg aria-hidden="true" className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24">
              <path
                d="M4 21V9l8-5 8 5v12M9 21v-6h6v6M8 11h.01M12 11h.01M16 11h.01"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
            <span>Built for teachers and institutions</span>
          </div>
          <span>v0.1</span>
        </div>
      </section>

      <section className="flex w-full flex-col justify-between bg-white p-6 sm:p-12 lg:w-[54%] lg:p-16 xl:w-[58%] xl:p-24">
        <div className="flex items-center justify-between">
          <a
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-900"
            href="/"
          >
            <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path
                d="m15 18-6-6 6-6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
            <span>Institutional Portal</span>
          </a>
          <a className="text-xs text-slate-500 transition-colors hover:text-slate-900" href="mailto:help@classy.local">
            Help
          </a>
        </div>

        <div className="mx-auto my-auto w-full max-w-[390px] py-10">
          <div className="mb-7">
            <h2 className="text-2xl font-semibold tracking-tight text-[#0b1c30]">Sign in to Classy</h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span>Do not have an account?</span>
              <button className="font-medium text-[#4648d4] hover:underline" type="button">
                Register
              </button>
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
            <span className="absolute bg-white px-3 text-xs text-slate-400">or institutional email</span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700" htmlFor="email">
                Email address
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
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-xs font-medium text-slate-700" htmlFor="password">
                  Password
                </label>
                <button className="text-xs text-[#4648d4] hover:underline" type="button">
                  Forgot password?
                </button>
              </div>
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

            <label className="flex cursor-pointer select-none items-center gap-2 pt-1">
              <input
                className="h-4 w-4 rounded border-slate-300 text-[#4648d4] focus:ring-[#4648d4]/20"
                type="checkbox"
              />
              <span className="text-xs text-slate-600">Remember me</span>
            </label>

            {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

            <button
              className="mt-2 h-10 w-full rounded-lg bg-[#4648d4] text-sm font-medium text-white shadow-sm transition-all hover:bg-[#3b3dbf] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#c0c1ff]"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <div className="text-center text-xs text-slate-400">
          <span>Teacher reviewed</span>
          <span className="mx-2">•</span>
          <span>AI assisted</span>
        </div>
      </section>
    </main>
  );
}
