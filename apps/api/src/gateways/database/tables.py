import uuid

from sqlalchemy import Column, Date, Float, String
from sqlalchemy.dialects import postgresql
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.orm import DeclarativeBase


class Base(AsyncAttrs, DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    uid = Column(postgresql.UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    name = Column(String)
    surname = Column(String)


class Sale(Base):
    __tablename__ = "sales"

    uid = Column(postgresql.UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    date = Column(Date, nullable=False)
    value = Column(Float, nullable=False)
