from collections.abc import Generator
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import ALGORITHM
from app.db.session import SessionLocal
from app.models.admin_user import AdminUser
from app.schemas.admin_user import TokenPayload
from app.services.auth_service import AuthService

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

# Optional variant of the same scheme (auto_error=False) so that public read
# endpoints can detect an already-authenticated admin without forcing auth.
oauth2_scheme_optional = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login",
    auto_error=False,
)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_admin(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
) -> AdminUser:
    """
    Decodes the Bearer token, validates expiration/signature,
    and returns the authenticated AdminUser instance.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        phone: str = payload.get("sub")
        if not phone or not str(phone).strip():
            raise credentials_exception
        token_data = TokenPayload(sub=str(phone).strip())
    except JWTError:
        raise credentials_exception

    user = AuthService.get_by_phone(db, phone=token_data.sub)
    if user is None:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive admin account",
        )
    return user


def get_optional_admin(
    db: Session = Depends(get_db),
    token: str | None = Depends(oauth2_scheme_optional),
) -> AdminUser | None:
    """
    Same validation as `get_current_admin`, but never raises: a missing,
    malformed or expired token simply resolves to `None`.

    Used by public read endpoints (e.g. listing articles) that must stay
    accessible without a token, while additionally exposing draft content to
    an already-authenticated admin.
    """
    if not token:
        return None

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        phone: str = payload.get("sub")
    except JWTError:
        return None

    if not phone or not str(phone).strip():
        return None

    user = AuthService.get_by_phone(db, phone=str(phone).strip())
    if user is None or not user.is_active:
        return None
    return user