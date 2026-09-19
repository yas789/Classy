import { Link } from "react-router-dom";
import { mockAssessments, mockTeacher } from "../features/mock/mockData";

const activeAssessment = mockAssessments[0];

function StatusBadge({ label }: { label: string }) {
  const isComplete = label === "Complete";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
        isComplete ? "border-[#a7f3d0] bg-[#ecfdf5] text-[#059669]" : "border-[#fde68a] bg-[#fffbeb] text-[#d97706]"
      }`}
    >
      {label}
    </span>
  );
}

export function HomePage() {
  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#0b1c30]">Good morning, Maya</h1>
          <p className="mt-1 text-[15px] leading-6 text-[#464554]">
            AI has marked 94% of this week's answers. {activeAssessment.needsReview} need your judgement.
          </p>
        </div>
        <Link
          className="flex h-9 w-fit items-center gap-1.5 rounded-lg bg-[#4648d4] px-4 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#6063ee] active:scale-[0.98]"
          to="/classes"
        >
          <span aria-hidden="true">＋</span>
          <span>Create class</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[
          ["Answers marked", "1,284", "+18% this week", "green"],
          ["Needs review", String(activeAssessment.needsReview), "Low confidence", "amber"],
          ["Teacher time saved", "9.6h", "This week", "green"],
        ].map(([label, value, chip, tone]) => (
          <div className="flex flex-col justify-between rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm" key={label}>
            <div className="flex items-center justify-between text-[#5e5d6b]">
              <span className="text-[11px] font-medium uppercase tracking-[0.08em]">{label}</span>
              <span className="text-[#c7c4d7]" aria-hidden="true">●</span>
            </div>
            <div className="my-3 text-[34px] font-semibold leading-tight tracking-tight text-[#0b1c30]">{value}</div>
            <span
              className={`w-fit rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                tone === "green"
                  ? "border-[#a7f3d0] bg-[#ecfdf5] text-[#059669]"
                  : "border-[#fde68a] bg-[#fffbeb] text-[#d97706]"
              }`}
            >
              {chip}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-8">
          <section className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] px-6 py-4">
              <h2 className="text-lg font-semibold tracking-tight text-[#0b1c30]">Recent work</h2>
              <div className="flex items-center gap-2 text-[11px] text-[#5e5d6b]">
                <span>Cohort:</span>
                <span className="rounded bg-[#eff4ff] px-2 py-0.5 font-semibold text-[#0b1c30]">All active</span>
              </div>
            </div>
            <div className="divide-y divide-[#f1f5f9]">
              {mockAssessments.map((assessment) => (
                <Link
                  className="group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-[#f8fafc] sm:px-6"
                  key={assessment.id}
                  to={`/assessments/${assessment.id}`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-[#0b1c30] transition-colors group-hover:text-[#4648d4]">
                      {assessment.title}
                    </span>
                    <span className="text-xs text-[#464554]">
                      {assessment.subject} • {assessment.totalMarks} marks • {assessment.questions} questions
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge label={assessment.needsReview ? `${assessment.needsReview} to review` : "Complete"} />
                    <span className="text-[#c7c4d7] transition-colors group-hover:text-[#4648d4]" aria-hidden="true">›</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="flex flex-col justify-between gap-4 rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2 className="text-sm font-semibold text-[#0b1c30]">Help us improve Classy</h2>
              <p className="text-xs text-[#464554]">Tell us how the latest AI explanations worked for your marking.</p>
            </div>
            <button className="w-fit rounded-lg border border-[#e5e7eb] px-3.5 py-1.5 text-sm font-medium text-[#0b1c30] transition-colors hover:bg-[#f8fafc]" type="button">
              Share feedback
            </button>
          </section>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-4">
          <section className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5f3ff] text-[#4648d4]">
              ✦
            </div>
            <h2 className="mb-2 text-lg font-semibold tracking-tight text-[#0b1c30]">Review what matters</h2>
            <p className="mb-6 text-sm leading-5 text-[#464554]">
              Classy has finished routine marking. Start with {activeAssessment.needsReview} answers where context or judgement is needed.
            </p>
            <Link
              className="mb-3 block w-full rounded-lg bg-[#4648d4] px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:bg-[#6063ee] active:scale-[0.98]"
              to={`/assessments/${activeAssessment.id}/marking`}
            >
              Open review queue
            </Link>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#5e5d6b]">
              <span aria-hidden="true">◷</span>
              <span>Estimated time: ~14 mins</span>
            </div>
          </section>

          <section className="flex flex-col gap-3 rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
              <span className="text-sm font-semibold text-[#0b1c30]">Queue status</span>
              <span className="font-mono text-[11px] text-[#4648d4]">Live sync</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="block text-sm font-medium text-[#0b1c30]">{activeAssessment.title}</span>
                <span className="text-xs text-[#5e5d6b]">{mockTeacher.institution}</span>
              </div>
              <span className="font-mono text-xs font-medium text-[#d97706]">{activeAssessment.due}</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#f8fafc] pt-3">
              <div>
                <span className="block text-sm font-medium text-[#0b1c30]">Forces and Motion</span>
                <span className="text-xs text-[#5e5d6b]">100% verified</span>
              </div>
              <span className="font-mono text-xs font-medium text-[#059669]">Completed</span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
