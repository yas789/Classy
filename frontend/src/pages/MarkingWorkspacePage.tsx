import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BadgeCheck, CheckCircle2, ChevronLeft, ChevronRight, FileText, Lock, ScanSearch, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAssessmentById, getClassById, getStudentById } from "../features/mock/mockData";

type ReviewMode = "question" | "student";
type Stage = "segmentation" | "interpretation" | "marking";

const stageMeta = {
  segmentation: { label: "Segmentation", icon: ScanSearch },
  interpretation: { label: "Interpretation", icon: FileText },
  marking: { label: "Marking", icon: BadgeCheck },
} satisfies Record<Stage, { label: string; icon: typeof ScanSearch }>;

export function MarkingWorkspacePage() {
  const { assessmentId } = useParams();
  const assessment = getAssessmentById(assessmentId);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [reviewMode, setReviewMode] = useState<ReviewMode>("question");
  const [stage, setStage] = useState<Stage>("interpretation");
  const [confirmedInterpretations, setConfirmedInterpretations] = useState<Record<string, boolean>>({});
  const [confirmedMarks, setConfirmedMarks] = useState<Record<string, boolean>>({});
  const [overrideMarks, setOverrideMarks] = useState<Record<string, string>>({});

  if (!assessment) {
    return <Navigate to="/assessments" replace />;
  }

  if (!assessment.answers.length) {
    return <Navigate to={`/assessments/${assessment.id}`} replace />;
  }

  const currentAssessment = assessment;
  const classItem = getClassById(currentAssessment.classId);
  const answer = currentAssessment.answers[answerIndex];
  const student = getStudentById(answer.studentId);
  const interpretationConfirmed = confirmedInterpretations[answer.id] ?? answer.interpretationConfirmed;
  const markConfirmed = confirmedMarks[answer.id] ?? answer.markConfirmed;
  const finalMark = overrideMarks[answer.id] || String(answer.overrideMark ?? answer.proposedMark);

  function goNext() {
    setAnswerIndex((current) => Math.min(current + 1, currentAssessment.answers.length - 1));
    setStage("interpretation");
  }

  function goPrevious() {
    setAnswerIndex((current) => Math.max(current - 1, 0));
    setStage("interpretation");
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#4648d4]">{classItem?.name} • Question 1</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#0b1c30]">{currentAssessment.title}</h1>
          <p className="mt-1 text-sm text-[#464554]">
            {student?.name} #{student?.candidateNumber} • Answer {answerIndex + 1} of {currentAssessment.answers.length}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["question", "student"] as ReviewMode[]).map((mode) => (
            <button
              className={`rounded-lg px-3 py-2 text-sm font-medium ${reviewMode === mode ? "bg-[#4648d4] text-white" : "border border-[#e5e7eb] bg-white text-[#464554]"}`}
              key={mode}
              type="button"
              onClick={() => setReviewMode(mode)}
            >
              By {mode === "question" ? "Question" : "Student"}
            </button>
          ))}
        </div>
      </div>

      <Card className="flex flex-wrap gap-2 p-2">
        {(["segmentation", "interpretation", "marking"] as Stage[]).map((nextStage) => {
          const locked = nextStage === "marking" && !interpretationConfirmed;
          const Icon = locked ? Lock : stageMeta[nextStage].icon;

          return (
            <button
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                stage === nextStage ? "bg-[#0b1c30] text-white" : "text-[#464554] hover:bg-[#f8fafc]"
              } ${locked ? "cursor-not-allowed opacity-40" : ""}`}
              disabled={locked}
              key={nextStage}
              type="button"
              onClick={() => setStage(nextStage)}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {stageMeta[nextStage].label}
            </button>
          );
        })}
      </Card>

      <div className="grid gap-6 xl:grid-cols-12">
        <Card className="xl:col-span-5">
          <div className="border-b border-[#f1f5f9] px-5 py-4">
            <h2 className="text-lg font-semibold text-[#0b1c30]">Student script</h2>
            <div className="mt-1 flex items-center gap-2 text-xs text-[#464554]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#006c49]" aria-hidden="true" />
              <span>Detected answer region • {answer.segmentationConfidence}% confidence</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex min-h-[360px] flex-col justify-between rounded-2xl border border-dashed border-[#c7c4d7] bg-[#f8fafc] p-5">
              <div className="space-y-3 font-serif text-[15px] leading-7 text-[#0b1c30]">
                {answer.interpretedAnswer.map((line) => (
                  <p key={line}>{line.replace(/^\[\d\]\s*/, "")}</p>
                ))}
              </div>
              <div className="mt-8 rounded-xl bg-white/80 p-3 text-xs text-[#464554]">
                Scan placeholder. Real upload and image annotation comes after the mock workflow is validated.
              </div>
            </div>
          </div>
        </Card>

        <section className="space-y-5 xl:col-span-7">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[#0b1c30]">AI interpretation</h2>
                <p className="mt-1 text-sm text-[#464554]">Confirm the handwriting interpretation before proposed marks unlock.</p>
              </div>
              <Badge variant={interpretationConfirmed ? "success" : "warning"}>
                {interpretationConfirmed ? "Confirmed" : "Needs review"}
              </Badge>
            </div>
            <div className="mt-4 space-y-3">
              {answer.interpretedAnswer.map((line) => (
                <div className="rounded-xl bg-[#f8fafc] px-4 py-3 text-sm leading-6 text-[#0b1c30]" key={line}>
                  {line}
                </div>
              ))}
            </div>
            <button
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#4648d4] px-4 py-2 text-sm font-medium text-white shadow-sm disabled:bg-[#c0c1ff]"
              type="button"
              disabled={interpretationConfirmed}
              onClick={() => {
                setConfirmedInterpretations((current) => ({ ...current, [answer.id]: true }));
                setStage("marking");
              }}
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              {interpretationConfirmed ? "Interpretation confirmed" : "Confirm interpretation"}
            </button>
          </Card>

          <Card className={`p-5 ${!interpretationConfirmed ? "opacity-60" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[#0b1c30]">Proposed marking</h2>
                <p className="mt-1 text-sm text-[#464554]">Marks are linked to numbered interpretation references.</p>
              </div>
              <span className="rounded-full bg-[#eff4ff] px-3 py-1 font-mono text-xs font-semibold text-[#4648d4]">
                {finalMark}/{answer.maxMark}
              </span>
            </div>

            {!interpretationConfirmed ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#f8fafc] p-4 text-sm text-[#464554]">
                <Lock className="h-4 w-4 text-[#d97706]" aria-hidden="true" />
                <span>Confirm interpretation to unlock marking.</span>
              </div>
            ) : (
              <>
                <ol className="mt-4 space-y-2">
                  {answer.explanation.map((point) => (
                    <li className="rounded-xl border border-[#f1f5f9] px-4 py-3 text-sm text-[#464554]" key={point}>{point}</li>
                  ))}
                </ol>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="text-sm font-medium text-[#0b1c30]" htmlFor="override-mark">Override mark</label>
                  <input
                    className="h-10 w-24 rounded-lg border border-[#e5e7eb] px-3 text-sm outline-none focus:border-[#4648d4] focus:ring-1 focus:ring-[#4648d4]"
                    id="override-mark"
                    max={answer.maxMark}
                    min={0}
                    type="number"
                    value={overrideMarks[answer.id] ?? ""}
                    placeholder={String(answer.proposedMark)}
                    onChange={(event) => setOverrideMarks((current) => ({ ...current, [answer.id]: event.target.value }))}
                  />
                  <button
                    className="inline-flex items-center gap-2 rounded-lg bg-[#006c49] px-4 py-2 text-sm font-medium text-white disabled:bg-[#a7f3d0]"
                    type="button"
                    disabled={markConfirmed}
                    onClick={() => setConfirmedMarks((current) => ({ ...current, [answer.id]: true }))}
                  >
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    {markConfirmed ? "Mark confirmed" : "Confirm mark"}
                  </button>
                </div>
              </>
            )}
          </Card>
        </section>
      </div>

      <Card className="flex flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center">
        <Link className="text-sm font-medium text-[#464554] hover:text-[#0b1c30]" to={`/assessments/${currentAssessment.id}`}>
          Back to assessment setup
        </Link>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] px-4 py-2 text-sm font-medium text-[#0b1c30] disabled:opacity-40" disabled={answerIndex === 0} type="button" onClick={goPrevious}>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#4648d4] px-4 py-2 text-sm font-medium text-white disabled:bg-[#c0c1ff]" disabled={answerIndex === currentAssessment.answers.length - 1} type="button" onClick={goNext}>
            Next student
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </Card>
    </section>
  );
}
