from abc import ABC

from pydantic import BaseModel


class BaseEntity(BaseModel, ABC):
    pass
