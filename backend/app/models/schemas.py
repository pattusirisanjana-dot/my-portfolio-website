from datetime import datetime
import re
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


MOBILE_PATTERN = re.compile(r"^\+?[0-9](?:[0-9\s().-]*[0-9])?$")


def validate_optional_mobile(value: str | None) -> str | None:
    if value is None or not value.strip():
        return None

    mobile = value.strip()
    digit_count = sum(character.isdigit() for character in mobile)
    if not MOBILE_PATTERN.fullmatch(mobile) or not 7 <= digit_count <= 15:
        raise ValueError("Enter a valid phone number with 7 to 15 digits.")
    return mobile


class ContactMessage(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1, max_length=100)
    email: EmailStr = Field(max_length=254)
    mobile: str | None = Field(default=None, max_length=25)
    subject: str = Field(min_length=2, max_length=150)
    message: str = Field(min_length=1, max_length=5000)

    @field_validator("mobile")
    @classmethod
    def validate_mobile(cls, value: str | None) -> str | None:
        return validate_optional_mobile(value)


class FeedbackSubmission(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1, max_length=100)
    email: EmailStr = Field(max_length=254)
    mobile: str | None = Field(default=None, max_length=25)
    category: Literal[
        "Website Feedback",
        "Design",
        "Content",
        "Suggestion",
        "Other",
    ]
    feedback: str = Field(min_length=1, max_length=5000)
    rating: int | None = Field(default=None, ge=1, le=5)

    @field_validator("mobile")
    @classmethod
    def validate_mobile(cls, value: str | None) -> str | None:
        return validate_optional_mobile(value)


class ContactSubmissionResponse(BaseModel):
    success: bool
    message: str


class ContactMessageRecord(ContactMessage):
    id: str
    created_at: datetime
    status: str = "unread"