import abc

from src.domains.users.entities import UserInfo


class IAuthService(abc.ABC):
    @abc.abstractmethod
    async def get_user(self, email: str, password: str, access_token: str) -> UserInfo:
        pass
