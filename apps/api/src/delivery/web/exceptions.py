from typing import Any, Optional

from fastapi.exceptions import HTTPException


class HTTPUnauthorizedException(HTTPException):
    def __init__(
        self, detail: Any = "Unauthorized", headers: Optional[dict[str, Any]] = None
    ) -> None:
        super().__init__(403, detail, headers)
