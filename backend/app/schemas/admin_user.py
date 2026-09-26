from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

from app.core.security import sanitize_content

# passlib's bcrypt handler (and bcrypt itself) only take the first 72 bytes of a
# password into account; anything beyond that is silently ignored, so the limit
# is enforced here instead of silently weakening the password at login time.
BCRYPT_MAX_PASSWORD_BYTES = 72


class AdminUserBase(BaseModel):
    phone:str = Field(...,min_length = 7 , max_length=20, description = 'Admin contact phone number' )
    full_name:str|None = Field(default=None , min_length=3 , max_length=100)
    email: EmailStr | None = Field(default=None, max_length=255)
    username:str = Field(...,min_length=3, max_length=50)


class AdminUserCreate(AdminUserBase):
    password: str = Field(
        ...,
        min_length=8,
        max_length=BCRYPT_MAX_PASSWORD_BYTES,
        description=f"Admin password (max {BCRYPT_MAX_PASSWORD_BYTES} bytes, bcrypt limit)",
    )

    @field_validator("password")
    @classmethod
    def _password_fits_bcrypt(cls, value: str) -> str:
        if len(value.encode("utf-8")) > BCRYPT_MAX_PASSWORD_BYTES:
            raise ValueError(
                f"Password must be at most {BCRYPT_MAX_PASSWORD_BYTES} bytes (bcrypt limit)"
            )
        return value



class AdminUserResponse(BaseModel):
    """
    Read model: deliberately free of length/format constraints so that a value
    already stored in the database can never fail response validation (which
    would surface as a 500 on a read endpoint).
    """

    id: int
    phone: str
    username: str
    full_name: str | None = None
    email: str | None = None
    is_active: bool
    is_superuser: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AdminUserUpdate(BaseModel):
    """
    Partial update payload for the currently authenticated admin profile.

    Only the fields present in the request body are modified. Any other key
    sent by the client (for instance the read-only `username`) is ignored.
    """

    phone: str | None = Field(
        default=None,
        min_length=7,
        max_length=20,
        description="Admin contact phone number (also used as the login identifier)",
    )
    full_name: str | None = Field(default=None, min_length=3, max_length=100)

    @field_validator("full_name")
    @classmethod
    def sanitize_full_name(cls, value: str | None) -> str | None:
        if value is None:
            return value
        return sanitize_content(value)


class PasswordChangeRequest(BaseModel):
    """Payload for changing the password of the currently authenticated admin."""

    current_password: str = Field(..., min_length=1, description="Current admin password")
    new_password: str = Field(
        ...,
        min_length=8,
        max_length=BCRYPT_MAX_PASSWORD_BYTES,
        description=(
            "New admin password (min 8 characters, "
            f"max {BCRYPT_MAX_PASSWORD_BYTES} bytes - bcrypt limit)"
        ),
    )

    @field_validator("new_password")
    @classmethod
    def _new_password_fits_bcrypt(cls, value: str) -> str:
        if len(value.encode("utf-8")) > BCRYPT_MAX_PASSWORD_BYTES:
            raise ValueError(
                f"Password must be at most {BCRYPT_MAX_PASSWORD_BYTES} bytes (bcrypt limit)"
            )
        return value


class AdminLoginRequest(BaseModel):
    phone:str=Field(...,description='Registered admin phone number')
    password: str = Field(
        ...,
        min_length=8,
        max_length=BCRYPT_MAX_PASSWORD_BYTES,
        description="Admin password",
    )


# JWT response schema
class Token(BaseModel):
    access_token:str
    token_type:str = 'bearer'


# JWT response schema
class TokenPayload(BaseModel):
    sub: str | None = None