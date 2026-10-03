from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.database_models import UserFeedback, AgentWorkflowRun
from backend.schemas.api_schemas import FeedbackCreateRequest, FeedbackResponse
from backend.utils.logger import logger

router = APIRouter(prefix="/api/feedback", tags=["User Feedback"])

@router.post("", response_model=FeedbackResponse)
def submit_feedback(
    payload: FeedbackCreateRequest,
    db: Session = Depends(get_db)
):
    """Submit user feedback regarding the accuracy, usefulness, and quality of the summary."""
    run = db.query(AgentWorkflowRun).filter(AgentWorkflowRun.id == payload.workflow_run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Workflow run not found.")

    feedback = UserFeedback(
        workflow_run_id=payload.workflow_run_id,
        rating=payload.rating,
        is_helpful=payload.is_helpful,
        feedback_text=payload.feedback_text
    )
    db.add(feedback)
    db.commit()
    db.refresh(feedback)

    logger.info(f"Feedback recorded for workflow {payload.workflow_run_id}: Rating={payload.rating}, Helpful={payload.is_helpful}")

    return FeedbackResponse(
        id=feedback.id,
        workflow_run_id=feedback.workflow_run_id,
        rating=feedback.rating,
        is_helpful=feedback.is_helpful,
        feedback_text=feedback.feedback_text,
        created_at=feedback.created_at
    )

@router.get("/workflow/{workflow_run_id}", response_model=List[FeedbackResponse])
def get_feedback_for_workflow(workflow_run_id: str, db: Session = Depends(get_db)):
    """Retrieve all feedbacks submitted for a specific workflow run."""
    feedbacks = db.query(UserFeedback).filter(UserFeedback.workflow_run_id == workflow_run_id).all()
    return [
        FeedbackResponse(
            id=f.id,
            workflow_run_id=f.workflow_run_id,
            rating=f.rating,
            is_helpful=f.is_helpful,
            feedback_text=f.feedback_text,
            created_at=f.created_at
        )
        for f in feedbacks
    ]
