import datetime
import random
import time
from typing import List

from src.domains.sales.entities import Sales
from src.domains.sales.gateways import ISalesStorage
from src.domains.sales.interfaces import IFillSalesDatabase


class FillSalesDatabase(IFillSalesDatabase):
    def __init__(
        self,
        sales_storage: ISalesStorage,
    ):
        self._sales_storage = sales_storage

    async def invoke(self) -> None:
        sales: List[Sales] = []
        random.seed(time.time())
        for _ in range(0, 500):
            day = random.randint(1, 28)
            month = random.randint(1, 12)
            date = datetime.date(2023, month, day)
            value = random.randrange(2, 20)
            sales.append(Sales(date=date, value=value))

        await self._sales_storage.save(sales)
