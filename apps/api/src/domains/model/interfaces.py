import abc

from pydantic import BaseModel

from src.domains.model import entities


class IPredict(abc.ABC):
    class Args(BaseModel):
        model_input: entities.ModelInput

    class Result(entities.ModelOutput):
        pass

    @abc.abstractmethod
    def invoke(self, args: Args) -> Result:
        pass
