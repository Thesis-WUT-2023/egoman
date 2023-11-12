from asyncio import current_task
from collections.abc import Generator
from contextlib import asynccontextmanager

from sqlalchemy.ext.asyncio import async_scoped_session, async_sessionmaker, create_async_engine

from src.domains.core.storage import Storage, StorageSession
from src.monitoring.logging import get_logger

from .tables import Base

LOGGER = get_logger(__name__)


class StorageSessionImpl(StorageSession):
    def __init__(self, session: async_scoped_session):
        self._session = session

    @asynccontextmanager
    async def begin_session(self) -> Generator[async_scoped_session, None, None]:
        try:
            yield self._session()
        finally:
            await self._session.close()


class StorageImpl(Storage):
    def __init__(self, url: str) -> None:
        self._init_db_engine(url)

    def create_session(self) -> StorageSessionImpl:
        session = async_scoped_session(
            async_sessionmaker(self._engine, expire_on_commit=False), current_task
        )
        return StorageSessionImpl(session)

    async def sync_metadata(self):
        LOGGER.info("Syncing database metadata...")

        async with self._engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

        LOGGER.info("Database metadata synchronized")

    def _init_db_engine(self, url: str):
        LOGGER.info("Initializing db engine...")

        engine = create_async_engine(url, echo=False)
        self._engine = engine

        LOGGER.info("Db engine initialized...")
