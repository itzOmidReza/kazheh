from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.dependencies import get_db, get_current_admin
from app.core.rate_limit import SlidingWindowRateLimiter, rate_limit
from app.core.security import create_access_token
from app.models.admin_user import AdminUser
from app.schemas.admin_user import AdminUserResponse, Token
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Slows down credential stuffing / brute force attempts against the login form.
login_limiter = SlidingWindowRateLimiter(
    max_requests=settings.LOGIN_RATE_LIMIT_REQUESTS,
    window_seconds=settings.LOGIN_RATE_LIMIT_WINDOW_SECONDS,
)


@router.post(
    "/login",
    response_model=Token,
    summary="Login with phone and password to get a JWT access token",
    dependencies=[Depends(rate_limit(login_limiter))],
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    # form_data.username carries the phone number entered in Swagger
    user = AuthService.authenticate(
        db,
        phone=form_data.username,
        password=form_data.password,
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect phone number or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(subject=user.phone)
    return {"access_token": access_token, "token_type": "bearer"}


@router.get(
    "/me",
    response_model=AdminUserResponse,
    summary="Get profile of the currently logged-in admin",
)
def get_current_user_profile(
    current_admin: AdminUser = Depends(get_current_admin),
):
    return current_admin