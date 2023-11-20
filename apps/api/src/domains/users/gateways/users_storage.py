import abc

from src.domains.users import entities


class IUsersStorage(abc.ABC):
    @abc.abstractmethod
    async def create(self, new_user: entities.CreateUserRequest) -> entities.UserInfo:
        pass