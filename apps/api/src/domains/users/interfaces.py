import abc
from uuid import UUID

from pydantic import BaseModel

from src.domains.users import entities


class UserAlreadyExists(Exception):
    def __init__(self):
        super().__init__("User Already exists")


class WrongCreadentials(Exception):
    def __init__(self):
        super().__init__("Wrong Creadentials")


class NoUserFound(Exception):
    def __init__(self):
        super().__init__("No User Found")


class ICreateUser(abc.ABC):
    class Args(BaseModel):
        new_user: entities.CreateUserRequest

    class Result(entities.UserInfo):
        pass

    @abc.abstractmethod
    async def invoke(self, args: Args) -> Result:
        pass


class ILoginUser(abc.ABC):
    class Args(BaseModel):
        user: entities.LoginUserRequest

    class Result(entities.UserInfo):
        pass

    @abc.abstractmethod
    async def invoke(self, args: Args) -> Result:
        pass


class IUpdateUserSettings(abc.ABC):
    class Args(BaseModel):
        uid: UUID
        new_settings: entities.UpdateUserSettingsRequest

    class Result(BaseModel):
        success: bool

    @abc.abstractmethod
    async def invoke(self, args: Args) -> Result:
        pass


class IUpdateUserPWD(abc.ABC):
    class Args(BaseModel):
        uid: UUID
        new_password: entities.UpdateUserPWDRequest

    class Result(BaseModel):
        success: bool

    @abc.abstractmethod
    async def invoke(self, args: Args) -> Result:
        pass


class IFetchUser(abc.ABC):
    class Args(BaseModel):
        uid: UUID

    class Result(entities.User):
        pass

    @abc.abstractmethod
    async def invoke(self, args: Args) -> Result:
        pass


class IDeleteUser(abc.ABC):
    class Args(BaseModel):
        uid: UUID

    class Result(BaseModel):
        success: bool

    @abc.abstractmethod
    async def invoke(self, args: Args) -> Result:
        pass
