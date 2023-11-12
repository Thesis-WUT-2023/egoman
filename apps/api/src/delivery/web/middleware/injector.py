from fastapi import Request
from pydio.api import Injector


def get_injector(request: Request) -> Injector:
    return request.app.injector
