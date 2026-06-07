from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str

    POSTGRES_USER: str | None = None
    POSTGRES_PASSWORD: str | None = None
    POSTGRES_DB: str | None = None
    POSTGRES_HOST: str | None = None
    POSTGRES_PORT: int | None = None

    class Config:
        env_file = ".env"

settings = Settings()