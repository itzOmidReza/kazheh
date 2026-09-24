from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from app.core.security import sanitize_content


class ContactMessageBase(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100, description="Client's full name")
    phone: str = Field(..., min_length=7, max_length=20, description="Client's phone number")
    email: EmailStr | None = Field(
        default=None,
        max_length=100,
        description="Client's email address",
    )
    subject: str | None = Field(
        default=None,
        max_length=200,
        description="Inquiry subject or consultation topic",
    )
    message: str = Field(..., min_length=10, max_length=5000, description="Message text")

    @field_validator("full_name", "subject", "message")
    @classmethod
    def sanitize_text_fields(cls, v: str | None) -> str | None:
        if v is None:
            return v
        return sanitize_content(v)


class ContactMessageCreate(ContactMessageBase):
    pass


class ContactMessageResponse(BaseModel):
    """
    Read model: deliberately free of length/format constraints so that a value
    already stored in the database can never fail response validation (which
    would surface as a 500 on a read endpoint).
    """

    id: int
    full_name: str
    phone: str
    email: str | None = None
    subject: str | None = None
    message: str
    is_read: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ContactMessageUpdate(BaseModel):
    is_read: bool
