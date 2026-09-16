import { Link } from "react-router-dom";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
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
          <Link
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-900"
            to="/login"
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
          </Link>
          <a className="text-xs text-slate-500 transition-colors hover:text-slate-900" href="mailto:help@classy.local">
            Help
          </a>
        </div>

        <div className="mx-auto my-auto w-full max-w-[390px] py-10">{children}</div>

        <div className="text-center text-xs text-slate-400">
          <span>Teacher reviewed</span>
          <span className="mx-2">•</span>
          <span>AI assisted</span>
        </div>
      </section>
    </main>
  );
}
