from datetime import datetime
from sqlalchemy import String , Integer , DateTime
from sqlalchemy.orm import Mapped , mapped_column
from app.db.base import Base


class AdminUser(Base):
    __tablename__="admin_user"

    id:Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username:Mapped[str]= mapped_column(String(50),unique=True, index=True, nullable=False)
    hashed_password:Mapped[str]=mapped_column(String(255),nullable=False)
    last_login:Mapped[datetime|None]= mapped_column(DateTime,nullable=True)

