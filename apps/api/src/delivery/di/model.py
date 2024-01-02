from pydio.api import Injector, Provider

from src.delivery.config import Config
from src.domains.model.gateways import IModel
from src.gateways.model import Model
from src.domains.model.interfaces import IPredict
from src.domains.model.commands import PredictCommand


provider = Provider()


@provider.provides(IModel, scope="app")
async def make_model(injector: Injector):
    return Model()


@provider.provides(IPredict, scope="app")
async def make_predict_command(injector: Injector):
    model = await injector.inject(IModel)
    return PredictCommand(model)
