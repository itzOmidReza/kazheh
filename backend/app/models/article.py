from datetime import datetime
from sqlalchemy import Integer , String , Boolean, Text , ForeignKey , func , DateTime
from sqlalchemy.orm import Mapped , mapped_column , relationship
from app.db.base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.admin_user import AdminUser

class Article(Base):
    __tablename__ = 'article'


    id:Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title:Mapped[str] = mapped_column(String(200),nullable=False)
    slug:Mapped[str] = mapped_column(String(220),unique=True,index=True,nullable=False)
    summary:Mapped[str|None] = mapped_column(String(500),nullable=True)
    content : Mapped[str] = mapped_column(Text,nullable=False)
    is_published : Mapped[bool] = mapped_column(Boolean, default=False,nullable=False)

    author_id:Mapped[int] = mapped_column(Integer , ForeignKey("admin_users.id"),nullable=False)

    created_at:Mapped[datetime] = mapped_column(DateTime(timezone=True) , server_default=func.now(), nullable=False )
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now() , onupdate=func.now(), nullable=False)


    author: Mapped["AdminUser"] = relationship("AdminUser", backref="articles")