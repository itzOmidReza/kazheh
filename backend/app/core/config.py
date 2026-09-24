from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"
    PROJECT_NAME: str = "Kazheh"
    API_V1_STR: str = "/api/v1"
    MAX_REQUEST_BODY_BYTES: int = 65536
    CONTACT_RATE_LIMIT_REQUESTS: int = 10
    CONTACT_RATE_LIMIT_WINDOW_SECONDS: int = 60
    LOGIN_RATE_LIMIT_REQUESTS: int = 10
    LOGIN_RATE_LIMIT_WINDOW_SECONDS: int = 60

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def get_cors_origin_list(self) -> list[str]:
        if not self.CORS_ORIGINS:
            return []
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]


settings = Settings()
