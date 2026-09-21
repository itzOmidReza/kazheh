from datetime import datetime , timezone
from sqlalchemy import Integer , String, DateTime, Boolean, Text
from sqlalchemy.orm import Mapped , mapped_column
from app.db.base import Base

class ContactMessage(Base):
    __tablename__ = 'contact_messages'


    id: Mapped[int] = mapped_column(Integer,primary_key=True,index=True)
    full_name: Mapped[str] = mapped_column(String(100),nullable=False)
    phone:Mapped[str] = mapped_column(String(20),nullable=False)
    email:Mapped[str|None] = mapped_column(String(100),nullable=True)
    message:Mapped[str]= mapped_column(Text,nullable=False)
    is_read:Mapped[bool] = mapped_column(Boolean,default=False,nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
)


