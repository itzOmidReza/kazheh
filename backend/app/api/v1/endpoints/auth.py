from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.dependencies import get_db, get_current_admin
from app.core.rate_limit import SlidingWindowRateLimiter, rate_limit
from app.core.security import create_access_token, verify_password
from app.models.admin_user import AdminUser
from app.schemas.admin_user import (
    AdminUserResponse,
    AdminUserUpdate,
    PasswordChangeRequest,
    Token,
)
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


@router.patch(
    "/me",
    response_model=AdminUserResponse,
    status_code=status.HTTP_200_OK,
    summary="Update profile of the currently logged-in admin (partial update)",
    operation_id="update_current_admin_profile",
)
@router.put(
    "/me",
    response_model=AdminUserResponse,
    status_code=status.HTTP_200_OK,
    summary="Update profile of the currently logged-in admin (alias of PATCH /auth/me)",
    operation_id="replace_current_admin_profile",
)
def update_current_user_profile(
    payload: AdminUserUpdate,
    response: Response,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    """
    Updates the editable fields (`full_name`, `phone`) of the authenticated admin.

    Because `phone` is the JWT subject (and the login identifier), changing it
    invalidates the token used for the request. In that case a freshly signed
    token is returned in the `X-Refreshed-Access-Token` response header so the
    client can replace its stored token without forcing a re-login.
    """
    new_phone = payload.model_dump(exclude_unset=True).get("phone")
    if new_phone is not None:
        existing_admin = AuthService.get_by_phone(db, phone=new_phone.strip())
        if existing_admin and existing_admin.id != current_admin.id:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This phone number is already registered for another admin.",
            )

    previous_phone = current_admin.phone
    updated_admin = AuthService.update_admin(
        db=db, db_admin=current_admin, update_in=payload
    )

    if updated_admin.phone != previous_phone:
        response.headers["X-Refreshed-Access-Token"] = create_access_token(
            subject=updated_admin.phone
        )

    return updated_admin


@router.post(
    "/change-password",
    response_model=dict[str, str],
    status_code=status.HTTP_200_OK,
    summary="Change the password of the currently logged-in admin",
)
def change_current_admin_password(
    payload: PasswordChangeRequest,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    if not verify_password(payload.current_password, current_admin.hashed_password):
        # 400 (not 401) on purpose: a 401 would make clients treat the whole
        # session as expired and log the admin out.
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect.",
        )

    AuthService.change_password(
        db=db, db_admin=current_admin, new_password=payload.new_password
    )
    return {"message": "Password changed successfully."}