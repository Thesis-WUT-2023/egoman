import abc
import contextlib


class StorageSession(abc.ABC):
    @contextlib.asynccontextmanager
    @abc.abstractmethod
    async def begin_session(self):
        yield None


class Storage(abc.ABC):
    @abc.abstractmethod
    async def sync_metadata(self):
        pass

    @abc.abstractmethod
    def create_session(self) -> StorageSession:
        pass
