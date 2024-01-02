from pydantic import BaseModel


class ModelInput(BaseModel):
    prediction_month: int
    value_of_month_A: int
    value_of_month_B: int
    value_of_month_C: int
    visits_to_POChP: int
    visits_to_Astma: int
    value_of_all_period: int


class ModelOutput(BaseModel):
    prediction_month: int
    predicted_value: int
