from src.domains.core.mappers import BaseEntityMapper
from src.domains.users.entities import UserInfo
from src.gateways.database import tables


class UserMapper(BaseEntityMapper[tables.User, UserInfo]):
    def to_schema(self, entity: UserInfo) -> tables.User:
        return tables.User(
            email=entity.email,
            password=entity.password,
            name=entity.name,
            surname=entity.surname,
        )

    def from_schema(self, schema: tables.User) -> UserInfo:
        return UserInfo(
            uid=schema.uid,
            email=schema.email,
            password=schema.password,
            name=schema.name,
            surname=schema.surname,
        )
