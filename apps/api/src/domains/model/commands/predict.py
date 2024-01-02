from src.domains.model import gateways, interfaces
from src.monitoring import logging

LOGGER = logging.get_logger(__name__)


class PredictCommand(interfaces.IPredict):
    def __init__(self, model: gateways.IModel):
        self._model = model

    def invoke(self, args):
        return self._model.predict(args.model_input)
