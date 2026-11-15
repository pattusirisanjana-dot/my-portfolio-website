from datetime import datetime, timezone
from pymongo import DESCENDING

from app.database.mongodb import get_contact_collection, get_feedback_collection
from app.models.schemas import ContactMessage, ContactMessageRecord, FeedbackSubmission


def save_contact_message(contact: ContactMessage) -> None:
    document = contact.model_dump()
    document["created_at"] = datetime.now(timezone.utc)
    document["status"] = "unread"
    get_contact_collection().insert_one(document)


def save_feedback(feedback: FeedbackSubmission) -> None:
    document = feedback.model_dump()
    document["created_at"] = datetime.now(timezone.utc)
    get_feedback_collection().insert_one(document)


def _to_contact_message_record(document: dict) -> ContactMessageRecord:
    return ContactMessageRecord(
        id=str(document["_id"]),
        name=document["name"],
        email=document["email"],
        mobile=document.get("mobile"),
        subject=document["subject"],
        message=document["message"],
        created_at=document["created_at"],
        status=document.get(
            "status",
            "read" if document.get("is_read") else "unread",
        ),
    )


def get_contact_messages(limit: int, skip: int) -> list[ContactMessageRecord]:
    cursor = (
        get_contact_collection()
        .find({})
        .sort("created_at", DESCENDING)
        .skip(skip)
        .limit(limit)
    )
    return [_to_contact_message_record(document) for document in cursor]