import { Link } from "react-router-dom";
import { useBatchDialog } from "../features/forms/batch-dialog-context";
import { getAssessmentsForClass, mockClasses } from "../features/mock/mockData";

export function ClassesPage() {
  const { openBatchDialog } = useBatchDialog();

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#0b1c30]">Classes</h1>
          <p className="mt-1 text-sm text-[#464554]">Choose a cohort to inspect students, assessments, and review progress.</p>
        </div>
        <button className="w-fit rounded-lg bg-[#4648d4] px-4 py-2 text-sm font-medium text-white shadow-sm" type="button" onClick={() => openBatchDialog("class")}>
          Create class
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {mockClasses.map((classItem) => {
          const assessments = getAssessmentsForClass(classItem.id);
          const needsReview = assessments.reduce((total, assessment) => total + assessment.needsReview, 0);

          return (
            <Link
              className="group rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              key={classItem.id}
              to={`/classes/${classItem.id}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#0b1c30] group-hover:text-[#4648d4]">{classItem.name}</h2>
                  <p className="mt-1 text-xs text-[#464554]">{classItem.students} students • {classItem.subject}</p>
                </div>
                <span className="rounded-full bg-[#e7f8ee] px-3 py-1 text-xs font-medium text-[#059669]">Active</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-[#eff4ff] p-3">
                  <span className="block text-xs text-[#464554]">Assessments</span>
                  <span className="text-xl font-semibold text-[#0b1c30]">{assessments.length}</span>
                </div>
                <div className="rounded-xl bg-[#fffbeb] p-3">
                  <span className="block text-xs text-[#464554]">To review</span>
                  <span className="text-xl font-semibold text-[#0b1c30]">{needsReview}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
