from uuid import UUID

from pydantic import BaseModel

from src.domains.users import entities


class TokenBaseProperties(BaseModel):
    token: str
    user_uid: UUID


class Token(TokenBaseProperties):
    uid: UUID
    user: entities.UserInfo


class CreateTokenRequest(TokenBaseProperties):
    pass
