from uuid import UUID

from .base_entity import BaseEntity


class IdentifiableEntity(BaseEntity):
    uid: UUID
