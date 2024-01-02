from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from pydio.api import Injector

from src.delivery.web.middleware.injector import get_injector
from src.domains.auth.gateways import IAuthHandler
from src.domains.auth.interaces import InvalidToken, SessionExpired
from src.domains.users.commands import (
    DeleteUserCommand,
    FetchUserCommand,
    UpdateUserPWDCommand,
    UpdateUserSettingsCommand,
)
from src.domains.users.entities import UpdateUserPWDRequest, UpdateUserSettingsRequest, User
from src.domains.users.interfaces import (
    IDeleteUser,
    IFetchUser,
    IUpdateUserPWD,
    IUpdateUserSettings,
    NoUserFound,
    WrongCreadentials,
)
from src.gateways.auth import AuthHandler, JWTBearer

router = APIRouter()


@router.put("/update/settings", dependencies=[Depends(JWTBearer())])
async def update_user_settings(
    user_settings: UpdateUserSettingsRequest,
    injector: Injector = Depends(get_injector),
    token: str = Depends(JWTBearer()),
) -> bool:
    try:
        auth_handler: AuthHandler = await injector.inject(IAuthHandler)
        user_uid: UUID = auth_handler.decode(token)
        command: UpdateUserSettingsCommand = await injector.inject(IUpdateUserSettings)
        args = UpdateUserSettingsCommand.Args(uid=user_uid, new_settings=user_settings)
        success = await command.invoke(args)
        return success
    except WrongCreadentials:
        raise HTTPException(401, detail="Invalid credentials")
    except SessionExpired:
        raise HTTPException(403, detail="Session Expired")
    except InvalidToken:
        raise HTTPException(403, detail="Invalid token")


@router.put("/update/pwd", dependencies=[Depends(JWTBearer())])
async def update_user_pwd(
    new_password: UpdateUserPWDRequest,
    injector: Injector = Depends(get_injector),
    token: str = Depends(JWTBearer()),
) -> bool:
    try:
        auth_handler: AuthHandler = await injector.inject(IAuthHandler)
        user_uid: UUID = auth_handler.decode(token)
        command: UpdateUserPWDCommand = await injector.inject(IUpdateUserPWD)
        args = UpdateUserPWDCommand.Args(uid=user_uid, new_password=new_password)
        success = await command.invoke(args)
        return success
    except WrongCreadentials:
        raise HTTPException(401, detail="Old password is incorrect")
    except SessionExpired:
        raise HTTPException(403, detail="Session Expired")
    except InvalidToken:
        raise HTTPException(403, detail="Invalid token")


@router.get("/current", dependencies=[Depends(JWTBearer())])
async def get_current_user(
    injector: Injector = Depends(get_injector), token: str = Depends(JWTBearer())
) -> User:
    try:
        auth_handler: AuthHandler = await injector.inject(IAuthHandler)
        user_uid: UUID = auth_handler.decode(token)
        command: FetchUserCommand = await injector.inject(IFetchUser)
        args = FetchUserCommand.Args(uid=user_uid)
        user = await command.invoke(args)
        return user
    except NoUserFound:
        raise HTTPException(403, detail="No User Found")


@router.delete("/current", dependencies=[Depends(JWTBearer())])
async def delete_user(
    injector: Injector = Depends(get_injector), token: str = Depends(JWTBearer())
) -> bool:
    try:
        auth_handler: AuthHandler = await injector.inject(IAuthHandler)
        user_uid: UUID = auth_handler.decode(token)
        command: DeleteUserCommand = await injector.inject(IDeleteUser)
        args = DeleteUserCommand.Args(uid=user_uid)
        result = await command.invoke(args)
        return result.success
    except NoUserFound:
        raise HTTPException(403, detail="No User Found")
