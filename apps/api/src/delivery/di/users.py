from pydio.api import Injector, Provider

from src.domains.core.storage import StorageSession
from src.domains.users import gateways
from src.gateways.users.storage import DatabaseUsersStorage

provider = Provider()


@provider.provides(gateways.IUsersStorage, scope="app")
async def make_users_storage(injector: Injector):
    storage_session = await injector.inject(StorageSession)
    return DatabaseUsersStorage(storage_session)
