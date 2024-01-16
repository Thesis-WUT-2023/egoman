from src.domains.sales import gateways, interfaces
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class FetchSalesQuery(interfaces.IFetchSales):
    def __init__(self, storage: gateways.ISalesStorage):
        self._storage = storage

    async def invoke(self, args):
        try:
            sales = await self._storage.fetch(args.date_bounds)

            LOGGER.info("Succesfully fetched sales")
            return sales
        except gateways.NoSalesFound:
            raise interfaces.NoSalesFound()
