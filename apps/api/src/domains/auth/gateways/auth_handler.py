import abc
from uuid import UUID

from src.domains.auth import entities


class IAuthHandler(abc.ABC):
    @abc.abstractmethod
    def encode(self, user_uid: UUID) -> entities.Token:
        pass

    @abc.abstractmethod
    def decode(self, token: str) -> UUID:
        pass
