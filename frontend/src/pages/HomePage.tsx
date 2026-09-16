import { useState } from "react";

const navItems = [
  { icon: "home", label: "Home" },
  { icon: "assignment", label: "Assessments", active: true },
  { icon: "analytics", label: "Results" },
  { icon: "settings", label: "Settings" },
];

function Icon({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={`select-none text-[18px] leading-none ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export function HomePage() {
  const [showScan, setShowScan] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] antialiased">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col justify-between border-r border-[#c7c4d7]/20 bg-[#1a1a27] p-4 text-white lg:flex">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-1 pt-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4648d4] shadow-sm">
              <Icon>▣</Icon>
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight tracking-tight">
                GradePilot
              </h1>
              <p className="font-mono text-xs text-[#c7c5d5]/80">
                AI Exam Marking
              </p>
            </div>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4648d4] px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#6063ee] active:scale-[0.98]">
            <Icon>+</Icon>
            New Marking Batch
          </button>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition active:scale-[0.99] ${
                  item.active
                    ? "bg-[#4648d4] font-medium text-white"
                    : "text-[#c7c5d5] hover:bg-[#464553]/40 hover:text-white"
                }`}
                href="#"
                key={item.label}
              >
                <Icon>
                  {item.icon === "home"
                    ? "⌂"
                    : item.icon === "assignment"
                      ? "□"
                      : item.icon === "analytics"
                        ? "▥"
                        : "⚙"}
                </Icon>
                <span>{item.label}</span>
                {item.active ? (
                  <span className="ml-auto rounded-full bg-white/20 px-1.5 py-0.5 font-mono text-[10px] text-white">
                    Active
                  </span>
                ) : null}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#464553]/40 pt-4">
          <div className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-[#464553]/30">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e1e0ff] text-sm font-semibold text-[#07006c]">
              MT
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-white">
                Maya Thompson
              </span>
              <span className="text-[11px] text-[#c7c5d5]">Lead Examiner</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 text-[#c7c5d5]">
            <Icon className="text-sm">⌂</Icon>
            <span className="truncate text-[11px]">Northbridge Academy</span>
          </div>
        </div>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-[#c7c4d7]/30 bg-white px-4 lg:left-60 lg:px-6">
        <div className="flex min-w-0 items-center gap-2 text-[11px] font-medium text-[#464554]">
          <span className="hidden transition hover:text-[#0b1c30] sm:inline">
            Northbridge Academy
          </span>
          <span className="hidden text-[#767586] sm:inline">/</span>
          <span className="hidden transition hover:text-[#0b1c30] md:inline">
            Year 10 Biology
          </span>
          <span className="hidden text-[#767586] md:inline">/</span>
          <span className="truncate rounded bg-[#eff4ff] px-2 py-0.5 font-semibold text-[#0b1c30]">
            Cell Biology End of Unit
          </span>
        </div>

        <button className="flex shrink-0 items-center gap-2 rounded-lg bg-[#4648d4] px-3.5 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#6063ee] active:scale-[0.98]">
          <span className="hidden sm:inline">Proceed to AI Marking</span>
          <span className="sm:hidden">Marking</span>
          <Icon>→</Icon>
          <kbd className="ml-1 hidden rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] text-white sm:inline">
            ↵
          </kbd>
        </button>
      </header>

      <main className="min-h-screen bg-[#f8f9ff] px-4 pb-28 pt-24 lg:ml-60 lg:px-8 lg:pt-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-5">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 font-mono text-xs text-[#5e5d6b]">
                  <span className="rounded bg-[#e5eeff] px-2 py-0.5 font-semibold text-[#0b1c30]">
                    Liam Vance (#8042)
                  </span>
                  <span>•</span>
                  <span>Question 3.2</span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#0b1c30]">
                  Candidate Response Digitisation
                </h2>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#6ffbbe]/40 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#002113]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#006c49]" />
                98.4% Confidence
              </span>
            </div>

            <section className="flex flex-col overflow-hidden rounded-xl border border-[#c7c4d7]/40 bg-white shadow-sm transition focus-within:border-[#4648d4] focus-within:ring-2 focus-within:ring-[#4648d4]/20">
              <div className="flex flex-col gap-2 border-b border-[#c7c4d7]/30 bg-[#eff4ff] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-[11px] font-medium text-[#464554]">
                  <Icon className="text-[#4648d4]">✎</Icon>
                  <span className="text-[#0b1c30]">
                    Digitised Interpretation
                  </span>
                  <span className="hidden font-mono text-[11px] text-[#5e5d6b] sm:inline">
                    (Click anywhere below to edit)
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px] text-[#5e5d6b]">
                  <span>38 words</span>
                  <span>•</span>
                  <span>238 characters</span>
                </div>
              </div>

              <div className="p-6">
                <textarea
                  className="min-h-[180px] w-full resize-none border-0 bg-transparent p-0 text-[15px] leading-relaxed text-[#0b1c30] outline-none selection:bg-[#e1e0ff] focus:ring-0"
                  defaultValue="Water passes from a higher water potential to a lower water potential through tiny microscopic pores in the membrane. This process is passive because it does not require chemical energy (ATP) to take place down the concentration gradient."
                  placeholder="Enter transcribed student response..."
                  spellCheck={false}
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-[#c7c4d7]/30 bg-[#f8f9ff] px-5 py-3 text-xs font-medium text-[#464554] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-1.5 text-[#5e5d6b]">
                  <Icon className="text-[#006c49]">✓</Icon>
                  <span>
                    Auto-corrected 1 strike-through phrase from original scan
                  </span>
                </div>
                <button
                  className="flex items-center gap-1 font-medium text-[#4648d4] transition hover:text-[#2f2ebe]"
                  type="button"
                  onClick={() => setShowScan((current) => !current)}
                >
                  <Icon>▧</Icon>
                  <span>Toggle Original Scan</span>
                </button>
              </div>
            </section>

            {showScan ? (
              <section className="rounded-xl border border-[#c7c4d7]/30 bg-white p-5 shadow-sm">
                <div className="mb-3 flex flex-col gap-2 text-xs font-medium text-[#5e5d6b] sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-1.5 text-[#0b1c30]">
                    <Icon>▤</Icon>
                    Original Exam Paper Crop (LIAM VANCE - Q3)
                  </span>
                  <span className="font-mono text-[11px]">
                    Blue ballpoint ink • 0.38mm
                  </span>
                </div>
                <div className="relative select-none overflow-hidden rounded-lg border border-[#c7c4d7]/60 bg-white p-5 [background-image:repeating-linear-gradient(transparent,transparent_31px,#e2e8f0_31px,#e2e8f0_32px)] [background-position:0_16px]">
                  <div className="font-serif text-2xl leading-8 tracking-wide text-slate-900">
                    <p>
                      Water passes from a{" "}
                      <span className="rounded bg-[#e1e0ff]/70 px-1">
                        higher water potential
                      </span>{" "}
                      to a{" "}
                      <span className="rounded bg-[#e1e0ff]/70 px-1">
                        lower water potential
                      </span>{" "}
                      through tiny microscopic pores in the membrane.
                    </p>
                    <p className="text-slate-400 line-through decoration-[#ba1a1a] decoration-2">
                      Active transport moves the salt molecules first
                    </p>
                    <p>
                      This process is passive because it does not require
                      chemical energy (ATP) to take place down the concentration
                      gradient.
                    </p>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-30 flex min-h-20 items-center justify-between border-t border-[#c7c4d7]/30 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-md lg:left-60 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button className="flex items-center justify-center gap-2 rounded-lg border border-[#c7c4d7]/40 bg-white px-4 py-2 text-sm text-[#0b1c30] transition hover:bg-[#e5eeff] active:scale-[0.98]">
            <Icon>←</Icon>
            <span>Back to Segmentation</span>
            <kbd className="hidden rounded bg-[#dce9ff] px-2 py-0.5 font-mono text-[11px] text-[#5e5d6b] sm:inline">
              Esc
            </kbd>
          </button>
          <button className="flex items-center justify-center gap-2.5 rounded-lg bg-[#4648d4] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#6063ee] active:scale-[0.98]">
            <span>Approve Interpretation & Proceed to AI Marking</span>
            <Icon>→</Icon>
            <kbd className="hidden rounded bg-white/20 px-2 py-0.5 font-mono text-[11px] text-white sm:inline">
              ↵
            </kbd>
          </button>
        </div>
      </footer>
    </div>
  );
}
