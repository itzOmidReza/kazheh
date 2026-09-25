import logging
from fastapi import Depends, FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.dependencies import get_db
from app.core.middleware import RequestBodySizeLimitMiddleware

# Configure structured application logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s (%(filename)s:%(lineno)d): %(message)s",
)
logger = logging.getLogger("kazheh.backend")

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)


# Global unhandled exception handler to prevent leaking internal traces/schemas
@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.error(
        f"Unhandled exception on {request.method} {request.url.path}: {exc}",
        exc_info=True,
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Internal server error. Please contact support if the issue persists."},
    )


# 1. Resolve and normalize CORS allowed origins
raw_origins = getattr(settings, "get_cors_origin_list", [])
if callable(raw_origins):
    allowed_origins = list(raw_origins())
elif isinstance(raw_origins, (list, tuple, set)):
    allowed_origins = list(raw_origins)
else:
    allowed_origins = []

# Guarantee all common local frontend ports & hosts are present
dev_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]
for origin in dev_origins:
    if origin not in allowed_origins:
        allowed_origins.append(origin)


# 2. Register Middleware
# Starlette executes middleware in reverse registration order (last added = outermost).
# CORSMiddleware must wrap RequestBodySizeLimitMiddleware so preflight OPTIONS requests
# and error responses are handled immediately with correct CORS headers.
app.add_middleware(
    RequestBodySizeLimitMiddleware,
    max_bytes=settings.MAX_REQUEST_BODY_BYTES,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    # Regex matches any port on localhost or 127.0.0.1 (HTTP & HTTPS)
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


# 3. Mount API Routers
app.include_router(api_router, prefix=settings.API_V1_STR)


# 4. Mount Static Uploads
from pathlib import Path
from fastapi.staticfiles import StaticFiles

UPLOAD_DIR = Path("uploads")
(UPLOAD_DIR / "articles").mkdir(parents=True, exist_ok=True)
app.mount("/static", StaticFiles(directory=str(UPLOAD_DIR)), name="static")


# 5. Health Probe
@app.get("/health", tags=["Health"])
def health_check(db: Session = Depends(get_db)):
    """Active health probe verifying database connectivity."""
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        logger.error(f"Health check database ping failed: {e}")
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"status": "error", "database": "disconnected"},
        )