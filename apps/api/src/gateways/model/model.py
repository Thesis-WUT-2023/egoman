import random
import time
from src.domains.model import entities, interfaces, gateways
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class Model(gateways.IModel):
    def __init__(
        self,
    ):
        pass

    def predict(self, prediction: entities.ModelInput) -> entities.ModelOutput:
        random.seed(time.time())
        value = random.randint(0, 300)

        return entities.ModelOutput(prediction_month=prediction.prediction_month, predicted_value=value)
    