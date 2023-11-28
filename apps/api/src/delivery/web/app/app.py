from fastapi import FastAPI

from src.delivery.di.injector import create_injector
from src.delivery.web.endpoints import users


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


def create_app():
    return App()
