from src.domains.authentication.gateways import IAuthService
from src.domains.authentication.interfaces import IAuthenticateUser
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class AuthenticateUser(IAuthenticateUser):
    def __init__(self, auth_service: IAuthService):
        self._auth_service = auth_service

    async def invoke(self, args):
        user = await self._auth_service.get_user(args.access_token)
        return self.Result(success=True, user=user)
