import abc

from src.domains.auth import entities


class IAuthBearer(abc.ABC):
    @abc.abstractmethod
    def verify(self, token: entities.Token) -> bool:
        pass
