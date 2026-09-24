from datetime import datetime, timedelta, timezone
from typing import Any
from jose import jwt
from passlib.context import CryptContext
from app.core.config import settings

BCRYPT_MAX_PASSWORD_BYTES = 72

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# Single source of truth: the signing algorithm comes from the environment.
ALGORITHM = settings.ALGORITHM


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies that a plain text password matches the stored bcrypt hash.
    Safely rejects empty strings or passwords exceeding the 72-byte Bcrypt limit
    without throwing length/compatibility errors or consuming excessive CPU.
    """
    if not plain_password or not hashed_password:
        return False
    if len(plain_password.encode("utf-8")) > BCRYPT_MAX_PASSWORD_BYTES:
        return False
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except Exception:
        return False


def get_password_hash(password: str) -> str:
    """
    Creates a salted bcrypt hash from a plain text password.
    Enforces the 72-byte limit to prevent silent truncation or backend errors.
    """
    if len(password.encode("utf-8")) > BCRYPT_MAX_PASSWORD_BYTES:
        raise ValueError(
            f"Password cannot exceed {BCRYPT_MAX_PASSWORD_BYTES} bytes (Bcrypt limit)"
        )
    return pwd_context.hash(password)


def create_access_token(subject: str | Any, expires_delta: timedelta | None = None) -> str:
    """Encodes a JWT with an expiration timestamp and signs it using SECRET_KEY."""
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )

    # 'sub' (subject) holds the unique identity (phone number)
    to_encode = {"exp": expire, "sub": str(subject)}
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)