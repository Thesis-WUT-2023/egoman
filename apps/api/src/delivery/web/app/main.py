from src.domains.core.storage import Storage
from src.domains.sales.commands import FillSalesDatabase
from src.domains.sales.interfaces import IFillSalesDatabase

from .app import create_app

app = create_app()


@app.on_event("startup")
async def sync_db():
    await app.injector.inject(Storage)
    command: FillSalesDatabase = await app.injector.inject(IFillSalesDatabase)
    await command.invoke()
