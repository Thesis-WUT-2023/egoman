import datetime

from pydantic import BaseModel


class Sales(BaseModel):
    date: datetime.date
    value: float


class FetchSalesRequest(BaseModel):
    start_date: datetime.date
    end_date: datetime.date
