# app/db/__init__.py
from backend.app.db.base import Base
from backend.app.db.session import engine, SessionLocal

__all__ = ["Base", "engine", "SessionLocal"]