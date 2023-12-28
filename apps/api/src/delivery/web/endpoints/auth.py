from fastapi import APIRouter, Depends, HTTPException
from pydio.api import Injector

from src.delivery.web.middleware.injector import get_injector
from src.domains.auth.entities import Token
from src.domains.auth.gateways import IAuthHandler
from src.domains.users.commands import CreateUserCommand, LoginUserCommand
from src.domains.users.entities import CreateUserRequest, LoginUserRequest
from src.domains.users.interfaces import (
    ICreateUser,
    ILoginUser,
    UserAlreadyExists,
    WrongCreadentials,
)
from src.gateways.auth import AuthHandler

router = APIRouter()


@router.post("/signup")
async def create_user(user: CreateUserRequest, injector: Injector = Depends(get_injector)) -> Token:
    try:
        auth_handler: AuthHandler = await injector.inject(IAuthHandler)
        command: CreateUserCommand = await injector.inject(ICreateUser)
        args = CreateUserCommand.Args(new_user=user)
        user_info = await command.invoke(args)
        return auth_handler.encode(user_info.uid)
    except UserAlreadyExists:
        raise HTTPException(403, detail="User already exists")


@router.post("/login")
async def login_user(user: LoginUserRequest, injector: Injector = Depends(get_injector)) -> Token:
    try:
        auth_handler: AuthHandler = await injector.inject(IAuthHandler)
        command: LoginUserCommand = await injector.inject(ILoginUser)
        args = LoginUserCommand.Args(user=user)
        user_info = await command.invoke(args)
        return auth_handler.encode(user_info.uid)
    except WrongCreadentials:
        raise HTTPException(401, detail="Invalid credentials")
