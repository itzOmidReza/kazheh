"""Custom ASGI middleware used by the application."""

from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse, Response
from starlette.types import ASGIApp


class RequestBodySizeLimitMiddleware(BaseHTTPMiddleware):
    """Rejects requests whose declared body size exceeds ``max_bytes``.

    Only the ``Content-Length`` header is inspected, which covers the normal
    JSON/form submissions of this API. Chunked/streaming uploads bypass this
    check on purpose and are expected to be bounded by field validation.
    """

    def __init__(self, app: ASGIApp, max_bytes: int) -> None:
        super().__init__(app)
        self.max_bytes = max_bytes

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        content_length = request.headers.get("content-length")

        if content_length and content_length.isdigit() and int(content_length) > self.max_bytes:
            return JSONResponse(
                status_code=413,
                content={"detail": "Request body too large."},
            )

        return await call_next(request)
