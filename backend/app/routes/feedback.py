import logging

from fastapi import APIRouter, HTTPException, status
from pymongo.errors import PyMongoError

from app.database.mongodb import DatabaseNotConfiguredError
from app.models.schemas import ContactSubmissionResponse, FeedbackSubmission
from app.services.contact_service import save_feedback

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/feedback", tags=["feedback"])


@router.post(
    "",
    response_model=ContactSubmissionResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_feedback(feedback: FeedbackSubmission) -> ContactSubmissionResponse:
    try:
        save_feedback(feedback)
    except DatabaseNotConfiguredError as error:
        logger.error("Feedback submission rejected because MongoDB is not configured.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The feedback service is not configured yet. Please try again later.",
        ) from error
    except PyMongoError as error:
        logger.error("MongoDB could not store feedback.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Your feedback could not be saved right now. Please try again later.",
        ) from error

    return ContactSubmissionResponse(
        success=True,
        message="Thanks for your feedback. It has been received.",
    )
