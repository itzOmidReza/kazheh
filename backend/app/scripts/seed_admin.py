import sys
from app.core.security import get_password_hash
from app.db.session import SessionLocal
from app.models.admin_user import AdminUser
from sqlalchemy import select


def seed_admin():
  phone = input("Enter admin phone: ").strip()
  username = input("Enter admin username: ").strip()
  password = input("Enter admin password: ").strip()

  if not phone or not username or not password:
    print("Error: All fields are required.")
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


if __name__ == "__main__":
  seed_admin()