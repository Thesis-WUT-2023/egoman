import abc

from src.domains.model import entities


class IModel(abc.ABC):
    @abc.abstractmethod
    async def predict(self, prediction: entities.ModelInput) -> entities.ModelOutput:
        pass
