from fastapi import APIRouter, Depends, HTTPException
from pydio.api import Injector

from src.delivery.web.middleware.injector import get_injector
from src.domains.auth.gateways import IAuthHandler
from src.domains.auth.interaces import InvalidToken, SessionExpired
from src.domains.model import entities, interfaces, commands 
from src.gateways.auth import AuthHandler, JWTBearer

router = APIRouter()


@router.post("/", dependencies=[Depends(JWTBearer())])
async def predict(
    model_input: entities.ModelInput,
    injector: Injector = Depends(get_injector),
    token: str = Depends(JWTBearer()),
) -> entities.ModelOutput:
    try:
        command: commands.PredictCommand = await injector.inject(interfaces.IPredict)
        args = commands.PredictCommand.Args(model_input=model_input)
        model_output = command.invoke(args)
        return model_output
    except SessionExpired:
        raise HTTPException(403, detail="Session Expired")
    except InvalidToken:
        raise HTTPException(403, detail="Invalid token")
