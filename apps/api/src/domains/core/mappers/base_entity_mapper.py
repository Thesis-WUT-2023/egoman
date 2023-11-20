from abc import ABC, abstractmethod
from typing import Generic, TypeVar

from src.domains.core.entities import BaseEntity
from src.gateways.database.base import Base as BaseSchema

# pylint: disable=invalid-name

TSchema = TypeVar("TSchema", bound=BaseSchema)
TEntity = TypeVar("TEntity", bound=BaseEntity)


class BaseEntityMapper(ABC, Generic[TSchema, TEntity]):
    @abstractmethod
    def to_schema(self, entity: TEntity) -> TSchema:
        pass

    @abstractmethod
    def from_schema(self, schema: TSchema) -> TEntity:
        pass
