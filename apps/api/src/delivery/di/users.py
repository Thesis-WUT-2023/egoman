from pydio.api import Injector, Provider

from src.delivery.config import Config
from src.domains.core.storage import StorageSession
from src.domains.users.commands import (
    CreateUserCommand,
    DeleteUserCommand,
    FetchUserCommand,
    LoginUserCommand,
    UpdateUserPWDCommand,
    UpdateUserSettingsCommand,
)
from src.domains.users.gateways import IUsersStorage
from src.domains.users.interfaces import (
    ICreateUser,
    IDeleteUser,
    IFetchUser,
    ILoginUser,
    IUpdateUserPWD,
    IUpdateUserSettings,
)
from src.gateways.users.storage import DatabaseUsersStorage

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


@provider.provides(IUpdateUserPWD, scope="app")
async def make_update_user_pwd_command(injector: Injector):
    users_storage = await injector.inject(IUsersStorage)
    config = injector.inject(Config)
    return UpdateUserPWDCommand(users_storage, config)


@provider.provides(IFetchUser, scope="app")
async def make_fetch_user_command(injector: Injector):
    users_storage = await injector.inject(IUsersStorage)
    config = injector.inject(Config)
    return FetchUserCommand(users_storage, config)


@provider.provides(IDeleteUser, scope="app")
async def make_delete_user_command(injector: Injector):
    users_storage = await injector.inject(IUsersStorage)
    return DeleteUserCommand(users_storage)
