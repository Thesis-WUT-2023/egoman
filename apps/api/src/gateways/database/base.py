import logging
from contextlib import asynccontextmanager

from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import async_scoped_session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session as AlchemySession

from src.gateways.storage import IsolationLevel, IStorageAggregate

logger = logging.getLogger(__name__)

Base = declarative_base()


def init_db_engine(url):
    engine = create_engine(url, echo=False)
    Base.metadata.create_all(bind=engine)
    return engine


class InvalidIsolation(Exception):
    pass


def convert_isolation_to_db_value(isolation: IsolationLevel):
    mapping = {
        IsolationLevel.READ_COMMITTED: "read_committed",
        IsolationLevel.REPEATABLE_READ: "repeatable_read",
        IsolationLevel.SERIALIZABLE: "serializable",
    }

    value = mapping.get(isolation)
    if value is None:
        raise InvalidIsolation(f"Could not convert {isolation} to database configuration value!")

    return value


class StorageAggregate(IStorageAggregate):
    class Session(IStorageAggregate.IStorageSession):
        TRANSACTION_DEFAULT_ISOLATION = IsolationLevel.REPEATABLE_READ

        def __init__(self, session: AlchemySession):
            self._session = session

        @asynccontextmanager
        async def begin_db_session(self):
            try:
                yield self._session
            finally:
                self._session.close()

    def __init__(self, session: AlchemySession):
        self._session = session

    def create_session(self) -> Session:
        return self.Session(self._session)

    @asynccontextmanager
    async def acquire_session(self):
        session = self.create_session()
        yield session

    @asynccontextmanager
    async def acquire_transactional_session(self, **kwargs):
        session = self.create_session()
        async with session.begin_db_session(**kwargs):
            yield session


class AsyncSession(IStorageAggregate.IStorageSession):
    def __init__(self, session: async_scoped_session):
        self._session = session

    @asynccontextmanager
    async def begin_db_session(self):
        try:
            yield self._session()
        finally:
            await self._session.remove()
