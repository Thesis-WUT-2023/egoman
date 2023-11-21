from pydio.api import Injector, Provider

from src.delivery.config import config as web_config
from src.domains.users import commands, gateways, interfaces
from src.gateways.users.storage import DatabaseUsersStorage
from src.domains.core.storage import StorageSession

provider = Provider()


@provider.provides(gateways.IUsersStorage, scope="app")
async def make_users_storage(injector: Injector):
    storage_session = await injector.inject(StorageSession)
    return DatabaseUsersStorage(storage_session)
