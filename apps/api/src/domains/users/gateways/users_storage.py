import abc
from uuid import UUID

from src.domains.users import entities


class IUsersStorage(abc.ABC):
    @abc.abstractmethod
    async def create(self, new_user: entities.CreateUserRequest) -> entities.UserInfo:
        pass

    @abc.abstractmethod
    async def login(self, user: entities.LoginUserRequest) -> entities.UserInfo:
        pass

    @abc.abstractmethod
    async def update(
        self, uid: UUID, new_user_settings: entities.UpdateUserSettingsRequest
    ) -> bool:
        pass

    @abc.abstractmethod
    async def update_pwd(self, uid: UUID, new_password: entities.UpdateUserPWDRequest) -> bool:
        pass

    @abc.abstractmethod
    async def fetch_user(self, uid: UUID) -> entities.User:
        pass

    @abc.abstractmethod
    async def delete(self, uid: UUID) -> bool:
        pass
