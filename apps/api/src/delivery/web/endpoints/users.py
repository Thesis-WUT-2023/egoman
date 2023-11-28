from fastapi import APIRouter, Depends, HTTPException
from pydio.api import Injector

from src.delivery.web.middleware.injector import get_injector
from src.domains.users.interfaces import ICreateUser, ILoginUser, WrongCreadentials, UserAlreadyExists
from src.domains.users.commands import CreateUserCommand, LoginUserCommand
from src.domains.users.entities import LoginUserRequest, CreateUserRequest

router = APIRouter()


@router.post("/signup")
async def create_user(user: CreateUserRequest, injector: Injector = Depends(get_injector)) -> str:
    try:
        command: CreateUserCommand = await injector.inject(ICreateUser)
        args = CreateUserCommand.Args(new_user=user)
        token = await command.invoke(args)
        return token
    except UserAlreadyExists:
        raise HTTPException(403, detail="User already exists")


@router.post("/login")
async def login_user(user: LoginUserRequest, injector: Injector = Depends(get_injector)) -> str:
    try:
        command: LoginUserCommand = await injector.inject(ILoginUser)
        args = LoginUserCommand.Args(user=user)
        token = await command.invoke(args)
        return token
    except WrongCreadentials:
        raise HTTPException(401, detail="Invalid credentials")
