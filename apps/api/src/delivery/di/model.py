from pydio.api import Injector, Provider

from src.domains.model.commands import PredictCommand
from src.domains.model.gateways import IModel
from src.domains.model.interfaces import IPredict
from src.domains.sales.gateways import ISalesStorage
from src.gateways.model import Model

provider = Provider()


@provider.provides(IModel, scope="app")
async def make_model(injector: Injector):
    sales_storage = await injector.inject(ISalesStorage)
    return Model(sales_storage)


@provider.provides(IPredict, scope="app")
async def make_predict_command(injector: Injector):
    model = await injector.inject(IModel)
    return PredictCommand(model)
