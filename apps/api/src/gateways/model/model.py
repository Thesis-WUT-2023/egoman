import datetime
import random
import time

from src.domains.model import entities, gateways
from src.domains.sales.entities import FetchSalesRequest
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
        sales = await self._sales_storage.fetch(
            FetchSalesRequest(start_date=start_date, end_date=end_date)
        )

        random.seed(time.time())
        value = random.randint(100, 500)

        output_months = [sale.date for sale in sales] + [prediction.prediction_month]
        output_values = [sale.value for sale in sales] + [value]

        return entities.ModelOutput(
            output={output_months[i]: output_values[i] for i in range(0, len(output_months))}
        )
