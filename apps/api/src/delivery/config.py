from enum import Enum
from os import getenv

from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()


class Config(BaseModel):
    DATABASE_URL: str = getenv("DATABASE_URL", "postgresql+asyncpg://postgres@database:5432/inflow")

    class Env(str, Enum):
        PRODUCTION = "production"
        STAGING = "staging"
        DEVELOPMENT = "development"
        TESTING = "testing"

    ENV: Env = Env.DEVELOPMENT


config = Config()
