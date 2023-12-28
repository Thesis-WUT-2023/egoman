import time
from uuid import UUID

import jwt

from src.delivery.config import Config
from src.domains.auth import entities, gateways, interaces
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class AuthHandler(gateways.IAuthHandler):
    def __init__(
        self,
        config: Config,
    ):
        self._config = config

    def encode(self, user_uid: UUID) -> entities.Token:
        payload = self._map_user_to_payload(user_uid)
        token = jwt.encode(payload, self._config.JWT_SECRET, algorithm=self._config.JWT_ALGO)

        return entities.Token(token=token, type="Bearer")

    def decode(self, token: str) -> UUID:
        try:
            decoded_token = jwt.decode(
                token, self._config.JWT_SECRET, algorithms=[self._config.JWT_ALGO]
            )
            if decoded_token["expires"] < time.time():
                raise gateways.SessionExpired()
            return decoded_token["user_uid"]
        except gateways.SessionExpired:
            raise interaces.SessionExpired()
        except:
            raise interaces.InvalidToken()

    def _map_user_to_payload(self, user_uid: UUID) -> dict:
        return {
            "user_uid": str(user_uid),
            "expires": time.time() + 3600,
        }
