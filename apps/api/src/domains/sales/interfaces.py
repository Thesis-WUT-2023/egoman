import abc
from typing import List

from pydantic import BaseModel

from src.domains.sales import entities


class NoSalesFound(Exception):
    def __init__(self):
        super().__init__("No Sales Found")


class IFetchSales(abc.ABC):
    class Args(BaseModel):
        date_bounds: entities.FetchSalesRequest

    class Result(List[entities.Sales]):
        pass

    @abc.abstractmethod
    async def invoke(self, args: Args) -> Result:
        pass


class IFillSalesDatabase(abc.ABC):
    @abc.abstractmethod
    async def invoke(self) -> None:
        pass
