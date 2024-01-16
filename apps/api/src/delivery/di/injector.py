from pydio.api import Injector, Provider

from src.delivery.config import Config
from src.delivery.config import config as web_config

from .auth import provider as auth_provider
from .model import provider as model_provider
from .sales import provider as sales_provider
from .storage import provider as storage_provider
from .users import provider as users_provider


def _create_provider():
    config_provider = Provider()
    config_provider.register_instance(Config, web_config, scope="app")

    provider = Provider()
    provider.attach(config_provider)
    provider.attach(storage_provider)
    provider.attach(users_provider)
    provider.attach(auth_provider)
    provider.attach(model_provider)
    provider.attach(sales_provider)

    return provider


def create_injector():
    provider = _create_provider()
    return Injector(provider).scoped("app", env=web_config.ENV)
