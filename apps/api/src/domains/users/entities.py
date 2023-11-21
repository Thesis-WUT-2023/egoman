from uuid import UUID

from pydantic import BaseModel


class UserBaseProperties(BaseModel):
    email: str
    password: str
    name: str
    surname: str


class UserInfo(UserBaseProperties):
    uid: UUID


class CreateUserRequest(UserBaseProperties):
    pass
