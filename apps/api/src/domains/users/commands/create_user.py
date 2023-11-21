import hashlib

from src.delivery.config import Config
from src.domains.users import gateways, interfaces
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class CreateUser(interfaces.ICreateUser):
    def __init__(self, storage: gateways.IUsersStorage, config: Config):
        self._storage = storage
        self._config = config

    async def invoke(self, args):
        hash = hashlib.new(str(self._config.HASH_FUNC))
        hash.update(args.new_user.password.encode())

        args.new_user.password = hash.hexdigest()

        user_info = await self._storage.create(args.new_user)

        LOGGER.info("Succesfully created user {%s}", args.new_user.email)
        return user_info
