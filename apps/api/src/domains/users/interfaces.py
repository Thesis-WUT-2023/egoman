import abc

from pydantic import BaseModel

from src.domains.users import entities


class UserAlreadyExists(Exception):
    def __init__(self):
        super().__init__("User Already exists")


class WrongCreadentials(Exception):
    def __init__(self):
        super().__init__("Wrong Creadentials")


class IFetchUser(abc.ABC):
    class Args(BaseModel):
        email: str
        password: str

    class Result(entities.UserInfo):
        pass

    @abc.abstractmethod
    async def invoke(self, args: Args) -> Result:
        pass


class ICreateUser(abc.ABC):
    class Args(BaseModel):
        new_user: entities.CreateUserRequest

    class Result(entities.UserInfo):
        pass

    @abc.abstractmethod
    async def invoke(self, args: Args) -> Result:
        pass

