from fastapi import APIRouter
from app.api.v1.endpoints import contact_messages, auth

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(contact_messages.router)

