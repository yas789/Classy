import { Link, Navigate, useParams } from "react-router-dom";
import { getAssessmentsForClass, getClassById, mockStudents } from "../features/mock/mockData";

export function ClassDetailPage() {
  const { classId } = useParams();
  const classItem = getClassById(classId);

  if (!classItem) {
    return <Navigate to="/classes" replace />;
  }

  const assessments = getAssessmentsForClass(classItem.id);

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#4648d4]">{classItem.institution}</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#0b1c30]">{classItem.name}</h1>
          <p className="mt-1 text-sm text-[#464554]">{classItem.students} students • {classItem.subject}</p>
        </div>
        {assessments[0] ? (
          <Link className="w-fit rounded-lg bg-[#4648d4] px-4 py-2 text-sm font-medium text-white shadow-sm" to={`/assessments/${assessments[0].id}/marking`}>
            Continue marking
          </Link>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm lg:col-span-7">
          <h2 className="text-lg font-semibold text-[#0b1c30]">Assessments</h2>
          <div className="mt-4 space-y-3">
            {assessments.map((assessment) => (
              <Link className="flex items-center justify-between gap-4 rounded-xl bg-[#f8fafc] p-4 hover:bg-[#eff4ff]" key={assessment.id} to={`/assessments/${assessment.id}`}>
                <div>
                  <h3 className="text-sm font-semibold text-[#0b1c30]">{assessment.title}</h3>
                  <p className="mt-1 text-xs text-[#464554]">{assessment.needsReview} to review • {assessment.averageConfidence}% confidence</p>
                </div>
                <span className="text-[#4648d4]" aria-hidden="true">›</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm lg:col-span-5">
          <h2 className="text-lg font-semibold text-[#0b1c30]">Students</h2>
          <div className="mt-4 space-y-2">
            {mockStudents.map((student) => (
              <div className="flex items-center justify-between rounded-xl border border-[#f1f5f9] px-4 py-3" key={student.id}>
                <span className="text-sm font-medium text-[#0b1c30]">{student.name}</span>
                <span className="font-mono text-xs text-[#464554]">#{student.candidateNumber}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
