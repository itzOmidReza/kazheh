from pydantic_settings import BaseSettings , SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    DATABASE_URL:str
    SECRET_KEY:str
    ALGORITHM:str
    ACCESS_TOKEN_EXPIRE_MINUTES:int
    CORS_ORIGINS:str
    PROJECT_NAME:str = 'Kajheh'
    API_V1_STR: str = "/api/v1"
    MAX_REQUEST_BODY_BYTES: int = 65536
    CONTACT_RATE_LIMIT_REQUESTS: int = 10
    CONTACT_RATE_LIMIT_WINDOW_SECONDS: int = 60
    LOGIN_RATE_LIMIT_REQUESTS: int = 10
    LOGIN_RATE_LIMIT_WINDOW_SECONDS: int = 60


    model_config = SettingsConfigDict(env_file='.env' , extra='ignore')


    @property 
    def get_cors_origin_list(self)->List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(',') if origin.strip()]



settings = Settings()
