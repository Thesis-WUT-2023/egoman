from uuid import UUID

from pydantic import BaseModel


class UserBaseProperties(BaseModel):
    email: str
    password: str


class UserInfo(UserBaseProperties):
    uid: UUID
    name: str
    surname: str


class CreateUserRequest(BaseModel):
    email: str
    password: str
    name: str
    surname: str


class LoginUserRequest(BaseModel):
    email: str
    password: str


class UpdateUserSettingsRequest(BaseModel):
    uid: UUID
    new_name: str
    new_surname: str


class UpdateUserPWDRequest(BaseModel):
    uid: UUID
    old_password: str
    new_password: str
