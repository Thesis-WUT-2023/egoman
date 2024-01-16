from pydio.api import Injector, Provider

from src.domains.core.storage import StorageSession
from src.domains.sales import commands, gateways, interfaces, queries
from src.gateways.sales.storage import DatabaseSalesStorage

provider = Provider()


@provider.provides(gateways.ISalesStorage, scope="app")
async def make_sales_storage(injector: Injector):
    storage_session = await injector.inject(StorageSession)
    return DatabaseSalesStorage(storage_session)


@provider.provides(interfaces.IFetchSales, scope="app")
async def make_fetch_sales_query(injector: Injector):
    sales_storage = await injector.inject(gateways.ISalesStorage)
    return queries.FetchSalesQuery(sales_storage)


@provider.provides(interfaces.IFillSalesDatabase, scope="app")
async def make_fill_sales_db_command(injector: Injector):
    sales_storage = await injector.inject(gateways.ISalesStorage)
    return commands.FillSalesDatabase(sales_storage)
