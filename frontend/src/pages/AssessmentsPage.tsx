import { Link } from "react-router-dom";
import { getClassById, mockAssessments } from "../features/mock/mockData";

export function AssessmentsPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#0b1c30]">Assessments</h1>
          <p className="mt-1 text-sm text-[#464554]">Open an assessment, inspect setup, or continue the AI review queue.</p>
        </div>
        <button className="w-fit rounded-lg bg-[#4648d4] px-4 py-2 text-sm font-medium text-white shadow-sm" type="button">
          New assessment
        </button>
      </div>

      <div className="space-y-4">
        {mockAssessments.map((assessment) => {
          const classItem = getClassById(assessment.classId);
          const isComplete = assessment.status === "Complete";

          return (
            <article className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm" key={assessment.id}>
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#4648d4]">{classItem?.name}</p>
                  <h2 className="mt-2 text-xl font-semibold text-[#0b1c30]">{assessment.title}</h2>
                  <p className="mt-1 text-sm text-[#464554]">
                    {assessment.questions} questions • {assessment.totalMarks} marks • {assessment.answersMarked} answers processed
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      isComplete ? "border-[#a7f3d0] bg-[#ecfdf5] text-[#059669]" : "border-[#fde68a] bg-[#fffbeb] text-[#d97706]"
                    }`}
                  >
                    {assessment.status}
                  </span>
                  <Link className="rounded-lg border border-[#e5e7eb] px-3 py-1.5 text-sm font-medium text-[#0b1c30] hover:bg-[#f8fafc]" to={`/assessments/${assessment.id}`}>
                    View setup
                  </Link>
                  <Link className="rounded-lg bg-[#4648d4] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#6063ee]" to={`/assessments/${assessment.id}/marking`}>
                    Continue marking
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
