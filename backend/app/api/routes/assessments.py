from typing import Literal

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from app.services.mock_data import add_assessment, get_assessment, list_assessments

router = APIRouter(prefix="/assessments", tags=["assessments"])


class AssessmentCreate(BaseModel):
    id: str = Field(min_length=1)
    classId: str = Field(min_length=1)
    title: str = Field(min_length=1)
    subject: str = Field(min_length=1)
    status: Literal["Complete", "In review", "Ready to mark"] = "Ready to mark"
    due: str = "Not scheduled"
    totalMarks: int = Field(default=0, ge=0)
    questions: int = Field(default=0, ge=0)
    answersMarked: int = Field(default=0, ge=0)
    needsReview: int = Field(default=0, ge=0)
    averageConfidence: int = Field(default=0, ge=0, le=100)
    question: str = ""
    markScheme: list[str] = []


@router.get("")
async def read_assessments() -> list[dict[str, object]]:
    return list_assessments()


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_assessment(assessment_data: AssessmentCreate) -> dict[str, object]:
    return add_assessment(assessment_data.model_dump())


@router.get("/{assessment_id}")
async def read_assessment(assessment_id: str) -> dict[str, object]:
    assessment = get_assessment(assessment_id)
    if assessment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Assessment not found")

    return assessment
