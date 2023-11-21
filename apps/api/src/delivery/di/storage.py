from pydio.api import Injector, Provider

from src.delivery.config import Config
from src.domains.core.storage import Storage, StorageSession
from src.gateways.database.storage import StorageImpl

provider = Provider()


@provider.provides(Storage, scope="app")
async def make_database_storage(injector: Injector):
    config: Config = injector.inject(Config)
    storage = StorageImpl(config.DATABASE_URL)
    await storage.sync_metadata()
    return storage


@provider.provides(StorageSession, scope="app")
async def make_storage_session(injector: Injector):
    storage: Storage = await injector.inject(Storage)
    return storage.create_session()
