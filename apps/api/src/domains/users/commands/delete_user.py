from src.domains.users import gateways, interfaces
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class DeleteUserCommand(interfaces.IDeleteUser):
    def __init__(self, storage: gateways.IUsersStorage):
        self._storage = storage

    async def invoke(self, args):
        try:
            success = await self._storage.delete(args.uid)

            LOGGER.info("Succesfully created user {%s}", args.uid)
            return self.Result(success=success)
        except gateways.NoUserFound:
            raise interfaces.NoUserFound()
