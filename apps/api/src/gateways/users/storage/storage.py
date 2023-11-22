from sqlalchemy.exc import IntegrityError

from src.domains.core.storage import StorageSession
from src.domains.users import entities, gateways
from src.domains.users.gateways import UserAlreadyExists
from src.gateways.database import tables
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class DatabaseUsersStorage(gateways.IUsersStorage):
    def __init__(
        self,
        storage_session: StorageSession,
    ):
        self._storage_session = storage_session

    async def create(self, new_user: entities.CreateUserRequest) -> entities.UserInfo:
        async with self._storage_session.begin_db_session() as db_session:
            try:
                obj = tables.User(
                    email=new_user.email,
                    password=new_user.password,
                    name=new_user.name,
                    surname=new_user.surname,
                )
                db_session.add(obj)
                db_session.commit()
                db_session.refresh(obj)

                return self._map_orm_to_entity(obj)
            except IntegrityError:
                LOGGER.error("User with email %s already exists", new_user.email)
                raise UserAlreadyExists()

    def _map_orm_to_entity(self, user: tables.User) -> entities.UserInfo:
        return entities.UserInfo(
            uid=user.uid,
            email=user.email,
            password=user.password,
            name=user.name,
            surname=user.surname,
        )
