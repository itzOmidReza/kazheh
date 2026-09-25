from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.models.admin_user import AdminUser
from app.schemas.admin_user import AdminUserCreate


class AuthService:
    @staticmethod
    def get_by_phone(db: Session, phone: str) -> AdminUser | None:
        """Finds the admin by phone number."""
        query = select(AdminUser).where(AdminUser.phone == phone.strip())
        return db.execute(query).scalar_one_or_none()

    @staticmethod
    def get_by_username(db: Session, username: str) -> AdminUser | None:
        """Finds the admin by username."""
        query = select(AdminUser).where(AdminUser.username == username.strip())
        return db.execute(query).scalar_one_or_none()

    @staticmethod
    def authenticate(db: Session, phone: str, password: str) -> AdminUser | None:
        """
        Authenticates an admin by phone and password.
        Returns the AdminUser instance if valid, or None if invalid/inactive.
        """
        user = AuthService.get_by_phone(db, phone)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        if not user.is_active:
            return None
        return user

    @staticmethod
    def create_admin(db: Session, admin_in: AdminUserCreate) -> AdminUser:
        """Hashes the password and creates a new admin user record."""
        db_user = AdminUser(
            phone=admin_in.phone.strip(),
            username=admin_in.username.strip(),
            email=admin_in.email.strip() if admin_in.email else None,
            full_name=admin_in.full_name.strip() if admin_in.full_name else None,
            hashed_password=get_password_hash(admin_in.password),
        )
        try:
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            return db_user
        except Exception:
            db.rollback()
            raise