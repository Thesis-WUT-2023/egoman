from src.delivery.config import Config
from src.domains.users import gateways, interfaces
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class FetchUserCommand(interfaces.IFetchUser):
    def __init__(self, storage: gateways.IUsersStorage, config: Config):
        self._storage = storage
        self._config = config

    async def invoke(self, args):
        try:
            user = await self._storage.fetch_user(args.uid)

            LOGGER.info("Succesfully fetched user {%s}", args.uid)
            return user
        except gateways.NoUserFound:
            raise interfaces.NoUserFound()
