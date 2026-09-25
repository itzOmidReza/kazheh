import sys
from sqlalchemy import select

from app.core.security import BCRYPT_MAX_PASSWORD_BYTES, get_password_hash
from app.db.session import SessionLocal
from app.models.admin_user import AdminUser


def seed_admin():
    phone = input("Enter admin phone: ").strip()
    username = input("Enter admin username: ").strip()
    password = input("Enter admin password: ").strip()

    if not phone or not username or not password:
        print("Error: All fields are required.")
        sys.exit(1)

    if len(phone) < 7 or len(phone) > 20:
        print("Error: Phone number must be between 7 and 20 characters.")
        sys.exit(1)

    if len(username) < 3 or len(username) > 50:
        print("Error: Username must be between 3 and 50 characters.")
        sys.exit(1)

    if len(password) < 8:
        print("Error: Password must be at least 8 characters.")
        sys.exit(1)

    if len(password.encode("utf-8")) > BCRYPT_MAX_PASSWORD_BYTES:
        print(f"Error: Password cannot exceed {BCRYPT_MAX_PASSWORD_BYTES} bytes (Bcrypt limit).")
        sys.exit(1)

    with SessionLocal() as db:
        existing_user = db.execute(
            select(AdminUser).where(
                (AdminUser.phone == phone) | (AdminUser.username == username)
            )
        ).scalar_one_or_none()

        if existing_user:
            print("Error: Admin with this phone or username already exists.")
            sys.exit(1)

        try:
            admin = AdminUser(
                phone=phone,
                username=username,
                hashed_password=get_password_hash(password),
                is_active=True,
                is_superuser=True,
            )
            db.add(admin)
            db.commit()
            print(f"Success: Superuser '{username}' created successfully.")
        except Exception as e:
            db.rollback()
            print(f"Error creating admin: {e}")
            sys.exit(1)


if __name__ == "__main__":
    seed_admin()