from src.delivery.config import Config
from src.domains.users import gateways, interfaces
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class UpdateUserSettingsCommand(interfaces.IUpdateUserSettings):
    def __init__(self, storage: gateways.IUsersStorage, config: Config):
        self._storage = storage
        self._config = config

    async def invoke(self, args):
        try:
            user_info = await self._storage.update(args.uid, args.new_settings)

            LOGGER.info("Succesfully updated user {%s}", args.uid)
            return user_info
        except gateways.WrongCreadentials:
            raise interfaces.WrongCreadentials()
