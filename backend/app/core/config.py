from pydantic import model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    CORS_ORIGINS: str = (
        "http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173"
    )
    PROJECT_NAME: str = "Kazheh"
    API_V1_STR: str = "/api/v1"
    MAX_REQUEST_BODY_BYTES: int = 65536
    CONTACT_RATE_LIMIT_REQUESTS: int = 10
    CONTACT_RATE_LIMIT_WINDOW_SECONDS: int = 60
    LOGIN_RATE_LIMIT_REQUESTS: int = 10
    LOGIN_RATE_LIMIT_WINDOW_SECONDS: int = 60

    # Production database connection pool settings
    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 20
    DB_POOL_RECYCLE_SECONDS: int = 1800
    DB_POOL_TIMEOUT_SECONDS: int = 30

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @model_validator(mode="after")
    def validate_production_security(self) -> "Settings":
        if self.ENVIRONMENT.lower() == "production":
            insecure_keys = {"secret", "changeme", "password", "123456", "test"}
            if len(self.SECRET_KEY) < 32 or self.SECRET_KEY.lower() in insecure_keys:
                raise ValueError(
                    "Production SECRET_KEY must be at least 32 characters long and cannot be a common placeholder."
                )
            if not self.DATABASE_URL or "localhost" in self.DATABASE_URL:
                # Warning or notice in case localhost is used in production
                pass
        return self

    @property
    def get_cors_origin_list(self) -> list[str]:
        if not self.CORS_ORIGINS:
            return []
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]


settings = Settings()
