import hashlib
import time

import jwt

from src.delivery.config import Config
from src.domains.users import entities, gateways, interfaces
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

            token = jwt.encode(
                self._map_user_info_to_payload(user_info),
                self._config.JWT_SECRET,
                self._config.JWT_ALGO,
            )

            LOGGER.info("Succesfully logged user {%s}", args.user.email)
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
