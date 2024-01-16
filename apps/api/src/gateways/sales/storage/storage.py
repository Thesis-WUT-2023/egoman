import datetime
from typing import List

from sqlalchemy import Date, and_, delete, func, select

from src.domains.core.storage import StorageSession
from src.domains.sales import entities, gateways
from src.gateways.database import tables
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


# pylint: disable=E1102
class DatabaseSalesStorage(gateways.ISalesStorage):
    def __init__(
        self,
        storage_session: StorageSession,
    ):
        self._storage_session = storage_session

    async def fetch(self, date_bounds: entities.FetchSalesRequest) -> List[entities.Sales]:
        async with self._storage_session.begin_session() as db_session:
            start_date: Date = date_bounds.start_date
            end_date: Date = date_bounds.end_date

            subquery = (
                select(tables.Sale)
                .where(and_(tables.Sale.date >= start_date, tables.Sale.date <= end_date))
                .subquery()
            )
            query = select(
                func.extract("year", subquery.c.date),
                func.extract("month", subquery.c.date),
                func.sum(subquery.c.value),
            ).group_by(
                func.extract("year", subquery.c.date), func.extract("month", subquery.c.date)
            )
            sales = await db_session.execute(query)

            return [
                entities.Sales(date=datetime.date(int(obj[0]), int(obj[1]), 1), value=obj[2])
                for obj in sales
            ]

    async def save(self, sales: List[entities.Sales]) -> None:
        async with self._storage_session.begin_session() as db_session:
            query = delete(tables.Sale)
            await db_session.execute(query)

            orm_sales = [self._map_entity_to_orm(obj) for obj in sales]

            db_session.add_all(orm_sales)
            await db_session.commit()

    def _map_entity_to_orm(self, sale: entities.Sales) -> tables.Sale:
        return tables.Sale(date=sale.date, value=sale.value)
