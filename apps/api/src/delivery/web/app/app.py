from fastapi import FastAPI

from src.delivery.di.injector import create_injector
from src.delivery.web.endpoints import allocations, auth, feature_builds


class App(FastAPI):
    def __init__(self):
        super().__init__(title="Thesis")
        self._injector = create_injector()
        self._register_routes()

    @property
    def injector(self):
        return self._injector

def create_app():
    return App()
