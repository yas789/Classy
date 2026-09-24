from typing import Literal

from fastapi import APIRouter, status
from pydantic import BaseModel, Field

from app.services.mock_data import add_class, list_classes

router = APIRouter(prefix="/classes", tags=["classes"])


class ClassCreate(BaseModel):
    id: str = Field(min_length=1)
    name: str = Field(min_length=1)
    subject: str = Field(min_length=1)
    year: str = Field(min_length=1)
    students: int = Field(ge=0)
    institution: str = Field(min_length=1)


@router.get("")
async def read_classes() -> list[dict[str, object]]:
    return list_classes()


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_class(class_data: ClassCreate) -> dict[str, object | Literal[True]]:
    return add_class(class_data.model_dump())
