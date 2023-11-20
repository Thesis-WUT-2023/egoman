from uuid import UUID

from pydantic import BaseModel


class UserBaseProperties(BaseModel):
    email: str
    password: str


class UserInfo(UserBaseProperties):
    uid: UUID
    name: str
    surname: str


class CreateUserRequest(UserInfo):
    pass
