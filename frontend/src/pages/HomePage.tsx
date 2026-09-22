import { Link } from "react-router-dom";
import { ChevronRight, CirclePlus, Clock3, ClipboardCheck, Sparkles, TimerReset, TriangleAlert } from "lucide-react";
import { MetricCard } from "@/components/app/MetricCard";
import { PageHeader } from "@/components/app/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useBatchDialog } from "../features/forms/batch-dialog-context";
import { mockAssessments, mockTeacher } from "../features/mock/mockData";

const activeAssessment = mockAssessments[0];

function StatusBadge({ label }: { label: string }) {
  const isComplete = label === "Complete";

  return <Badge variant={isComplete ? "success" : "warning"}>{label}</Badge>;
}

export function HomePage() {
  const { openBatchDialog } = useBatchDialog();

  return (
    <>
      <PageHeader
        title="Good morning, Maya"
        description={`AI has marked 94% of this week's answers. ${activeAssessment.needsReview} need your judgement.`}
        action={
          <button
            className="flex h-9 w-fit items-center gap-1.5 rounded-lg bg-[#4648d4] px-4 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#6063ee] active:scale-[0.98]"
            type="button"
            onClick={() => openBatchDialog("class")}
          >
            <CirclePlus className="h-4 w-4" aria-hidden="true" />
            <span>Create class</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <MetricCard icon={ClipboardCheck} label="Answers marked" value="1,284" chip="+18% this week" tone="success" />
        <MetricCard icon={TriangleAlert} label="Needs review" value={String(activeAssessment.needsReview)} chip="Low confidence" tone="warning" />
        <MetricCard icon={TimerReset} label="Teacher time saved" value="9.6h" chip="This week" tone="success" />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-8">
          <Card className="overflow-hidden">
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
                    <ChevronRight className="h-4 w-4 text-[#c7c4d7] transition-colors group-hover:text-[#4648d4]" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2 className="text-sm font-semibold text-[#0b1c30]">Help us improve Classy</h2>
              <p className="text-xs text-[#464554]">Tell us how the latest AI explanations worked for your marking.</p>
            </div>
            <button className="w-fit rounded-lg border border-[#e5e7eb] px-3.5 py-1.5 text-sm font-medium text-[#0b1c30] transition-colors hover:bg-[#f8fafc]" type="button">
              Share feedback
            </button>
          </Card>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-4">
          <Card className="p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5f3ff] text-[#4648d4]">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
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
              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Estimated time: ~14 mins</span>
            </div>
          </Card>

          <Card className="flex flex-col gap-3 p-5">
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
          </Card>
        </div>
      </div>
    </>
  );
}
