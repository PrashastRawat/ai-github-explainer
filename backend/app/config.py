from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    GITHUB_TOKEN: str
    OPENAI_API_KEY: str
    ALLOWED_ORIGINS: str = "http://localhost:5173"

    class Config:
        env_file = ".env"

settings = Settings()