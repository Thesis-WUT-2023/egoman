from sqlalchemy import select, and_
from sqlalchemy.exc import IntegrityError

from src.domains.core.storage import StorageSession
from src.domains.users import entities, gateways
from src.domains.users.gateways import UserAlreadyExists, WrongCreadentials
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
        async with self._storage_session.begin_session() as db_session:
            try:
                obj = tables.User(
                    email=new_user.email,
                    password=new_user.password,
                    name=new_user.name,
                    surname=new_user.surname,
                )
                db_session.add(obj)
                await db_session.commit()
                await db_session.refresh(obj)

            except IntegrityError:
                LOGGER.error("User with email %s already exists", new_user.email)
                raise UserAlreadyExists()
            
            return self._map_orm_to_entity(obj)
            
    async def login(self, user: entities.LoginUserRequest) -> entities.UserInfo:
        async with self._storage_session.begin_session() as db_session:
            query = select(tables.User).where(and_(tables.User.email == user.email, tables.User.password == user.password))
            result = await db_session.execute(query)
            obj = result.scalars().first()

            if obj is None:
                LOGGER.error("Wrong credentials for user %s", user.email)
                raise WrongCreadentials()
            
            return self._map_orm_to_entity(obj)
        
    async def update(self, new_user: entities.UpdateUserSettingsRequest) -> entities.UserInfo:
        async with self._storage_session.begin_session() as db_session:
            query = select(tables.User).where(tables.User.uid == new_user.uid)
            result = await db_session.execute(query)
            obj = result.scalars().first()

            if obj is None:
                LOGGER.error("Wrong credentials for user %s", new_user.uid)
                raise WrongCreadentials()
            
            obj.name = new_user.new_name
            obj.surname = new_user.new_surname

            await db_session.commit()
            await db_session.refresh(obj)
            
            return self._map_orm_to_entity(obj)

    def _map_orm_to_entity(self, user: tables.User) -> entities.UserInfo:
        return entities.UserInfo(
            uid=user.uid,
            email=user.email,
            password=user.password,
            name=user.name,
            surname=user.surname,
        )
