import abc

from src.domains.users import entities


class IUsersStorage(abc.ABC):
    @abc.abstractmethod
    async def create(self, new_user: entities.CreateUserRequest) -> entities.UserInfo:
        pass

    @abc.abstractmethod
    async def login(self, new_user: entities.LoginUserRequest) -> entities.UserInfo:
        pass

    @abc.abstractmethod
    async def update(self, new_user: entities.UpdateUserSettingsRequest) -> entities.UserInfo:
        pass
