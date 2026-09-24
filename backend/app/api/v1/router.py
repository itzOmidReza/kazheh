from fastapi import APIRouter
from app.api.v1.endpoints import contact_messages, auth, articles

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(contact_messages.router)
api_router.include_router(articles.router)