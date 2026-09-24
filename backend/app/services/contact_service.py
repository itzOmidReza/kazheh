from sqlalchemy.orm import Session
from sqlalchemy import select, desc
from app.models.contact_message import ContactMessage
from app.schemas.contact_message import ContactMessageCreate, ContactMessageUpdate
from typing import List



class ContactMessageService:

    @staticmethod
    def create_message(db:Session, message_in:ContactMessageCreate) -> ContactMessage:
        """
        Takes validated Pydantic data, converts it to an ORM instance,
        and persists it to PostgreSQL.
        
        """

        # 1. Unpack the validated Pydantic schema into the SQLAlchemy model
        db_message = ContactMessage(
            full_name = message_in.full_name,
            phone = message_in.phone,
            email = message_in.email,
            message = message_in.message
        )
        # 2. Add to session and commit transaction
        db.add(db_message)
        db.commit()
        # 3. Refresh to populate DB-generated fields (id, created_at, default is_read)
        db.refresh(db_message)

        return db_message

    @staticmethod
    def get_message(db:Session, skip:int=0,limit:int=20,unread_only:bool=False)->List[ContactMessage]:
        """
        Retrieves a paginated list of messages, newest first.
        Optionally filters for unread messages.
        """

        query = select(ContactMessage).order_by(desc(ContactMessage.created_at))

        if unread_only == True:
            query = query.where(ContactMessage.is_read.is_(False))

        query  = query.offset(skip).limit(limit)


        result = db.execute(query)

        return list(result.scalars().all())

    @staticmethod
    def get_message_by_id(db:Session, message_id:int)-> ContactMessage | None:
        """
        Finds a single message by primary key. Returns None if not found.
        """

        query = select(ContactMessage).where(ContactMessage.id == message_id )

        result = db.execute(query)
        return result.scalar_one_or_none()

    
    @staticmethod
    def update_read_status(
        db: Session, db_message: ContactMessage, update_in: ContactMessageUpdate
    ) -> ContactMessage:
        """
        Updates the read state of an existing message.
        """
        db_message.is_read = update_in.is_read
        db.commit()
        db.refresh(db_message)
        return db_message

    @staticmethod
    def delete_message(db: Session, db_message: ContactMessage) -> None:
        """
        Removes a message from the database.
        """
        db.delete(db_message)
        db.commit()