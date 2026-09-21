import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  FileText,
  Files,
  Folder,
  GraduationCap,
  Link2,
  PencilLine,
  Rocket,
  UploadCloud,
  UsersRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { mockClasses } from "../mock/mockData";
import { type MarkingBatchStep } from "./batch-dialog-context";

type SubmissionType = "individual" | "combined";

type BatchDraft = {
  className: string;
  subject: string;
  yearGroup: string;
  assessmentTitle: string;
  totalMarks: string;
  questionCount: string;
  submissionType: SubmissionType;
  files: File[];
};

type MarkingBatchDialogProps = {
  open: boolean;
  initialStep: MarkingBatchStep;
  onOpenChange: (open: boolean) => void;
};

const stepOrder: MarkingBatchStep[] = ["class", "assessment", "submissions", "review"];

const stepLabels: Record<MarkingBatchStep, string> = {
  class: "Class",
  assessment: "Assessment",
  submissions: "Submissions",
  review: "Review & Start",
};

const defaultDraft: BatchDraft = {
  className: "",
  subject: "Chemistry",
  yearGroup: "Year 10",
  assessmentTitle: "",
  totalMarks: "60",
  questionCount: "8",
  submissionType: "individual",
  files: [],
};

export function MarkingBatchDialog({ open, initialStep, onOpenChange }: MarkingBatchDialogProps) {
  const [step, setStep] = useState<MarkingBatchStep>(initialStep);
  const [draft, setDraft] = useState<BatchDraft>(defaultDraft);
  const currentIndex = stepOrder.indexOf(step);

  useEffect(() => {
    if (open) {
      setStep(initialStep);
    }
  }, [initialStep, open]);

  const canContinue = useMemo(() => {
    if (step === "class") {
      return Boolean(draft.className.trim() && draft.subject.trim() && draft.yearGroup.trim());
    }

    if (step === "assessment") {
      return Boolean(draft.assessmentTitle.trim() && draft.totalMarks.trim() && draft.questionCount.trim());
    }

    if (step === "submissions") {
      return draft.files.length > 0;
    }

    return true;
  }, [draft, step]);

  if (!open) {
    return null;
  }

  function updateDraft(nextDraft: Partial<BatchDraft>) {
    setDraft((current) => ({ ...current, ...nextDraft }));
  }

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    updateDraft({ files: Array.from(event.target.files ?? []) });
  }

  function goNext() {
    if (step === "review") {
      onOpenChange(false);
      return;
    }

    setStep(stepOrder[Math.min(currentIndex + 1, stepOrder.length - 1)]);
  }

  function goBack() {
    setStep(stepOrder[Math.max(currentIndex - 1, 0)]);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm sm:p-6">
      <div
        aria-labelledby="batch-dialog-title"
        aria-modal="true"
        className="relative w-full max-w-[640px] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl"
        role="dialog"
      >
        <div className="relative overflow-hidden px-7 pb-4 pt-6">
          <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full border border-[#6366f1]/10" />
          <div className="pointer-events-none absolute -left-4 -top-4 h-32 w-32 rounded-full border border-[#6366f1]/10" />

          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-indigo-100 bg-white p-2.5 text-slate-700 shadow-sm">
                <PencilLine className="h-6 w-6 stroke-[1.75]" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-bold leading-snug tracking-tight text-slate-900" id="batch-dialog-title">
                  Mark submission
                </h2>
                <p className="text-sm text-slate-500">Create a class, assessment, and upload student submissions</p>
              </div>
            </div>
            <button
              aria-label="Close dialog"
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Progress" className="mb-1 mt-6">
            <div className="relative flex items-start justify-between">
              <div className="absolute left-8 right-8 top-3.5 h-px bg-slate-200" aria-hidden="true" />
              <div
                className="absolute left-8 top-3.5 h-px bg-[#6366f1] transition-all"
                style={{ width: `${Math.max(currentIndex, 0) * 33}%` }}
                aria-hidden="true"
              />
              {stepOrder.map((item, index) => {
                const completed = index < currentIndex;
                const active = index === currentIndex;

                return (
                  <button
                    className="relative z-10 flex min-w-0 flex-col items-center"
                    key={item}
                    type="button"
                    onClick={() => setStep(item)}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                        completed && "border-2 border-[#6366f1] bg-indigo-50 text-[#4f46e5]",
                        active && "bg-[#6366f1] text-white shadow-sm ring-4 ring-indigo-100",
                        !completed && !active && "border border-slate-300 bg-white text-slate-400",
                      )}
                    >
                      {completed ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : index + 1}
                    </span>
                    <span className={cn("mt-1.5 text-xs", active || completed ? "font-semibold text-[#4f46e5]" : "font-medium text-slate-400")}>
                      {stepLabels[item]}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        <div className="space-y-4 px-7 py-4">
          {step === "class" ? <CreateClassStep draft={draft} updateDraft={updateDraft} /> : null}
          {step === "assessment" ? <CreateAssessmentStep draft={draft} updateDraft={updateDraft} /> : null}
          {step === "submissions" ? (
            <SubmissionUploadStep draft={draft} updateDraft={updateDraft} handleFilesSelected={handleFilesSelected} goToAssessment={() => setStep("assessment")} />
          ) : null}
          {step === "review" ? <ReviewStartStep draft={draft} /> : null}
        </div>

        <div className="flex flex-col items-center space-y-3.5 px-7 pb-6 pt-2">
          <div className="flex w-full gap-2">
            {currentIndex > 0 ? (
              <Button className="h-11 rounded-xl" variant="outline" type="button" onClick={goBack}>
                Back
              </Button>
            ) : null}
            <Button
              className="h-11 flex-1 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] disabled:bg-indigo-50 disabled:text-slate-400"
              type="button"
              disabled={!canContinue}
              onClick={goNext}
            >
              <span>{step === "review" ? "Start AI processing" : "Continue"}</span>
              {step === "review" ? <Rocket className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
            </Button>
          </div>
          {step === "submissions" ? (
            <button className="inline-flex items-center gap-1 text-xs font-semibold text-[#4f46e5] transition-colors hover:text-[#4338ca] hover:underline" type="button">
              <span>Or share an upload link with your students</span>
              <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CreateClassStep({ draft, updateDraft }: { draft: BatchDraft; updateDraft: (draft: Partial<BatchDraft>) => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#4f46e5] shadow-sm">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Create new class</h3>
            <p className="text-xs text-slate-500">Start with a cohort and subject. Student rosters can be added later.</p>
          </div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="class-name">Class name</Label>
          <Input id="class-name" placeholder="Year 10 Chemistry" value={draft.className} onChange={(event) => updateDraft({ className: event.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Chemistry" value={draft.subject} onChange={(event) => updateDraft({ subject: event.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="year-group">Year group</Label>
          <Input id="year-group" placeholder="Year 10" value={draft.yearGroup} onChange={(event) => updateDraft({ yearGroup: event.target.value })} />
        </div>
      </div>
    </div>
  );
}

function CreateAssessmentStep({ draft, updateDraft }: { draft: BatchDraft; updateDraft: (draft: Partial<BatchDraft>) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm">
        <div className="flex items-center gap-3 text-slate-800">
          <UsersRound className="h-4 w-4 text-slate-600" aria-hidden="true" />
          <span className="text-sm font-semibold tracking-tight text-slate-800">{draft.className || "New class"}</span>
        </div>
        <Badge variant="muted">{draft.subject || "Subject"}</Badge>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="assessment-title">Assessment title</Label>
          <Input id="assessment-title" placeholder="Rates of Reaction Topic Test" value={draft.assessmentTitle} onChange={(event) => updateDraft({ assessmentTitle: event.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="total-marks">Total marks</Label>
          <Input id="total-marks" inputMode="numeric" placeholder="60" value={draft.totalMarks} onChange={(event) => updateDraft({ totalMarks: event.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="question-count">Questions</Label>
          <Input id="question-count" inputMode="numeric" placeholder="8" value={draft.questionCount} onChange={(event) => updateDraft({ questionCount: event.target.value })} />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <PlaceholderUpload icon={ClipboardList} label="Question paper" detail="Upload placeholder" />
        <PlaceholderUpload icon={FileText} label="Mark scheme" detail="Upload placeholder" />
      </div>
    </div>
  );
}

function SubmissionUploadStep({
  draft,
  updateDraft,
  handleFilesSelected,
  goToAssessment,
}: {
  draft: BatchDraft;
  updateDraft: (draft: Partial<BatchDraft>) => void;
  handleFilesSelected: (event: ChangeEvent<HTMLInputElement>) => void;
  goToAssessment: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm transition-colors hover:border-slate-300">
        <div className="flex items-center gap-3 text-slate-800">
          <Folder className="h-4 w-4 text-slate-600" aria-hidden="true" />
          <span className="text-sm font-semibold tracking-tight text-slate-800">{draft.assessmentTitle || "Untitled assessment"}</span>
        </div>
        <button className="rounded px-2 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#4f46e5]" type="button" onClick={goToAssessment}>
          Change
        </button>
      </div>

      <fieldset className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="Submission type">
        <SubmissionTypeCard
          checked={draft.submissionType === "individual"}
          detail="Upload each student's submission as a separate PDF or scan"
          icon={FileText}
          label="Individual files"
          onSelect={() => updateDraft({ submissionType: "individual" })}
        />
        <SubmissionTypeCard
          checked={draft.submissionType === "combined"}
          detail="Upload all submissions in one combined PDF or ZIP bundle"
          icon={Files}
          label="Combined PDF"
          onSelect={() => updateDraft({ submissionType: "combined" })}
        />
      </fieldset>

      <div className="space-y-1.5">
        <Label className="flex items-center gap-1.5">
          <span>Class</span>
          <span className="font-normal text-slate-400">(optional)</span>
          <CircleHelp className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
        </Label>
        <button className="flex w-fit min-w-44 items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm transition-colors hover:border-slate-300" type="button">
          <span className="flex items-center gap-2">
            <UsersRound className="h-4 w-4 text-slate-500" aria-hidden="true" />
            {draft.className || mockClasses[0].name}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
        </button>
      </div>

      <div className="space-y-1.5">
        <Label className="flex items-center gap-1.5">
          <span>Submissions</span>
          <CircleHelp className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
        </Label>
        <div className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center transition-all duration-150 hover:border-[#6366f1] hover:bg-slate-50/50">
          <input aria-label="Upload files" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" multiple type="file" onChange={handleFilesSelected} />
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors group-hover:border-indigo-300 group-hover:bg-indigo-50/40 group-hover:text-[#4f46e5]">
            <UploadCloud className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="text-sm text-slate-700">
            <span className="font-semibold text-[#4f46e5] underline decoration-indigo-300 underline-offset-2">Click to upload</span> or drag and drop
          </div>
          <p className="mt-1 text-[11px] text-slate-400">PDF, image scans, or ZIP · up to 50 files</p>
        </div>
        {draft.files.length ? (
          <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
            <span className="font-semibold text-slate-900">{draft.files.length} selected:</span> {draft.files.map((file) => file.name).join(", ")}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ReviewStartStep({ draft }: { draft: BatchDraft }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
            <Rocket className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Ready to start AI processing</h3>
            <p className="text-xs text-slate-600">This will create a mock batch and prepare submissions for review.</p>
          </div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <ReviewRow label="Class" value={draft.className || "No class"} />
        <ReviewRow label="Subject" value={draft.subject || "No subject"} />
        <ReviewRow label="Assessment" value={draft.assessmentTitle || "Untitled assessment"} />
        <ReviewRow label="Submissions" value={`${draft.files.length} file${draft.files.length === 1 ? "" : "s"}`} />
        <ReviewRow label="Marks" value={draft.totalMarks || "0"} />
        <ReviewRow label="Questions" value={draft.questionCount || "0"} />
      </div>
    </div>
  );
}

function PlaceholderUpload({ icon: Icon, label, detail }: { icon: typeof ClipboardList; label: string; detail: string }) {
  return (
    <button className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white p-4 text-left transition-colors hover:border-[#6366f1] hover:bg-slate-50" type="button">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-slate-900">{label}</span>
        <span className="text-xs text-slate-500">{detail}</span>
      </span>
    </button>
  );
}

function SubmissionTypeCard({ checked, detail, icon: Icon, label, onSelect }: { checked: boolean; detail: string; icon: typeof FileText; label: string; onSelect: () => void }) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-start rounded-xl p-3.5 transition-all",
        checked ? "border-2 border-[#6366f1] bg-indigo-50/20 shadow-sm ring-1 ring-indigo-500/20" : "border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50",
      )}
    >
      <input checked={checked} className="sr-only" name="submission_type" type="radio" onChange={onSelect} />
      <div className="mr-3 mt-0.5 shrink-0">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg border shadow-sm", checked ? "border-indigo-200 bg-white text-[#6366f1]" : "border-slate-200 bg-slate-50 text-slate-600")}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold leading-snug text-slate-900">{label}</div>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{detail}</p>
      </div>
    </label>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <span className="text-xs text-slate-500">{label}</span>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
