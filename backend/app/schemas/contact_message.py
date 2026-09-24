from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ContactMessageBase(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100, description="Client's full name")
    phone: str = Field(..., min_length=7, max_length=20, description="Client's phone number")
    email: EmailStr | None = Field(
        default=None,
        max_length=100,
        description="Client's email address",
    )
    message: str = Field(..., min_length=10, max_length=5000, description="Message text")


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
    message: str
    is_read: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ContactMessageUpdate(BaseModel):
    is_read: bool
