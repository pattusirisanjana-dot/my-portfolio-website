from contextlib import asynccontextmanager
from collections.abc import AsyncGenerator
import logging

from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware

from app.config import FRONTEND_URL
from app.database.mongodb import check_database_health, close_mongo_client
from app.routes.admin import router as admin_router
from app.routes.contact import router as contact_router
from app.routes.feedback import router as feedback_router

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncGenerator[None, None]:
    yield
    close_mongo_client()


app = FastAPI(
    title="Sanjana Portfolio API",
    description="Contact form API for Pattusuri Sanjana's portfolio.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(contact_router)
app.include_router(feedback_router)
app.include_router(admin_router)


@app.get("/api/health")
def health_check(response: Response) -> dict[str, str]:
    database_connected = check_database_health()
    if not database_connected:
        logger.warning("Health check reports MongoDB as unavailable.")
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        database_status = "unavailable"
        api_status = "degraded"
    else:
        database_status = "connected"
        api_status = "healthy"

    return {"status": api_status, "database": database_status}