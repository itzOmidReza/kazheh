from pydantic_settings import BaseSettings , SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    DATABASE_URL:str
    SECRET_KEY:str
    ALGORITHM:str
    ACCESS_TOKEN_EXPIRE_MINUTES:int
    CORS_ORIGINS:str


    model_config = SettingsConfigDict(env_file='.env' , extra='ignore')


    @property 
    def get_cors_origin_list(self)->List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(',')]



settings = Settings()
