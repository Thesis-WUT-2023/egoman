import hashlib

from src.delivery.config import Config
from src.domains.users import gateways, interfaces
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class LoginUserCommand(interfaces.ILoginUser):
    def __init__(self, storage: gateways.IUsersStorage, config: Config):
        self._storage = storage
        self._config = config

    async def invoke(self, args):
        try:
            hash_func = hashlib.new(str(self._config.HASH_FUNC))
            hash_func.update(args.user.password.encode())

            args.user.password = hash_func.hexdigest()

            user_info = await self._storage.login(args.user)

            LOGGER.info("Succesfully logged user {%s}", args.user.email)
            return user_info
        except gateways.WrongCreadentials:
            raise interfaces.WrongCreadentials()
