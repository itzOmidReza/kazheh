"""Dependency-free, in-process rate limiting for abuse-sensitive endpoints.

The implementation is intentionally small: a sliding window of request
timestamps kept in memory, keyed by client IP. It protects a single process,
so when the API is scaled to several workers or instances the counters have to
move to a shared store (e.g. Redis); the public interface stays the same.
"""

from __future__ import annotations

import threading
import time
from collections import defaultdict, deque
from typing import Callable

from fastapi import HTTPException, Request, status

# Once this many distinct client keys are tracked, empty/expired ones are dropped
# so that a stream of spoofed/unique addresses cannot grow memory without bound.
_PRUNE_THRESHOLD = 1024


class SlidingWindowRateLimiter:
    """Counts requests per client key inside a rolling time window."""

    def __init__(self, max_requests: int, window_seconds: int) -> None:
        if max_requests < 1 or window_seconds < 1:
            raise ValueError("max_requests and window_seconds must be >= 1")
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        # Sync endpoints run in a thread pool, so the window has to be guarded.
        self._lock = threading.Lock()

    def check(self, key: str) -> None:
        """Record a hit for ``key`` or raise HTTP 429 when the window is full."""
        now = time.monotonic()
        cutoff = now - self.window_seconds

        with self._lock:
            hits = self._hits[key]
            while hits and hits[0] <= cutoff:
                hits.popleft()

            if len(hits) >= self.max_requests:
                retry_after = max(int(hits[0] + self.window_seconds - now) + 1, 1)
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Too many requests. Please try again later.",
                    headers={"Retry-After": str(retry_after)},
                )

            hits.append(now)

            if len(self._hits) > _PRUNE_THRESHOLD:
                self._prune(cutoff)

    def _prune(self, cutoff: float) -> None:
        """Drop keys with no hits left inside the window (called under lock)."""
        stale = [key for key, hits in self._hits.items() if not hits or hits[-1] <= cutoff]
        for key in stale:
            del self._hits[key]


def client_key(request: Request) -> str:
    """Best-effort client identifier; falls back to a constant bucket."""
    if request.client and request.client.host:
        return request.client.host
    return "unknown"


def rate_limit(limiter: SlidingWindowRateLimiter) -> Callable[[Request], None]:
    """Build a FastAPI dependency that enforces ``limiter`` per client."""

    def dependency(request: Request) -> None:
        limiter.check(client_key(request))

    return dependency
