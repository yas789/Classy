import { useOutletContext } from "react-router-dom";

export type MarkingBatchStep = "class" | "assessment" | "submissions" | "review";

export type BatchDialogOutletContext = {
  openBatchDialog: (step?: MarkingBatchStep) => void;
};

export function useBatchDialog() {
  return useOutletContext<BatchDialogOutletContext>();
}
