import datetime
from typing import List

from pydantic import BaseModel

from src.domains.sales.entities import Sales


class ModelInput(BaseModel):
    prediction_month: datetime.date
    visits_to_POChP: int
    visits_to_Astma: int


class ModelOutput(BaseModel):
    sales: List[Sales]
