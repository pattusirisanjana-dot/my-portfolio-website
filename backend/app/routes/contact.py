import logging

from fastapi import APIRouter, HTTPException, status
from pymongo.errors import PyMongoError

from app.database.mongodb import DatabaseNotConfiguredError
from app.models.schemas import ContactMessage, ContactSubmissionResponse
from app.services.contact_service import save_contact_message

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post(
    "",
    response_model=ContactSubmissionResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_contact_message(contact: ContactMessage) -> ContactSubmissionResponse:
    try:
        save_contact_message(contact)
    except DatabaseNotConfiguredError as error:
        logger.error("Contact submission rejected because MongoDB is not configured.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The contact service is not configured yet. Please try again later.",
        ) from error
    except PyMongoError as error:
        logger.error("MongoDB could not store a contact submission.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Your message could not be saved right now. Please try again later.",
        ) from error

    return ContactSubmissionResponse(
        success=True,
        message="Thanks for reaching out. Your message has been received.",
    )