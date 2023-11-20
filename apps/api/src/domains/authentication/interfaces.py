import abc
from typing import Optional

from pydantic import BaseModel

from src.domains.authentication import entities
from src.domains.users.entities import UserInfo


class TokenNotFound(Exception):
    def __init__(self):
        super().__init__("Token not found")


class Unauthorized(Exception):
    def __init__(self):
        super().__init__("Unauthorized")


class ICreateToken(abc.ABC):
    class Args(BaseModel):
        req: entities.CreateTokenRequest

    class Result(entities.Token):
        pass

    @abc.abstractmethod
    async def invoke(self, args: Args) -> Result:
        pass


class IAuthenticateUser(abc.ABC):
    class Args(BaseModel):      
        access_token: str

    class Result(BaseModel):
        success: bool
        user: Optional[UserInfo]

    @abc.abstractmethod
    async def invoke(self, args: Args) -> Result:
        pass
