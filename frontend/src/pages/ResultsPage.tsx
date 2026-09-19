import { getStudentById, mockAssessments } from "../features/mock/mockData";

const assessment = mockAssessments[0];

export function ResultsPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#0b1c30]">Results</h1>
          <p className="mt-1 text-sm text-[#464554]">Review confirmed marks and export-ready assessment summaries.</p>
        </div>
        <button className="w-fit rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-[#0b1c30] shadow-sm" type="button">
          Export CSV
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <span className="text-xs font-medium text-[#464554]">Average confidence</span>
          <p className="mt-2 text-3xl font-semibold text-[#0b1c30]">{assessment.averageConfidence}%</p>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <span className="text-xs font-medium text-[#464554]">Needs review</span>
          <p className="mt-2 text-3xl font-semibold text-[#0b1c30]">{assessment.needsReview}</p>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <span className="text-xs font-medium text-[#464554]">Confirmed answers</span>
          <p className="mt-2 text-3xl font-semibold text-[#0b1c30]">{assessment.answers.filter((answer) => answer.markConfirmed).length}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
        <div className="border-b border-[#f1f5f9] px-5 py-4">
          <h2 className="text-lg font-semibold text-[#0b1c30]">{assessment.title}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#f1f5f9] text-sm">
            <thead className="bg-[#f8fafc] text-left text-xs uppercase tracking-[0.08em] text-[#464554]">
              <tr>
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Mark</th>
                <th className="px-5 py-3 font-medium">Confidence</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {assessment.answers.map((answer) => {
                const student = getStudentById(answer.studentId);

                return (
                  <tr key={answer.id}>
                    <td className="px-5 py-4 font-medium text-[#0b1c30]">{student?.name}</td>
                    <td className="px-5 py-4 text-[#464554]">{answer.overrideMark ?? answer.proposedMark}/{answer.maxMark}</td>
                    <td className="px-5 py-4 text-[#464554]">{answer.segmentationConfidence}%</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${answer.markConfirmed ? "bg-[#ecfdf5] text-[#059669]" : "bg-[#fffbeb] text-[#d97706]"}`}>
                        {answer.markConfirmed ? "Confirmed" : "Needs review"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
