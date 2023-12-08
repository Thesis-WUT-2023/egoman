import hashlib

from src.delivery.config import Config
from src.domains.users import gateways, interfaces
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class UpdateUserPWDCommand(interfaces.IUpdateUserPWD):
    def __init__(self, storage: gateways.IUsersStorage, config: Config):
        self._storage = storage
        self._config = config

    async def invoke(self, args):
        try:
            hash_func = hashlib.new(str(self._config.HASH_FUNC))
            hash_func.update(args.new_password.old_password.encode())
            args.new_password.old_password = hash_func.hexdigest()

            hash_func.update(args.new_password.new_password.encode())
            args.new_password.new_password = hash_func.hexdigest()

            success = await self._storage.update_pwd(args.new_password)

            LOGGER.info("Succesfully updated user {%s}", args.new_password.uid)
            return success
        except gateways.WrongCreadentials:
            raise interfaces.WrongCreadentials()
