from src.domains.core.storage import Storage

from .app import create_app

app = create_app()


@app.on_event("startup")
async def sync_db():
    await app.injector.inject(Storage)
