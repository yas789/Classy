from typing import Literal

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from app.services.mock_data import get_answer

router = APIRouter(prefix="/answers", tags=["answers"])


class ConfirmationUpdate(BaseModel):
    stage: Literal["interpretation", "segmentation", "marking"]
    confirmed: bool = True
    overrideMark: int | None = Field(default=None, ge=0)


def read_answer_or_404(answer_id: str) -> dict[str, object]:
    answer = get_answer(answer_id)
    if answer is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Answer not found")

    return answer


@router.post("/{answer_id}/interpret")
async def interpret_answer(answer_id: str) -> dict[str, object]:
    answer = read_answer_or_404(answer_id)
    answer["interpretationConfirmed"] = False
    return {
        "answerId": answer_id,
        "stage": "interpretation",
        "interpretedAnswer": answer["interpretedAnswer"],
        "confirmed": answer["interpretationConfirmed"],
    }


@router.post("/{answer_id}/segment")
async def segment_answer(answer_id: str) -> dict[str, object]:
    answer = read_answer_or_404(answer_id)
    if not answer.get("interpretationConfirmed"):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Interpretation must be confirmed before segmentation")

    answer["segmentationConfirmed"] = False
    return {
        "answerId": answer_id,
        "stage": "segmentation",
        "confidence": answer["segmentationConfidence"],
        "confirmed": answer["segmentationConfirmed"],
    }


@router.post("/{answer_id}/mark")
async def mark_answer(answer_id: str) -> dict[str, object]:
    answer = read_answer_or_404(answer_id)
    if not answer.get("interpretationConfirmed") or not answer.get("segmentationConfirmed"):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Interpretation and segmentation must be confirmed before marking")

    return {
        "answerId": answer_id,
        "stage": "marking",
        "proposedMark": answer["proposedMark"],
        "maxMark": answer["maxMark"],
        "explanation": answer["explanation"],
        "confirmed": answer["markConfirmed"],
    }


@router.patch("/{answer_id}/confirm")
async def confirm_answer(answer_id: str, update: ConfirmationUpdate) -> dict[str, object]:
    answer = read_answer_or_404(answer_id)
    field_by_stage = {
        "interpretation": "interpretationConfirmed",
        "segmentation": "segmentationConfirmed",
        "marking": "markConfirmed",
    }

    answer[field_by_stage[update.stage]] = update.confirmed
    if update.stage == "marking" and update.overrideMark is not None:
        answer["overrideMark"] = update.overrideMark

    return {"answerId": answer_id, "stage": update.stage, "answer": answer}
