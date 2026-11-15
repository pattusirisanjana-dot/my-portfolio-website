import logging
import secrets
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pymongo.errors import PyMongoError

from app.config import ADMIN_API_KEY
from app.database.mongodb import DatabaseNotConfiguredError
from app.models.schemas import ContactMessageRecord
from app.services.contact_service import get_contact_messages

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/admin", tags=["admin"])
bearer_scheme = HTTPBearer(auto_error=False)


def require_admin(
    credentials: Annotated[
        HTTPAuthorizationCredentials | None,
        Depends(bearer_scheme),
    ],
) -> None:
    if not ADMIN_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The admin API is not configured.",
        )

    if (
        credentials is None
        or credentials.scheme.lower() != "bearer"
        or not secrets.compare_digest(credentials.credentials, ADMIN_API_KEY)
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin authentication required.",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.get(
    "/contacts",
    response_model=list[ContactMessageRecord],
    dependencies=[Depends(require_admin)],
)
def list_contact_submissions(
    limit: Annotated[int, Query(ge=1, le=100)] = 50,
    skip: Annotated[int, Query(ge=0)] = 0,
) -> list[ContactMessageRecord]:
    try:
        return get_contact_messages(limit=limit, skip=skip)
    except DatabaseNotConfiguredError as error:
        logger.error("Admin contact listing rejected because MongoDB is not configured.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The contact service is not configured yet.",
        ) from error
    except PyMongoError as error:
        logger.error("MongoDB could not retrieve contact submissions.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Contact submissions could not be retrieved right now.",
        ) from error
