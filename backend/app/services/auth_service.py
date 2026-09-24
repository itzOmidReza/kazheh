from sqlalchemy import select 
from sqlalchemy.orm import Session 
from app.models.admin_user import AdminUser
from app.schemas.admin_user import AdminUserCreate
from app.core.security import get_password_hash , verify_password


class AuthService:

    @staticmethod
    def get_by_phone(db:Session,phone:str )-> AdminUser|None:
        """finds the admin by admin phone number"""

        query = select(AdminUser).where(AdminUser.phone == phone)
        result = db.execute(query).scalar_one_or_none()
        return result

    @staticmethod
    def get_by_username(db:Session, username:str)->AdminUser|None:
        """finds the admin by username"""
        query = select(AdminUser).where(AdminUser.username == username)
        result = db.execute(query).scalar_one_or_none()
        return result

    @staticmethod
    def authenticate(db:Session , phone:str, password:str)->AdminUser|None:
        """
        Authenticates an admin by phone and password.
        Returns the AdminUser instance if valid, or None if invalid/inactive.

        """

        user = AuthService.get_by_phone(db,phone)

        if not user:
            return None
        elif not verify_password(password,user.hashed_password ):
            return None
        elif not user.is_active:
            return None
        else:
            return user    

    @staticmethod
    def create_admin(db:Session , admin_in:AdminUserCreate)->AdminUser:
        """Hashes the password and creates a new admin user record."""

        db_user = AdminUser(
            phone=admin_in.phone,
            username=admin_in.username,
            email=admin_in.email,
            full_name=admin_in.full_name,
            hashed_password=get_password_hash(admin_in.password),
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
        