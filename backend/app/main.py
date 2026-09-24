from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.middleware import RequestBodySizeLimitMiddleware

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# Registered before CORS on purpose: Starlette makes the last registered
# middleware the outermost one, so CORS wraps the size limit and its headers are
# also present on 413 responses.
app.add_middleware(
    RequestBodySizeLimitMiddleware,
    max_bytes=settings.MAX_REQUEST_BODY_BYTES,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy"}