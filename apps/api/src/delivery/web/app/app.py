from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.delivery.di.injector import create_injector
from src.delivery.web.endpoints import auth, model, users


def _configure_cors(app):
    front_url = "*"
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[front_url],
        allow_methods=["*"],
        allow_headers=["*"],
    )


class App(FastAPI):
    def __init__(self):
        super().__init__(title="Egoman API")
        self._injector = create_injector()
        self._register_routes()

    @property
    def injector(self):
        return self._injector

    def _register_routes(self):
        self.include_router(users.router, prefix="/users", tags=["Users"])
        self.include_router(auth.router, prefix="/auth", tags=["Auth"])
        self.include_router(model.router, prefix="/model", tags=["Model"])


def create_app():
    app = App()
    _configure_cors(app)
    return app
