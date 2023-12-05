from pydio.api import Injector, Provider

from src.domains.core.storage import StorageSession
from src.domains.users.interfaces import ICreateUser, ILoginUser, IUpdateUserSettings
from src.domains.users.gateways import IUsersStorage
from src.domains.users.commands import LoginUserCommand, CreateUserCommand, UpdateUserSettingsCommand
from src.gateways.users.storage import DatabaseUsersStorage
from src.delivery.config import Config

provider = Provider()


@provider.provides(IUsersStorage, scope="app")
async def make_users_storage(injector: Injector):
    storage_session = await injector.inject(StorageSession)
    return DatabaseUsersStorage(storage_session)


@provider.provides(ICreateUser, scope="app")
async def make_create_user_command(injector: Injector):
    users_storage = await injector.inject(IUsersStorage)
    config = injector.inject(Config)
    return CreateUserCommand(users_storage, config)


@provider.provides(ILoginUser, scope="app")
async def make_login_user_command(injector: Injector):
    users_storage = await injector.inject(IUsersStorage)
    config = injector.inject(Config)
    return LoginUserCommand(users_storage, config)


@provider.provides(IUpdateUserSettings, scope="app")
async def make_update_user_settings_command(injector: Injector):
    users_storage = await injector.inject(IUsersStorage)
    config = injector.inject(Config)
    return UpdateUserSettingsCommand(users_storage, config)
