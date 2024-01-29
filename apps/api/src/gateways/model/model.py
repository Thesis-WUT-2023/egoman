import datetime
import random
import time

from src.domains.model import entities, gateways
from src.domains.sales.entities import FetchSalesRequest, Sales
from src.domains.sales.gateways import ISalesStorage
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class Model(gateways.IModel):
    def __init__(self, sales_storage: ISalesStorage):
        self._sales_storage = sales_storage

    async def predict(self, prediction: entities.ModelInput) -> entities.ModelOutput:
        prediction.prediction_month = datetime.date(
            prediction.prediction_month.year, prediction.prediction_month.month, 1
        )
        start_date = prediction.prediction_month - datetime.timedelta(weeks=12)
        end_date = prediction.prediction_month - datetime.timedelta(weeks=4)

        start_date = datetime.date(start_date.year, start_date.month, 1)
        end_date = (
            datetime.date(end_date.year, end_date.month, 1)
            + datetime.timedelta(weeks=4)
            - datetime.timedelta(days=1)
        )

        sales = await self._sales_storage.fetch(
            FetchSalesRequest(start_date=start_date, end_date=end_date)
        )

        sales.sort(key=lambda sale: sale.date)

        random.seed(time.time())
        value = random.randint(100, 500)

        sales.append(Sales(date=prediction.prediction_month, value=value))

        return entities.ModelOutput(sales=sales)
