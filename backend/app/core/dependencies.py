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
        if phone is None:
            raise credentials_exception
        token_data = TokenPayload(sub=phone)
    except JWTError:
        raise credentials_exception

    user = AuthService.get_by_phone(db, phone=token_data.sub)
    if user is None:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive admin account",
        )
    return user