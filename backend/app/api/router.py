from fastapi import APIRouter

from app.api.routes import answers, assessments, auth, classes, health

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(classes.router)
api_router.include_router(assessments.router)
api_router.include_router(answers.router)
