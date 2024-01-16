import abc
from typing import List

from src.domains.sales import entities


class ISalesStorage(abc.ABC):
    @abc.abstractmethod
    async def fetch(self, date_bounds: entities.FetchSalesRequest) -> List[entities.Sales]:
        pass

    @abc.abstractmethod
    async def save(self, sales: List[entities.Sales]) -> None:
        pass
