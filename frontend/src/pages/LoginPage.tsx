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
    <main className="grid min-h-screen bg-slate-950 px-6 py-10 text-white lg:grid-cols-2">
      <section className="flex items-center justify-center">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-300">Classy</p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            AI-assisted marking, reviewed by teachers.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Sign in to access the teacher workspace. This first build focuses on the
            authenticated shell before the marking workflow is added.
          </p>
        </div>
      </section>

      <section className="mt-10 flex items-center justify-center lg:mt-0">
        <form
          className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 text-slate-950 shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold">Teacher login</h2>
          <p className="mt-2 text-sm text-slate-500">
            Temporary local login. Supabase Auth will be connected later.
          </p>

          <label className="mt-8 block text-sm font-medium text-slate-700" htmlFor="email">
            Email
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label className="mt-5 block text-sm font-medium text-slate-700" htmlFor="password">
            Password
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error ? <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

          <button
            className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
