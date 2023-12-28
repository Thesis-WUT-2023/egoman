import time

import jwt
from decouple import config
from fastapi import HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from src.domains.auth import gateways, interaces
from src.monitoring import logging

JWT_SECRET = config("JWT_SECRET")
JWT_ALGO = config("JWT_ALGO")

LOGGER = logging.get_logger(__name__)


# pylint: disable=R1725


class JWTBearer(gateways.IAuthBearer, HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme")
            if not self.verify(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or Expired token")
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code")

        return credentials.credentials

    def verify(self, token: str) -> bool:
        valid_token: bool = False

        try:
            payload = self._decode(token)
        except interaces.SessionExpired:
            raise HTTPException(status_code=403, detail="Session Expired")
        except interaces.InvalidToken:
            raise HTTPException(status_code=403, detail="Invalid Token")
        if payload:
            valid_token = True
        return valid_token

    def _decode(self, token: str) -> dict:
        try:
            decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
            if decoded_token["expires"] < time.time():
                raise gateways.SessionExpired()
            return decoded_token
        except gateways.SessionExpired:
            raise interaces.SessionExpired()
        except:
            raise interaces.InvalidToken()
