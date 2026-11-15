import logging

from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database
from pymongo.errors import PyMongoError

from app.config import DATABASE_NAME, MONGODB_URI

logger = logging.getLogger(__name__)
COLLECTION_NAME = "contact_messages"
FEEDBACK_COLLECTION_NAME = "feedback"
SERVER_SELECTION_TIMEOUT_MS = 3000

_client: MongoClient | None = None
_client_uri: str | None = None


class DatabaseNotConfiguredError(RuntimeError):
    pass


def get_mongo_client() -> MongoClient:
    global _client, _client_uri

    if not MONGODB_URI:
        raise DatabaseNotConfiguredError("MONGODB_URI is not configured.")

    if _client is None or _client_uri != MONGODB_URI:
        close_mongo_client()
        _client = MongoClient(
            MONGODB_URI,
            serverSelectionTimeoutMS=SERVER_SELECTION_TIMEOUT_MS,
            tz_aware=True,
        )
        _client_uri = MONGODB_URI

    return _client


def get_database() -> Database:
    return get_mongo_client()[DATABASE_NAME]


def get_contact_collection() -> Collection:
    return get_database()[COLLECTION_NAME]


def get_feedback_collection() -> Collection:
    return get_database()[FEEDBACK_COLLECTION_NAME]


def check_database_health() -> bool:
    try:
        get_mongo_client().admin.command("ping")
    except DatabaseNotConfiguredError:
        return False
    except PyMongoError:
        logger.warning("MongoDB health check failed.")
        return False
    return True


def close_mongo_client() -> None:
    global _client, _client_uri

    if _client is not None:
        _client.close()
    _client = None
    _client_uri = None