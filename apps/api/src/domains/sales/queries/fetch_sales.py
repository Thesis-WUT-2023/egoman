import datetime

from src.domains.sales import gateways, interfaces
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class FetchSalesQuery(interfaces.IFetchSales):
    def __init__(self, storage: gateways.ISalesStorage):
        self._storage = storage

    async def invoke(self, args):
        try:
            args.date_bounds.start_date = datetime.date(
                args.date_bounds.start_date.year, args.date_bounds.start_date.month, 1
            )
            args.date_bounds.end_date = (
                datetime.date(args.date_bounds.end_date.year, args.date_bounds.end_date.month, 1)
                + datetime.timedelta(weeks=4)
                - datetime.timedelta(days=1)
            )
            sales = await self._storage.fetch(args.date_bounds)

            LOGGER.info("Succesfully fetched sales")
            return sales
        except gateways.NoSalesFound:
            raise interfaces.NoSalesFound()
