import { Link, Navigate, useParams } from "react-router-dom";
import { getAssessmentById, getClassById } from "../features/mock/mockData";

export function AssessmentDetailPage() {
  const { assessmentId } = useParams();
  const assessment = getAssessmentById(assessmentId);

  if (!assessment) {
    return <Navigate to="/assessments" replace />;
  }

  const classItem = getClassById(assessment.classId);

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#4648d4]">{classItem?.name}</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#0b1c30]">{assessment.title}</h1>
          <p className="mt-1 text-sm text-[#464554]">{assessment.questions} questions • {assessment.totalMarks} marks • {assessment.status}</p>
        </div>
        <Link className="w-fit rounded-lg bg-[#4648d4] px-4 py-2 text-sm font-medium text-white shadow-sm" to={`/assessments/${assessment.id}/marking`}>
          Start review queue
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm lg:col-span-7">
          <h2 className="text-lg font-semibold text-[#0b1c30]">Question preview</h2>
          <div className="mt-4 rounded-xl bg-[#f8fafc] p-4">
            <p className="text-sm font-medium text-[#0b1c30]">Question 1</p>
            <p className="mt-2 text-sm leading-6 text-[#464554]">{assessment.question}</p>
          </div>
          <h3 className="mt-5 text-sm font-semibold text-[#0b1c30]">Mark scheme</h3>
          <ol className="mt-3 space-y-2">
            {assessment.markScheme.map((point, index) => (
              <li className="rounded-xl border border-[#f1f5f9] px-4 py-3 text-sm text-[#464554]" key={point}>
                <span className="font-semibold text-[#0b1c30]">{index + 1} mark:</span> {point}
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm lg:col-span-5">
          <h2 className="text-lg font-semibold text-[#0b1c30]">Review progress</h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl bg-[#eff4ff] p-4">
              <span className="text-xs text-[#464554]">Answers processed</span>
              <p className="mt-1 text-2xl font-semibold text-[#0b1c30]">{assessment.answersMarked}</p>
            </div>
            <div className="rounded-xl bg-[#fffbeb] p-4">
              <span className="text-xs text-[#464554]">Needs teacher review</span>
              <p className="mt-1 text-2xl font-semibold text-[#0b1c30]">{assessment.needsReview}</p>
            </div>
            <div className="rounded-xl bg-[#ecfdf5] p-4">
              <span className="text-xs text-[#464554]">Average confidence</span>
              <p className="mt-1 text-2xl font-semibold text-[#0b1c30]">{assessment.averageConfidence}%</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
