from abc import ABC, abstractmethod
from typing import Generic, TypeVar

from src.domains.core.dto import BaseDto
from src.domains.core.entities import BaseEntity

# pylint: disable=invalid-name

TDto = TypeVar("TDto", bound=BaseDto)
TEntity = TypeVar("TEntity", bound=BaseEntity)


class BaseDtoMapper(ABC, Generic[TDto, TEntity]):
    @abstractmethod
    def to_dto(self, entity: TEntity) -> TDto:
        pass

    @abstractmethod
    def from_dto(self, dto: TDto) -> TEntity:
        pass
