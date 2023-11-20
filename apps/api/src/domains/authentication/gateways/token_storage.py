import abc
from uuid import UUID

from src.domains.authentication import entities


class ITokenStorage(abc.ABC):
    @abc.abstractmethod
    async def create(self, new_token: entities.CreateTokenRequest) -> entities.Token:
        pass

    @abc.abstractmethod
    async def fetch_one_by_token(self, token: str) -> entities.Token:
        pass

    @abc.abstractmethod
    async def update_one_by_user_uid(self, user_uid: UUID, new_token: str) -> entities.Token:
        pass
