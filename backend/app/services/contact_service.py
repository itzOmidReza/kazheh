from typing import List
from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from app.models.contact_message import ContactMessage
from app.schemas.contact_message import ContactMessageCreate, ContactMessageUpdate


class ContactMessageService:
    @staticmethod
    def create_message(db: Session, message_in: ContactMessageCreate) -> ContactMessage:
        """
        Takes validated Pydantic data, converts it to an ORM instance,
        and persists it to PostgreSQL.
        """
        db_message = ContactMessage(
            full_name=message_in.full_name.strip(),
            phone=message_in.phone.strip(),
            email=message_in.email.strip() if message_in.email else None,
            subject=message_in.subject.strip() if message_in.subject else None,
            message=message_in.message.strip(),
        )
        try:
            db.add(db_message)
            db.commit()
            db.refresh(db_message)
            return db_message
        except Exception:
            db.rollback()
            raise

    @staticmethod
    def get_message(
        db: Session,
        skip: int = 0,
        limit: int = 20,
        unread_only: bool = False,
    ) -> List[ContactMessage]:
        """
        Retrieves a paginated list of messages, newest first.
        Optionally filters for unread messages.
        """
        query = select(ContactMessage).order_by(desc(ContactMessage.created_at))

        if unread_only:
            query = query.where(ContactMessage.is_read.is_(False))

        query = query.offset(skip).limit(limit)
        result = db.execute(query)
        return list(result.scalars().all())

    @staticmethod
    def get_message_by_id(db: Session, message_id: int) -> ContactMessage | None:
        """Finds a single message by primary key. Returns None if not found."""
        query = select(ContactMessage).where(ContactMessage.id == message_id)
        result = db.execute(query)
        return result.scalar_one_or_none()

    @staticmethod
    def update_read_status(
        db: Session, db_message: ContactMessage, update_in: ContactMessageUpdate
    ) -> ContactMessage:
        """Updates the read state of an existing message."""
        try:
            db_message.is_read = update_in.is_read
            db.commit()
            db.refresh(db_message)
            return db_message
        except Exception:
            db.rollback()
            raise

    @staticmethod
    def delete_message(db: Session, db_message: ContactMessage) -> None:
        """Removes a message from the database."""
        try:
            db.delete(db_message)
            db.commit()
        except Exception:
            db.rollback()
            raise