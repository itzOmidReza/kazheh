from fastapi import status, Depends , HTTPException , Query, APIRouter
from sqlalchemy.orm import Session
from typing import List
from app.core.config import settings
from app.core.dependencies import get_db , get_current_admin
from app.core.rate_limit import SlidingWindowRateLimiter, rate_limit
from app.schemas.contact_message import (ContactMessageCreate, ContactMessageResponse, ContactMessageUpdate)

from app.services.contact_service import ContactMessageService
from app.models.admin_user import AdminUser


router = APIRouter(prefix='/contact',tags=['Contact Message'])

# The submit endpoint is public, so it is rate limited per client IP to keep it
# from being used as a spam/DoS entry point.
submit_limiter = SlidingWindowRateLimiter(
    max_requests=settings.CONTACT_RATE_LIMIT_REQUESTS,
    window_seconds=settings.CONTACT_RATE_LIMIT_WINDOW_SECONDS,
)


# public 
@router.post(
    "",
    response_model = ContactMessageResponse,
    status_code=status.HTTP_201_CREATED,
    summary= "Created a contact form message",
    dependencies=[Depends(rate_limit(submit_limiter))],
)
def create_message(payload:ContactMessageCreate, db:Session=Depends(get_db)):
    """
    Public endpoint for clients to submit an inquiry or appointment request.
    """
    return ContactMessageService.create_message(db= db , message_in = payload)



# --- protected ---

@router.get(
    "",
    response_model = List[ContactMessageResponse],
    status_code = status.HTTP_200_OK,
    summary = "List of the contact messages"
)
def list_messages(
    db:Session=Depends(get_db),
    skip:int=Query(default=0,ge=0,description='offset for paggination'),
    limit:int=Query(default=20,ge=1,le=100,description='items per page'),
    unread_only:bool= Query(default=False, description= 'filters for unread messages'),
    current_admin:AdminUser = Depends(get_current_admin)
):
    return ContactMessageService.get_message(db , skip, limit, unread_only)

@router.get(
    "/{message_id}",
    response_model = ContactMessageResponse,
    status_code = status.HTTP_200_OK,
    summary= 'retrieves a contact message by id'

)
def get_message(message_id:int,db:Session = Depends(get_db),current_admin:AdminUser = Depends(get_current_admin)
 ):

    message = ContactMessageService.get_message_by_id(db = db , message_id = message_id)
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"Contact message with ID {message_id} not found.")

    return message

@router.patch(
    "/{message_id}",
    response_model=ContactMessageResponse,
    status_code=status.HTTP_200_OK,
    summary="Update message read status",
)
def update_message_status(
    message_id: int,
    payload: ContactMessageUpdate,
    db: Session = Depends(get_db),
    current_admin:AdminUser = Depends(get_current_admin)

):
    message = ContactMessageService.get_message_by_id(db=db, message_id=message_id)
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact message with ID {message_id} not found.",
        )
    return ContactMessageService.update_read_status(
        db=db, db_message=message, update_in=payload
    )


@router.delete(
    "/{message_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a contact message",
)
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_admin:AdminUser = Depends(get_current_admin)

):
    message = ContactMessageService.get_message_by_id(db=db, message_id=message_id)
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact message with ID {message_id} not found.",
        )
    ContactMessageService.delete_message(db=db, db_message=message)
    return None