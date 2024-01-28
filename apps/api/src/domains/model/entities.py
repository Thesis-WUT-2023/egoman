import datetime
from typing import Dict

from pydantic import BaseModel


class ModelInput(BaseModel):
    prediction_month: datetime.date
    visits_to_POChP: int
    visits_to_Astma: int


class ModelOutput(BaseModel):
    output: Dict[datetime.date, float]
