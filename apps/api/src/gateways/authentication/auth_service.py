from typing import Union

from src.domains.authentication import interfaces
from src.domains.authentication.gateways import IAuthService
from src.domains.users.entities import CreateUserRequest, UserInfo
from src.domains.users.gateways import (
    IUsersStorage,
    WrongCreadentials,
)
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class AuthService(IAuthService):
    def __init__(
        self,
        users_storage: IUsersStorage,
    ):
        self._users_storage = users_storage

    async def get_user(self, email: str, password: str, access_token: str) -> UserInfo:
        user = await self._find_user(email, password)
        if user is None:
            raise WrongCreadentials()

        return user

    async def _find_user(self, email: str, password: str) -> Union[UserInfo, None]:
        try:
            user = await self._users_storage.fetch_user(email, password)
            return user
        except WrongCreadentials:
            return None
