from pydio.api import Injector, Provider

from src.delivery.config import Config
from src.domains.auth.gateways import IAuthBearer, IAuthHandler
from src.gateways.auth import AuthHandler, JWTBearer

provider = Provider()


@provider.provides(IAuthHandler, scope="app")
async def make_auth_handler(injector: Injector):
    config = injector.inject(Config)
    return AuthHandler(config)


@provider.provides(IAuthBearer, scope="app")
async def make_auth_bearer(injector: Injector):
    auth_handler = injector.inject(IAuthHandler)
    return JWTBearer(auth_handler)
