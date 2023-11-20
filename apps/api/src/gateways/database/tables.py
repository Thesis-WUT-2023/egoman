import uuid

from sqlalchemy import (
    Column,
    String,
)
from sqlalchemy.dialects import postgresql

from .base import Base


class User(Base):
    __tablename__ = "users"

    uid = Column(postgresql.UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    name = Column(String)
    surname = Column(String)
