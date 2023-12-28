from uuid import UUID

from pydantic import BaseModel, EmailStr


class UserBaseProperties(BaseModel):
    email: EmailStr
    password: str


class UserInfo(UserBaseProperties):
    uid: UUID
    name: str
    surname: str


class User(BaseModel):
    email: EmailStr
    name: str
    surname: str


class CreateUserRequest(BaseModel):
    email: EmailStr
    password: str
    name: str
    surname: str


class LoginUserRequest(BaseModel):
    email: EmailStr
    password: str


class UpdateUserSettingsRequest(BaseModel):
    new_name: str
    new_surname: str


class UpdateUserPWDRequest(BaseModel):
    old_password: str
    new_password: str
