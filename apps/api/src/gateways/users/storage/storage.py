from sqlalchemy import and_
from sqlalchemy.exc import IntegrityError

from src.domains.users import entities, gateways
from src.domains.users.gateways import UserAlreadyExists, WrongCreadentials
from src.gateways.database import tables
from src.gateways.storage import IStorageAggregate
from src.gateways.users.mappers import UserMapper
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class DatabaseUsersStorage(gateways.IUsersStorage):
    def __init__(
        self,
        storage_session: IStorageAggregate.IStorageSession,
        user_mapper: UserMapper,
    ):
        self._storage_session = storage_session
        self._user_mapper = user_mapper

    async def create(self, new_user: entities.CreateUserRequest) -> entities.User:
        async with self._storage_session.begin_db_session() as db_session:
            try:
                obj = tables.User(
                    email=new_user.email,
                    password=new_user.password,
                    name=new_user.name,
                    surname=new_user.surname
                )
                db_session.add(obj)
                db_session.commit()
                db_session.refresh(obj)

                return self._user_mapper.from_schema(obj)
            except IntegrityError:
                LOGGER.error("User with email %s already exists", new_user.email)
                raise UserAlreadyExists()
