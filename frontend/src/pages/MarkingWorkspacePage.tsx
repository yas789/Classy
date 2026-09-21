import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  BadgeCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Edit3,
  Eye,
  FileScan,
  FileText,
  Highlighter,
  Lock,
  PanelRightOpen,
  ScanSearch,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAssessmentById, getClassById, getStudentById } from "../features/mock/mockData";

type Stage = "interpretation" | "segmentation" | "marking";
type WorkspaceView = "digitised" | "pdf";

const stages: Array<{ id: Stage; label: string; description: string; icon: typeof FileText }> = [
  { id: "interpretation", label: "Interpretation", description: "Approve full-paper digitisation", icon: FileText },
  { id: "segmentation", label: "Segmentation", description: "Verify question answer regions", icon: ScanSearch },
  { id: "marking", label: "AI Marking", description: "Review evidence-linked marks", icon: BadgeCheck },
];

export function MarkingWorkspacePage() {
  const { assessmentId } = useParams();
  const assessment = getAssessmentById(assessmentId);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("interpretation");
  const [view, setView] = useState<WorkspaceView>("digitised");
  const [approvedInterpretations, setApprovedInterpretations] = useState<Record<string, boolean>>({});
  const [approvedSegmentations, setApprovedSegmentations] = useState<Record<string, boolean>>({});
  const [approvedMarks, setApprovedMarks] = useState<Record<string, boolean>>({});
  const [overrideMarks, setOverrideMarks] = useState<Record<string, string>>({});

  if (!assessment) {
    return <Navigate to="/assessments" replace />;
  }

  if (!assessment.answers.length) {
    return <Navigate to={`/assessments/${assessment.id}`} replace />;
  }

  const classItem = getClassById(assessment.classId);
  const answer = assessment.answers[answerIndex];
  const student = getStudentById(answer.studentId);
  const paperSections = answer.paperSections ?? answer.interpretedAnswer.map((text, index) => ({
    id: `line-${index}`,
    question: `Reference ${index + 1}`,
    topic: "Interpreted answer",
    page: 1,
    confidence: answer.segmentationConfidence,
    bounds: "mock region",
    text: text.replace(/^\[\d\]\s*/, ""),
  }));
  const markingBreakdown = answer.markingBreakdown ?? answer.explanation.map((rationale, index) => ({
    id: `mark-${index}`,
    question: `Point ${index + 1}`,
    awarded: index < answer.proposedMark ? 1 : 0,
    max: 1,
    evidenceSectionId: paperSections[Math.min(index, paperSections.length - 1)]?.id ?? paperSections[0].id,
    rubricPoint: assessment.markScheme[index] ?? "Teacher rubric point",
    rationale,
  }));
  const interpretationApproved = approvedInterpretations[answer.id] ?? answer.interpretationConfirmed;
  const segmentationApproved = approvedSegmentations[answer.id] ?? (answer.segmentationConfirmed ?? false);
  const markApproved = approvedMarks[answer.id] ?? answer.markConfirmed;
  const totalAwarded = markingBreakdown.reduce((sum, item) => sum + item.awarded, 0);
  const totalMax = markingBreakdown.reduce((sum, item) => sum + item.max, 0);
  const totalAnswers = assessment.answers.length;
  const finalMark = overrideMarks[answer.id] || String(answer.overrideMark ?? (totalAwarded || answer.proposedMark));
  const overallConfidence = Math.round(paperSections.reduce((sum, section) => sum + section.confidence, 0) / paperSections.length);

  function canOpenStage(nextStage: Stage) {
    if (nextStage === "segmentation") return interpretationApproved;
    if (nextStage === "marking") return interpretationApproved && segmentationApproved;
    return true;
  }

  function goNext() {
    setAnswerIndex((current) => Math.min(current + 1, totalAnswers - 1));
    setStage("interpretation");
    setView("digitised");
  }

  function goPrevious() {
    setAnswerIndex((current) => Math.max(current - 1, 0));
    setStage("interpretation");
    setView("digitised");
  }

  return (
    <section className="space-y-5 pb-20">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#4648d4]">
            {classItem?.name} • Full paper workflow
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#0b1c30]">{assessment.title}</h1>
          <p className="mt-1 text-sm text-[#464554]">
            {student?.name} #{student?.candidateNumber} • Script {answerIndex + 1} of {totalAnswers} • {overallConfidence}% confidence
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={interpretationApproved ? "success" : "warning"}>Interpretation {interpretationApproved ? "approved" : "needs review"}</Badge>
          <Badge variant={segmentationApproved ? "success" : "warning"}>Segmentation {segmentationApproved ? "approved" : "pending"}</Badge>
          <Badge variant={markApproved ? "success" : "warning"}>Marking {markApproved ? "approved" : "pending"}</Badge>
        </div>
      </div>

      <Card className="p-3">
        <div className="grid gap-2 lg:grid-cols-3">
          {stages.map((item, index) => {
            const Icon = item.icon;
            const locked = !canOpenStage(item.id);
            const active = stage === item.id;
            const complete = item.id === "interpretation" ? interpretationApproved : item.id === "segmentation" ? segmentationApproved : markApproved;

            return (
              <button
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                  active ? "border-[#4648d4] bg-[#eff4ff] shadow-sm" : "border-transparent hover:bg-[#f8fafc]"
                } ${locked ? "cursor-not-allowed opacity-45" : ""}`}
                disabled={locked}
                key={item.id}
                type="button"
                onClick={() => setStage(item.id)}
              >
                <span className={`flex h-9 w-9 items-center justify-center rounded-full ${complete ? "bg-[#006c49] text-white" : active ? "bg-[#4648d4] text-white" : "bg-[#e5eeff] text-[#464554]"}`}>
                  {locked ? <Lock className="h-4 w-4" /> : complete ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#4648d4]">Step {index + 1}</span>
                  <span className="block text-sm font-semibold text-[#0b1c30]">{item.label}</span>
                  <span className="block text-xs text-[#464554]">{item.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="flex flex-col gap-3 p-3 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex w-fit rounded-xl border border-[#e5e7eb] bg-[#f8fafc] p-1">
          {([
            { id: "digitised", label: "Digitised text", icon: Edit3 },
            { id: "pdf", label: "Original script PDF", icon: FileScan },
          ] as const).map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${view === item.id ? "bg-white text-[#4648d4] shadow-sm" : "text-[#464554] hover:text-[#0b1c30]"}`}
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-[#464554]">
          <span className="h-2 w-2 rounded-full bg-[#006c49]" />
          Teacher approvals control progression to the next stage
        </div>
      </Card>

      {stage === "interpretation" ? (
        <div className="grid gap-6 xl:grid-cols-12">
          <section className="space-y-4 xl:col-span-7">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#0b1c30]">Interpretation and digitisation review</h2>
              <p className="mt-1 text-sm text-[#464554]">Check the full paper text before segmentation and marking use it as evidence.</p>
            </div>
            {view === "digitised" ? (
              <div className="space-y-4">
                {paperSections.map((section) => (
                  <Card className="overflow-hidden" key={section.id}>
                    <div className="flex flex-col justify-between gap-2 border-b border-[#f1f5f9] bg-[#eff4ff] px-5 py-3 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-2">
                        <Edit3 className="h-4 w-4 text-[#4648d4]" aria-hidden="true" />
                        <span className="font-semibold text-[#0b1c30]">{section.question}</span>
                        <span className="text-xs text-[#464554]">{section.topic}</span>
                      </div>
                      <span className="font-mono text-xs text-[#464554]">{section.text.split(/\s+/).length} words • p.{section.page}</span>
                    </div>
                    <div className="p-5">
                      <textarea
                        className="min-h-24 w-full resize-y border-0 bg-transparent p-0 text-[15px] leading-7 text-[#0b1c30] outline-none focus:ring-0"
                        defaultValue={section.text}
                        spellCheck={false}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <PdfPreview sections={paperSections} activeSectionId={paperSections[0].id} />
            )}
          </section>

          <aside className="xl:col-span-5">
            <Card className="sticky top-24 p-5">
              <h3 className="text-lg font-semibold text-[#0b1c30]">Approval checklist</h3>
              <div className="mt-4 space-y-3 text-sm text-[#464554]">
                <ChecklistItem checked label="All visible handwriting has been interpreted" />
                <ChecklistItem checked label="Question numbers detected across the full paper" />
                <ChecklistItem checked={overallConfidence >= 90} label={`${overallConfidence}% average confidence`} />
              </div>
              <button
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#4648d4] px-4 py-2.5 text-sm font-semibold text-white shadow-sm disabled:bg-[#c0c1ff]"
                disabled={interpretationApproved}
                type="button"
                onClick={() => {
                  setApprovedInterpretations((current) => ({ ...current, [answer.id]: true }));
                  setStage("segmentation");
                }}
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {interpretationApproved ? "Interpretation approved" : "Approve interpretation and continue"}
              </button>
            </Card>
          </aside>
        </div>
      ) : null}

      {stage === "segmentation" ? (
        <div className="grid gap-6 xl:grid-cols-12">
          <section className="xl:col-span-5">
            {view === "pdf" ? <PdfPreview sections={paperSections} activeSectionId={paperSections[0].id} compact /> : <ScriptMap sections={paperSections} />}
          </section>
          <section className="space-y-4 xl:col-span-7">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#0b1c30]">Segmentation review</h2>
              <p className="mt-1 text-sm text-[#464554]">Scroll each detected answer segment and confirm the question boundaries are correct.</p>
            </div>
            {paperSections.map((section, index) => (
              <Card className="p-5" key={section.id}>
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e1e0ff] font-mono text-xs font-semibold text-[#2f2ebe]">{index + 1}</span>
                      <h3 className="font-semibold text-[#0b1c30]">{section.question}</h3>
                    </div>
                    <p className="mt-1 text-sm text-[#464554]">{section.topic}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-[#ecfdf5] px-2.5 py-1 font-semibold text-[#006c49]">{section.confidence}% confidence</span>
                    <span className="rounded-full bg-[#f8fafc] px-2.5 py-1 font-mono text-[#464554]">{section.bounds}</span>
                  </div>
                </div>
                <p className="mt-4 rounded-xl border border-[#f1f5f9] bg-[#f8fafc] p-4 text-sm leading-6 text-[#0b1c30]">{section.text}</p>
              </Card>
            ))}
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-[#4648d4] px-5 py-2.5 text-sm font-semibold text-white shadow-sm disabled:bg-[#c0c1ff]"
              disabled={segmentationApproved}
              type="button"
              onClick={() => {
                setApprovedSegmentations((current) => ({ ...current, [answer.id]: true }));
                setStage("marking");
              }}
            >
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              {segmentationApproved ? "Segmentation approved" : "Approve segmentation and continue"}
            </button>
          </section>
        </div>
      ) : null}

      {stage === "marking" ? (
        <div className="grid gap-6 xl:grid-cols-12">
          <section className="space-y-4 xl:col-span-7">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#0b1c30]">AI marking and evidence review</h2>
              <p className="mt-1 text-sm text-[#464554]">Each proposed mark is tied back to the approved segmentation evidence.</p>
            </div>
            {markingBreakdown.map((decision) => {
              const evidence = paperSections.find((section) => section.id === decision.evidenceSectionId) ?? paperSections[0];
              return (
                <Card className="overflow-hidden" key={decision.id}>
                  <div className="flex flex-col justify-between gap-3 border-b border-[#f1f5f9] bg-white px-5 py-4 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="font-semibold text-[#0b1c30]">{decision.question}</h3>
                      <p className="mt-1 text-sm text-[#464554]">{decision.rubricPoint}</p>
                    </div>
                    <span className="w-fit rounded-full bg-[#eff4ff] px-3 py-1 font-mono text-xs font-semibold text-[#4648d4]">
                      {decision.awarded}/{decision.max} marks
                    </span>
                  </div>
                  <div className="grid gap-4 p-5 lg:grid-cols-2">
                    <div className="rounded-xl border border-[#e5e7eb] bg-[#f8fafc] p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4648d4]">
                        <Highlighter className="h-3.5 w-3.5" aria-hidden="true" /> Evidence from {evidence.question}
                      </div>
                      <p className="text-sm leading-6 text-[#0b1c30]">{evidence.text}</p>
                    </div>
                    <div className="rounded-xl border border-[#e5e7eb] p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4648d4]">
                        <Eye className="h-3.5 w-3.5" aria-hidden="true" /> AI rationale
                      </div>
                      <p className="text-sm leading-6 text-[#464554]">{decision.rationale}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </section>
          <aside className="xl:col-span-5">
            <Card className="sticky top-24 p-5">
              <h3 className="text-lg font-semibold text-[#0b1c30]">Final mark decision</h3>
              <div className="mt-4 rounded-2xl bg-[#0b1c30] p-5 text-white">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#c0c1ff]">Proposed score</p>
                <p className="mt-2 text-4xl font-semibold tracking-tight">{finalMark}/{totalMax || answer.maxMark}</p>
                <p className="mt-2 text-sm text-[#eaf1ff]">Generated from {markingBreakdown.length} evidence-linked decisions.</p>
              </div>
              <label className="mt-5 block text-sm font-semibold text-[#0b1c30]" htmlFor="override-mark">Teacher override mark</label>
              <input
                className="mt-2 h-11 w-28 rounded-lg border border-[#e5e7eb] px-3 text-sm outline-none focus:border-[#4648d4] focus:ring-1 focus:ring-[#4648d4]"
                id="override-mark"
                max={totalMax || answer.maxMark}
                min={0}
                type="number"
                value={overrideMarks[answer.id] ?? ""}
                placeholder={String(totalAwarded || answer.proposedMark)}
                onChange={(event) => setOverrideMarks((current) => ({ ...current, [answer.id]: event.target.value }))}
              />
              <button
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#006c49] px-4 py-2.5 text-sm font-semibold text-white shadow-sm disabled:bg-[#a7f3d0]"
                disabled={markApproved}
                type="button"
                onClick={() => setApprovedMarks((current) => ({ ...current, [answer.id]: true }))}
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {markApproved ? "Mark approved" : "Approve mark"}
              </button>
            </Card>
          </aside>
        </div>
      ) : null}

      <Card className="fixed bottom-0 left-0 right-0 z-30 rounded-none border-x-0 border-b-0 bg-white/95 p-4 shadow-2xl backdrop-blur lg:left-60">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <Link className="inline-flex items-center gap-2 text-sm font-medium text-[#464554] hover:text-[#0b1c30]" to={`/assessments/${assessment.id}`}>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back to assessment setup
          </Link>
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <button className="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] px-4 py-2 text-sm font-medium text-[#0b1c30] disabled:opacity-40" disabled={answerIndex === 0} type="button" onClick={goPrevious}>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Previous script
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#4648d4] px-4 py-2 text-sm font-medium text-white disabled:bg-[#c0c1ff]" disabled={answerIndex === totalAnswers - 1} type="button" onClick={goNext}>
              Next script <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
}

function ChecklistItem({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-5 w-5 items-center justify-center rounded-full ${checked ? "bg-[#006c49] text-white" : "bg-[#fffbeb] text-[#d97706]"}`}>
        {checked ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : <Lock className="h-3.5 w-3.5" aria-hidden="true" />}
      </span>
      <span>{label}</span>
    </div>
  );
}

function ScriptMap({ sections }: { sections: Array<{ id: string; question: string; page: number; confidence: number }> }) {
  return (
    <Card className="sticky top-24 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#0b1c30]">Script segment map</h3>
        <PanelRightOpen className="h-4 w-4 text-[#464554]" aria-hidden="true" />
      </div>
      <div className="mt-4 space-y-2">
        {sections.map((section) => (
          <div className="flex items-center justify-between rounded-xl border border-[#f1f5f9] bg-[#f8fafc] px-3 py-2" key={section.id}>
            <span className="text-sm font-medium text-[#0b1c30]">{section.question}</span>
            <span className="font-mono text-xs text-[#464554]">p.{section.page} • {section.confidence}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PdfPreview({ sections, activeSectionId, compact = false }: { sections: Array<{ id: string; question: string; page: number }>; activeSectionId: string; compact?: boolean }) {
  return (
    <Card className={`${compact ? "sticky top-24" : ""} overflow-hidden`}>
      <div className="border-b border-[#f1f5f9] px-5 py-4">
        <h3 className="font-semibold text-[#0b1c30]">Original script PDF</h3>
        <p className="mt-1 text-sm text-[#464554]">Mock paper preview with detected answer regions.</p>
      </div>
      <div className="bg-[#dce9ff] p-5">
        <div className={`mx-auto rounded-xl bg-white p-6 shadow-lg ${compact ? "min-h-[420px]" : "min-h-[620px] max-w-2xl"}`}>
          <div className="mb-5 flex items-center justify-between border-b border-[#e5e7eb] pb-3">
            <span className="text-sm font-semibold text-[#0b1c30]">Candidate script</span>
            <span className="font-mono text-xs text-[#464554]">pages 1-4</span>
          </div>
          <div className="space-y-4">
            {sections.slice(0, compact ? 5 : sections.length).map((section) => (
              <div
                className={`rounded-lg border-2 border-dashed p-3 ${section.id === activeSectionId ? "border-[#4648d4] bg-[#e1e0ff]/50" : "border-[#c7c4d7] bg-[#f8fafc]"}`}
                key={section.id}
              >
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#4648d4]">{section.question}</span>
                  <span className="font-mono text-[#464554]">p.{section.page}</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-11/12 rounded bg-[#c7c4d7]/70" />
                  <div className="h-2 w-9/12 rounded bg-[#c7c4d7]/70" />
                  <div className="h-2 w-10/12 rounded bg-[#c7c4d7]/70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
