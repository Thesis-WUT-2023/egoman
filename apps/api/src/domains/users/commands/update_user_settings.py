import time

import jwt

from src.delivery.config import Config
from src.domains.users import entities, gateways, interfaces
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class UpdateUserSettingsCommand(interfaces.IUpdateUserSettings):
    def __init__(self, storage: gateways.IUsersStorage, config: Config):
        self._storage = storage
        self._config = config

    async def invoke(self, args):
        try:
            user_info = await self._storage.update(args.new_settings)

            token = jwt.encode(
                self._map_user_info_to_payload(user_info),
                self._config.JWT_SECRET,
                self._config.JWT_ALGO,
            )

            LOGGER.info("Succesfully updated user {%s}", args.new_settings.uid)
            return token
        except gateways.WrongCreadentials:
            raise interfaces.WrongCreadentials()

    def _map_user_info_to_payload(self, user: entities.UserInfo) -> dict:
        return {
            "user_email": user.email,
            "name": user.name,
            "surrname": user.surname,
            "expires": time.time() + 600,
        }
