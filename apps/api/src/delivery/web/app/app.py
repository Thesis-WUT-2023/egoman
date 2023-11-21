from fastapi import FastAPI

from src.delivery.di.injector import create_injector
from src.delivery.web.endpoints import hello_world


class App(FastAPI):
    def __init__(self):
        super().__init__(title="Inflow API")
        self._injector = create_injector()
        self._register_routes()

    @property
    def injector(self):
        return self._injector

    def _register_routes(self):
        self.include_router(
            hello_world.router, prefix="/hey", tags=["Hello"]
        )


def create_app():
    return App()
